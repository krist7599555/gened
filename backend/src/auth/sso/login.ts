import { Request, Response } from "express";
import axios from "axios";
import * as config from "@config/index";
import * as _ from "lodash";
import { body } from "express-validator/check";
import assert from "./middleware/assertValidator";
import auth2ticket from "./function/auth2ticket";

import auth2all from "./function/auth2all";
import { log } from "util";

export default [
  body("username", "username must be 10 digit numeric")
    .isNumeric()
    .isLength({ min: 10, max: 10 }),
  body("password").isAlphanumeric(),
  assert(400),
  async (req: Request, res: Response) => {
    let { username, password } = req.body;
    try {
      const ticket = await auth2ticket(username, password);
      // res.cookie("ticket", ticket, {
      //   maxAge: 6 * 60 * 1000
      // });
      const json = await auth2all(username, password);
      return res.status(200).send(_.assign({ ticket }, json));
    } catch (e) {
      try {
        return res.status(400).send(e);
      } catch (e1) {
        console.error(e);
        return res.status(400).send("error");
      }
    }
  }
];
