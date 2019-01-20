import axios from "axios";
import config from "../config";

import regData from "./reg.chula";
import db from "../db";

export default (req, res) => {
  // CHECK BODY
  let { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send("require username & password in " + JSON.stringify(req.body));
  axios({
    method: "GET",
    url: config.sso.url + "/login",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Language": "en,da;q=0.9",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      "x-requested-with": "XMLHttpRequest"
    },
    withCredentials: true,
    params: {
      username: username.slice(0, 8),
      password: password,
      service: "https://account.it.chula.ac.th",
      serviceName: "Chula+SSO"
    }
  })
    .then(async result => {
      // reg scape
      const doc: any = await db.users.findOne({ ouid: username });
      if (!doc || !doc.cr60) {
        doc.cr60 = await regData(username, password, { cr60: true });
        await db.users.updateOne({ ouid: username }, doc, {
          upsert: true,
          strict: false
        });
      }

      let ticket = result.data.ticket;
      if (ticket) {
        res.cookie("ticket", ticket, {
          maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).send(ticket);
      } else
        return res
          .clearCookie("ticket")
          .status(401)
          .send("Username/Password Error");
    })
    .catch(err => {
      console.error("[E] [LOGIN]", err);
      return res.status(500).send("something went wrong");
    });
};
