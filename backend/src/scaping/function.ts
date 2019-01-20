import axios from "axios";
import * as _ from "lodash";
import * as cheerio from "cheerio";
import { buffer2thai, getMongoDocs } from "./utility";
import { GENED } from "../const";

import db from "../db/index";

export const isForceUpdate = (req, res, next) => {
  req.query.force = ["", "true", true, 1, "1"].includes(req.query.force);
  next();
};

export async function regcookie() {
  return await axios({
    method: "GET",
    url:
      "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.QueryCourseScheduleNewServlet",
    withCredentials: true
  }).then(res => _.join(res.headers["set-cookie"], ";"));
}

export async function regcookieMiddleware(req: Request, res, next) {
  const cookie = await regcookie().catch(next);
  res.locals.$cookie = cookie;
  await axios({
    method: "GET",
    url:
      "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.CourseListNewServlet",
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
      faculty: "",
      coursetype: "",
      genedcode: "1",
      cursemester: "1",
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
      Cookie: cookie
    }
  });
  next();
}

interface getlistOption {
  genedcode?: string; // "1|2|3|4|5"
  force?: boolean;
}
export async function getlist(cookies, params: getlistOption) {
  if (!params.genedcode) throw "no genedcode";
  let docs = await getMongoDocs(db.genedlist, { cluster: params.genedcode });
  if (docs && !params.force) {
    return docs;
  }
  const html = await axios({
    method: "GET",
    url:
      "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.CourseListNewServlet",
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
      faculty: "",
      coursetype: "",
      genedcode: "4",
      cursemester: "1",
      curacadyear: "2561",
      examstart: "",
      examend: "",
      activestatus: "OFF",
      acadyear: "2561",
      lang: "T",
      download: "download",
      ...params
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

export async function getcourse(
  cookies: string,
  course: string,
  option: getlistOption
) {
  let docs = await getMongoDocs(db.course, { courseId: course });
  if (docs && !option.force) {
    return docs;
  }
  console.log("- updating course: ", course);
  const html = await axios({
    method: "GET",
    url:
      "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.CourseScheduleDtlNewServlet",
    params: {
      courseNo: course,
      studyProgram: "S"
    },
    headers: {
      Cookie: cookies
    },
    responseType: "arraybuffer"
  }).then(res => res.data.toString("binary"));

  let [top, info, credit, exam, schedule] = _.values(
    cheerio("FORM TABLE", html)
  );
  let ginfo = _.map([info, credit, exam], mytable => {
    let m = _.map(cheerio("FONT", mytable), dom => {
      let res = [];
      for (let txt of dom.children || []) {
        if (txt && txt.type == "text") {
          res.push(txt.data.trim());
        } else if (txt && txt.children) {
          res.push(txt.children[0].data.trim());
        }
      }
      return res;
    });
    return _.flatten(m)
      .map(buffer2thai)
      .map(s => s.replace(/\s\s+/g, " "));
  });

  if (_.isEmpty(ginfo[0])) {
    throw "invalid course code";
  }
  if (ginfo[1][0] == "ระบบยังไม่พร้อมใช้งานในขณะนี้") {
    throw "course number is invalid";
  }

  let scedtable: string[][] = _.map(cheerio("TBODY TR", schedule), row => {
    let res = _.map(cheerio("TD", row), box => {
      try {
        const FONT = cheerio("FONT", box)[0].children[0];
        if (FONT.type == "text") return FONT.data.trim().replace(/\s\s+/g, " ");
        else if (FONT.type == "tag") {
          const nobr = cheerio("NOBR", box)[0];
          return nobr.children[0].data.trim().replace(/\s\s+/g, " ");
        } else {
          return "";
        }
      } catch (e) {
        return "";
      }
    })
      .map(buffer2thai)
      .reduce((ar, str) => {
        if (str == "วัน-เวลาเรียน") {
          ar.push("วันเรียน");
          ar.push("เวลาเรียน");
        } else if (str != "Regis/Max") {
          ar.push(str);
        }
        return ar;
      }, []);
    return res[0] == "" && /^[0-9]+$/.test(res[1]) ? res.slice(1) : res;
  }).slice(1);

  // FILL EMPTY SLOT
  const genedSection = new Set();
  for (let i = 0; i < scedtable.length; ++i) {
    while (scedtable[i].length < 9) scedtable[i].push("");
    scedtable[i][7] = scedtable[i][7].replace(/GEN(-| )?ED(-| )/g, "GENED-");
    if (
      scedtable[i][0] == "" ||
      (i && scedtable[i][0] == scedtable[i - 1][0])
    ) {
      for (let j of [0, 7, 8]) {
        if (scedtable[i][j] == "") scedtable[i][j] = scedtable[i - 1][j];
      }
    }
    if (scedtable[i][7].indexOf("GENED") != -1) {
      genedSection.add(scedtable[i][0]);
    }
  }

  // MERGE TIME
  scedtable = (() => {
    const newscedtable = [scedtable[0]];
    _.map(scedtable.slice(1), row => {
      const last = _.last(newscedtable);
      const same = _.zipWith(row, last, _.isEqual);
      if (_.every(_.pick(same, [0, 2, 4, 5, 6, 7, 8]))) {
        // console.log("=", row, last);
        const tm1 = last[3];
        const tm2 = row[3];
        if (tm1 == tm2) {
          newscedtable[newscedtable.length - 1][1] += " " + row[1];
        } else {
          try {
            const [a, b] = tm1.split("-");
            const [c, d] = tm2.split("-");
            if (b == c) {
              newscedtable[newscedtable.length - 1][3] = `${a}-${d}`;
            } else {
              throw "time not connect";
            }
          } catch (e) {
            newscedtable.push(row);
          }
        }
      } else {
        newscedtable.push(row);
      }
    });
    return newscedtable;
  })();

  let scedbyscetion = (() => {
    let objlist = _.map(scedtable.slice(1), row => {
      return _.zipObject(scedtable[0], row);
    });
    let grpbysect = Object(_.groupBy(objlist, "ตอนเรียน"));
    for (const sec in grpbysect) {
      for (let idx in grpbysect[sec]) {
        let record = grpbysect[sec][idx];
        try {
          const [reg, mxx] = record["จำนวนนิสิต"].split("/");
          record["ลงทะเบียน"] = Number(reg);
          record["ที่นั้งทั้งหมด"] = Number(mxx);
        } catch (e) {
          console.log(
            `cannot split ${record["จำนวนนิสิต"]} ในรายวิชา ${course}`
          );
        }
        if (record["เวลาเรียน"].indexOf("-") != -1) {
          [record["เวลาเริ่ม"], record["เวลาจบ"]] = _.split(
            record["เวลาเรียน"],
            "-"
          );
        } else {
          record["เวลาเริ่ม"] = record["เวลาจบ"] = record["เวลาเรียน"];
        }
      }
    }
    return grpbysect;
  })();
  ginfo[2] = ginfo[2].filter(s => {
    return ["วันสอบกลางภาค :", "", "วันสอบปลายภาค :"].indexOf(s) == -1;
  });
  if (ginfo[2][0] == ginfo[2][1] + " " + ginfo[2][2]) {
    ginfo[2] = [ginfo[2][0], ginfo[2][0]];
  }
  // console.log(ginfo);
  const result = {
    courseId: ginfo[0][2],
    yeartime: ginfo[0][0].replace("  ", " "),
    group: ginfo[0][1],
    course: {
      id: ginfo[0][2],
      nameSHORT: ginfo[0][3],
      nameTHAI: ginfo[0][4],
      nameENG: ginfo[0][5]
    },
    create: new Date().getTime(),
    faculty: ginfo[0][6],
    credit: ginfo[1][0],
    creditDetail: {
      credit: ginfo[1][2],
      hour: ginfo[1][3]
    },
    prerequisite: ginfo[1][5],
    exam: {
      midterm: ginfo[2][0].replace(/\s\s+/g, " "),
      final: ginfo[2][1].replace(/\s\s+/g, " ")
    },
    schedule: {
      table: scedtable,
      record: scedbyscetion,
      genedSection: Array.from(genedSection).map(Number)
    }
  };
  await db.course.updateOne({ courseId: result.courseId }, result, {
    upsert: true,
    strict: false
  });
  return result;
}
