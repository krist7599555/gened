import * as _ from "lodash";
import axios from "axios";

export async function regcookie() {
  return await axios({
    method: "GET",
    url:
      "https://cas.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.QueryCourseScheduleNewServlet",
    withCredentials: true
  }).then(res => _.join(res.headers["set-cookie"], ";"));
}

export default regcookie;
