import axios from "axios";
import * as cheerio from "cheerio";
import * as _ from "lodash";
import * as Tesseract from "tesseract.js";
import * as fs from "fs";
import * as request from "request";
import { buffer2thai } from "../scaping/utility";
// import * as shell from "shelljs";
// import curlirize from "axios-curlirize";

import storage from "./diskStorage";
const disk = new storage("disk/reg.data.json");

// curlirize(axios);

process.env.NODE_NO_WARNINGS = "1";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function cookie2session(cookieHeader: any) {
  return _.join(_.map(cookieHeader, s => s.split(";")[0]), "; ");
}

function logout(session: string) {
  console.log(" > logout");
  return axios
    .get(
      "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.LogOutServlet?language=T",
      {
        headers: { Cookie: session }
      }
    )
    .then(res => {
      disk.set("session", cookie2session(res.headers["set-cookie"]));
    });
}

async function initlogin(username: string, password: string) {
  const loginPage = await axios.get(
    "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.InitLogonServlet",
    { withCredentials: true }
  );
  const session = cookie2session(loginPage.headers["set-cookie"]);
  const baseurl = "https://www2.reg.chula.ac.th";
  const captchaUrl = cheerio(
    "img#CAPTCHA",
    loginPage.data
  )[0].attribs.src.replace("..", baseurl);
  disk.set("session", session);
  return {
    session,
    captchaUrl
  };
}

async function ocr_tesseract(url: string, session: string, filename: string) {
  const captcha = await axios.get(url, {
    responseType: "arraybuffer",
    headers: { Cookie: session }
  });
  const buffer = Buffer.from(captcha.data, "binary");
  const base64 = "data:image/png;base64," + buffer.toString("base64");
  const tessPage = await Tesseract.recognize(buffer, { lang: "eng" });
  const text = tessPage.text.toUpperCase().replace(/\s+|[^A-Z0-9]/g, "");
  const confidence = tessPage.confidence;
  const path = __dirname + "/asset/" + filename;
  fs.writeFileSync(path, buffer, null);
  return {
    url,
    text,
    path,
    base64,
    confidence
  };
}

function login(session, { username, password, captcha }) {
  console.log(" > login");
  var options = {
    timeout: 2000,
    method: "POST",
    url:
      "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.LogonServlet",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: session
    },
    form: {
      userid: username,
      password: password,
      programsystem: "S",
      code: captcha,
      language: "T"
    }
  };
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) reject(new Error(error));
      if (typeof body == "string" && body.toUpperCase().indexOf("FAIL") == -1) {
        resolve(session);
      } else {
        axios({
          method: "GET",
          url:
            "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.LogonFailServlet?language=T",
          responseType: "arraybuffer",
          headers: { Cookie: session }
        }).then(res => {
          const html = res.data.toString("binary");
          try {
            const message = buffer2thai(
              cheerio("FONT[color='#FF0000']", html)[0].children[0].data
            );
            console.log(message);
            reject(message);
          } catch (e) {
            console.log("some unknown error");
            // console.log(e);
            reject(html);
          }
        });
      }
    });
  });
}

const getValidSession = async function(username, password) {
  const { session, captchaUrl } = await initlogin(username, password);
  const { text } = await ocr_tesseract(captchaUrl, session, "captcha.png");
  try {
    return await login(session, { username, password, captcha: text });
  } catch (e) {
    if (e.indexOf("เลขประจำตัวนิสิต และ/หรือ รหัสผ่าน ไม่ถูกต้อง") != -1) {
      return null;
    }
    await logout(session);
    return await getValidSession(username, password);
  }
};

async function cr60(session: string) {
  return axios
    .get(
      "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.general.servlet.CR60Servlet",
      { responseType: "arraybuffer", headers: { Cookie: session } }
    )
    .then(res => res.data.toString("binary"))
    .then(buffer2thai)
    .then(html => {
      return _.map(
        cheerio("form > table[border=0]:not(table[width])", html),
        term => {
          let time = cheerio(
            "tr:first-child p[align=CENTER] > b > font",
            term
          )[0].children[0].data;
          time = time.replace(/\s\s+/g, " ").trim();
          let semesterth = time.split(" ")[0].replace("ภาคการศึกษา", "");
          const period = {
            full: time,
            year: time.slice(-4),
            semesterth: semesterth,
            semester: semesterth.indexOf("ต้น") ? 1 : 2
          };
          const table = _.map(
            cheerio(
              "tr:not(:last-child) table[border=1] tr:not(:last-child)",
              term
            ),
            tr =>
              _.map(cheerio("td p font", tr), font =>
                font.children[0].data.trim()
              )
          );
          table[0] = table[0].map(s =>
            s.replace("COURSE ", "").toLocaleLowerCase()
          );
          const detail = _.map(table.slice(1), ar => _.zipObject(table[0], ar));
          const summary = _.map(
            cheerio(
              "tr:last-child table[border=1] tr:last-child td p font",
              term
            ),
            font => ({
              [font.children[0].data.trim()]: _.get(
                font.children[2],
                "data",
                null
              )
            })
          );
          return {
            period,
            detail,
            summary
          };
        }
      );
    });
}

interface option {
  cr60: boolean;
}
export default async function(username, password, opt = {} as option) {
  if (disk.get("session") != null) {
    await logout(disk.get("session"));
    disk.remove("session");
  }
  try {
    const session = await getValidSession(username, password);
    if (!session) return null;
    const result = {
      cr60: opt.cr60 ? await cr60(session) : null
    };
    await logout(session);
    console.log("-- FINISH --");
    return result;
  } catch (e) {
    if (disk.get("session") != null) {
      await logout(disk.get("session"));
      disk.remove("session");
    }
    console.log("-- FINISH --");
    return null;
  }
}
