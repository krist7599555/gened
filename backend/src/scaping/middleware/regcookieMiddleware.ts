import axios from "axios";
import regcookie from "@scaping/function/getregcookie";

export async function regcookieMiddleware(req: Request, res, next) {
  const cookie = await regcookie().catch(next);
  res.locals.$cookie = cookie;
  await axios({
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

export default regcookieMiddleware;
