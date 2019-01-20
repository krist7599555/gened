import { Router, Request, Response, NextFunction } from "express";
import db from "../db/index";
const requests = require("superagent");
const client = requests.agent();
import config from "../config";
import * as _ from "lodash";

export default (req: Request, res: Response, next: NextFunction) => {
  const ticket = req.cookies.ticket || req.query.ticket || req.body.ticket;
  console.log(ticket);
  if (!ticket) return res.status(401).send("no ticket");

  client
    .post(config.sso.url + "/serviceValidation")
    .set({
      DeeAppId: config.sso.appId,
      DeeAppSecret: config.sso.appSecret,
      DeeTicket: ticket
    })
    .then(result => {
      const json = JSON.parse(result.text);
      return json;
    })
    .then(async user => {
      const doc = await db.users.findOne({ ouid: user.ouid });
      user = _.assign({}, doc || {}, user);

      // add more information
      if (!user.displayname) {
        user.displayname = user.firstname + " " + user.lastname;
      }

      res.locals.user = user;

      await db.users.updateOne({ ouid: user.ouid }, user, {
        upsert: true,
        strict: false
      });
      next();
    })
    .catch(err => {
      console.error(err.response.data);
      return res.status(401).send(err.response.data);
    });
};
