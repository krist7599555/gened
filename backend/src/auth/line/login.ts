import { Request, Response } from "express";
import { users } from "@db/index";
import { cookie, param } from "express-validator/check";
import { assert } from "@util/bodyChecker";
import * as url from "url";

import * as line from "@config/line";

export default [
  cookie("ticket").exists(),
  assert(401),
  async function(req: Request, res: Response) {
    const ticket = req.cookies.ticket;
    if (!ticket) return res.status(400).send("no ticket");
    if (!(await users.find({ ticket }))) {
      return res.status(400).send("ticket not valid, please login again");
    }
    return res.redirect(
      url.format({
        pathname: "https://access.line.me/oauth2/v2.1/authorize",
        query: {
          response_type: "code",
          client_id: line.client_id,
          redirect_uri: line.redirect_uri,
          state: "randomstring",
          scope: "profile openid email",
          // bot_prompt: "normal",
          bot_prompt: "aggressive",
          prompt: "consent"
        }
      })
    );
  }
];
