import axios from "axios";
import * as cheerio from "cheerio";
import * as _ from "lodash";
import * as qs from "qs";

import { GENED_CODE, FACULTY_CODE } from "@config/constant";
import buffer2thai from "@util/buffer2Thai";

// code = "1|2|3|4|5" | "21|22"
export async function getlist(cookies: string, code: string) {
  if (!(code in GENED_CODE) && !(code in FACULTY_CODE))
    return { list: [] as string[], kind: null, info: null };
  const html = await axios({
    method: "GET",
    url:
      "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.CourseListNewServlet",
    params: {
      examdateCombo: "I2017207%2F05%2F1475",
      studyProgram: "S",
      semester: "2",
      acadyearEfd: "2561",
      "submit.x": "31",
      "submit.y": "12",
      courseno: code in FACULTY_CODE ? code : "",
      coursename: "",
      examdate: "",
      examstartshow: "",
      examendshow: "",
      faculty: code in FACULTY_CODE ? code : "",
      coursetype: "",
      genedcode: code in GENED_CODE ? code : "",
      cursemester: "2",
      curacadyear: "2561",
      examstart: "",
      examend: "",
      activestatus: "OFF",
      acadyear: "2561",
      lang: "T",
      download: "download"
    },
    withCredentials: true,
    responseType: "arraybuffer",
    headers: {
      Cookie: cookies
    }
  })
    .then(res => {
      return res;
    })
    .then(res => res.data.toString("binary"))
    .then(buffer2thai);

  let list = [] as string[];
  for (const page of _.values(cheerio("TABLE#Table4 TR", html))) {
    try {
      // let link = cheerio("A", page)[0];
      // let name = cheerio("FONT", page)[2];
      let font = cheerio("FONT", page)[0];
      const course = font.children[0].data.trim();
      if (/^\d{7}$/.test(course)) {
        list.push(font.children[0].data.trim());
      }
      // list.push({
      //   courseId: font.children[0].data.trim(),
      //   courseName: name.children[0].data.trim()
      // });
    } catch (e) {}
  }
  if (code in FACULTY_CODE) {
    return {
      list,
      kind: "faculty",
      info: {
        code,
        name: FACULTY_CODE[code]
      }
    };
  } else if (code in GENED_CODE) {
    return {
      list,
      kind: "gened",
      info: {
        code,
        name: GENED_CODE[code].th,
        short: GENED_CODE[code].sht,
        english: GENED_CODE[code].en
      }
    };
  } else {
    return {
      list,
      kind: null,
      info: {
        code
      }
    };
  }
}

export default getlist;
