import * as express from "express";
import * as _ from "lodash";
import {
  regcookieMiddleware,
  isForceUpdate,
  getlist,
  getcourse
} from "./function";
import { param } from "express-validator/check";
var router = express.Router();

router.get("/", (req, res) => res.sendStatus(200));
router.get("/course", (req, res) => res.status(200).send("require :code"));
router.get(
  "/course/:code",
  param("code").isLength({ min: 7, max: 7 }),
  regcookieMiddleware,
  isForceUpdate,
  async (req, res, next) => {
    let code = req.params.code;
    let cookies = res.locals.$cookie;
    let course = await getcourse(cookies, code, {
      force: req.query.force
    });
    return res.status(200).send(course);
  }
);

router.get("/gened", (req, res) => res.sendStatus(200));
router.get(
  "/gened/:code",
  param("code").matches(/^[1-5]+$/),
  regcookieMiddleware,
  isForceUpdate,
  async (req, res, next) => {
    const cookies = res.locals.$cookie;
    const genedlist = await Promise.all(
      _.map(req.params.code, genedcode =>
        getlist(cookies, { genedcode, force: req.query.force })
      )
    );
    const list = _.flatten(_.map(genedlist, "list"));
    const create = _.min(_.map(genedlist, "create"));
    return res.status(200).json({ create, list });
  }
);

export default router;
