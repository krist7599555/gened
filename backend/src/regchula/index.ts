import axios from "axios";
import * as cheerio from "cheerio";
import * as _ from "lodash";
import * as Tesseract from "tesseract.js";
import * as fs from "fs";
import * as request from "request";
import buffer2thai from "@util/buffer2Thai";

import * as types from "./types/CR60";
// import * as shell from "shelljs";
// import curlirize from "axios-curlirize";

import storage from "@util/diskStorage";
const disk = new storage("disk/reg.data.json", __dirname);

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
  console.log("> init login");
  const loginPage = await axios.get(
    "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.InitLogonServlet",
    {
      withCredentials: true
    }
  );
  const session = cookie2session(loginPage.headers["set-cookie"]);
  console.log("> session", session);
  const baseurl = "https://www2.reg.chula.ac.th";
  const captchaUrl = cheerio("img#CAPTCHA", loginPage.data)[0].attribs.src.replace("..", baseurl);
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
  console.log("> login");
  var options = {
    timeout: 2000,
    method: "POST",
    url: "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.LogonServlet",
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
            const message = buffer2thai(cheerio("FONT[color='#FF0000']", html)[0].children[0].data);
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
  console.log("> ocr", text);
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
  console.log("> cr60");
  return axios
    .get("https://www2.reg.chula.ac.th/servlet/com.dtm.chula.general.servlet.CR60Servlet", {
      responseType: "arraybuffer",
      headers: { Cookie: session }
    })
    .then(res => res.data.toString("binary"))
    .then(buffer2thai)
    .then(html => {
      return _.map(cheerio("form > table[border=0]:not(table[width])", html), term => {
        let time = cheerio("tr:first-child p[align=CENTER] > b > font", term)[0].children[0].data;
        time = time.replace(/\s\s+/g, " ").trim();
        let semesterth = time.split(" ")[0].replace("ภาคการศึกษา", "");
        const period = {
          full: time,
          year: time.slice(-4),
          semesterth: semesterth,
          semester: semesterth.indexOf("ต้น") ? 1 : 2
        };
        const table = _.map(
          cheerio("tr:not(:last-child) table[border=1] tr:not(:last-child)", term),
          tr => _.map(cheerio("td p font", tr), font => font.children[0].data.trim())
        );
        table[0] = table[0].map(s => s.replace("COURSE ", "").toLocaleLowerCase());
        const detail = _.map(
          table.slice(1),
          ar => (_.zipObject(table[0], ar) as unknown) as types.CR60_Course
        );
        const summary = _.assign(
          {},
          ..._.map(
            cheerio("tr:last-child table[border=1] tr:last-child td p font", term),
            font => ({
              [font.children[0].data.trim()]: _.get(font.children[2], "data", null)
            })
          )
        );
        return {
          period,
          detail,
          summary
        } as types.CR60;
      });
    });
}

async function regdoc(session) {
  console.log("> regdoc");
  return axios
    .get(
      "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.admission.servlet.StudentStatusDocumentServlet/Status",
      {
        responseType: "arraybuffer",
        headers: { Cookie: session }
      }
    )
    .then(res => res.data.toString("binary"))
    .then(buffer2thai)
    .then(html => {
      const engname = cheerio("TD.fldDisplay", html)
        .contents()
        .toArray()
        .map(ch => ch.data.replace(/\s\s+/, " ").trim());
      const lead = _.zipObject("เลขนิสิตวรรค ที่นั่งสอบ ชื่อไทย ชื่อสากล".split(" "), engname);
      const sex = {
        เพศ: lead.ชื่อไทย.startsWith("นาย") ? "ชาย" : "หญิง",
        gender: lead.ชื่อสากล.startsWith("Mr") ? "male" : "female"
      };
      const table = _.assign(
        {},
        ..._.map(cheerio("#Table42 TR", html), el => {
          const texts = _.map(
            cheerio(
              "TD[width=80] SPAN, TD[width=100] SPAN, TD[width=120] SPAN, TD[colspan=3] SPAN",
              el
            ).contents(),
            span => span.data
          );
          if (texts.length & 1) texts.push("");
          return _.fromPairs(_.chunk(texts, 2));
        })
      );
      return _.assign({}, lead, sex, table);
    });
}

// PDF
// https://www2.reg.chula.ac.th/servlet/com.dtm.chula.admission.servlet.StudentEntryProfileSearchServlet
async function pinfo(session: string) {
  console.log("> pinfo");
  const html = await axios
    .get(
      "https://www2.reg.chula.ac.th/servlet/com.dtm.chula.admission.servlet.StudentServlet/Registerth",
      {
        responseType: "arraybuffer",
        headers: { Cookie: session }
      }
    )
    .then(res => res.data.toString("binary"))
    .then(buffer2thai);
  // TODO: SCAPING
  // _.map(cheerio("#Tabl35, #Table36, #Table37, #Table38, #Table39", html), tab => {
  //   _.map(
  //     cheerio("td.fldDisplay, td[width=115], td[width=160], td[width=90]", tab).contents(),
  //     td => {
  //       console.log(td);
  //     }
  //   );
  // });
  if (html.indexOf("ท่านไม่มีสิทธิทำรายการนี้")) {
    return { error: true, message: "ท่านไม่มีสิทธิทำรายการนี้" };
  }
  return { html };
}

interface option {
  cr60?: boolean;
  regdoc?: boolean;
  pinfo?: boolean;
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
      cr60: opt.cr60 ? await cr60(session) : null,
      regdoc: opt.regdoc ? await regdoc(session) : null,
      pinfo: opt.pinfo ? await pinfo(session) : null
    };
    await logout(session);
    console.log("-- FINISH --");
    // console.log(JSON.stringify(result, null, 2));
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
