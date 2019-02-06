import * as _ from "lodash";
import * as db from "@db/index";
import axios from "axios";
import getMongoDocs from "@util/getMongoDocs";
import getcourse from "./getcourse";
import { GENED } from "@config/constant";
export interface getlistOption {
  code?: string; // "1|2|3|4|5" | "21|22" | "2110101"
  force?: boolean;
}

export async function getlist(cookies, params: getlistOption) {
  if (!params.code) throw "no param q=?";
  const code = params.code;
  if (![1, 2, 7].includes(code.length)) throw `code ${code} is not valid`;
  let docs = await getMongoDocs(db.genedlist, { cluster: code });
  if (docs && !params.force) {
    return docs;
  }
  const html = await axios({
    method: "GET",
    url: "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.CourseListNewServlet",
    params: {
      examdateCombo: " I2017207%2F05%2F1475",
      studyProgram: "S",
      semester: "2",
      acadyearEfd: "2561",
      "submit.x": "31",
      "submit.y": "12",
      courseno: "",
      coursename: "",
      examdate: "",
      examstartshow: "",
      examendshow: "",
      faculty: code.length == 2 ? code : "",
      coursetype: "",
      genedcode: code.length == 1 ? code : "",
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
  }).then(res => res.data.toString("binary"));

  let res = [];
  for (const page of _.values(cheerio("TABLE#Table4 TR", html))) {
    try {
      // let link = cheerio("A", page)[0];
      let font = cheerio("FONT", page)[0];
      let name = cheerio("FONT", page)[2];

      let obj = {
        cluster: params.genedcode,
        clusterName: GENED[params.genedcode],
        courseId: font.children[0].data.trim(),
        courseName: name.children[0].data.trim(),
        detail: null
      };
      if (!obj.courseName) throw "no course";

      // DETAIL
      const coursedetail = await getcourse(cookies, obj.courseId, {
        force: params.force
      });
      const { exam, schedule, credit, course, create } = Object(coursedetail);
      obj.detail = {
        create,
        schedule: schedule.record,
        genedSection: schedule.genedSection,
        credit,
        course
      };

      res.push(obj);
    } catch (e) {}
  }

  const result = {
    cluster: params.genedcode,
    create: new Date().getTime(),
    list: res
  };
  await db.genedlist.updateOne({ cluster: result.cluster }, result, {
    upsert: true,
    strict: false
  });
  return result;
}

export default getlist;
