import { Router, Request, Response, NextFunction } from "express";
import login from "./login";
// import validateTicket from "@auth/sso/getUserInfo/validateTicket";
// import getUserInfo from "@auth/sso/getUserInfo/getUserInfo";
import { body, check, validationResult } from "express-validator/check";
import assertValidator from "@auth/sso/middleware/assertValidator";

const router: Router = Router();

router.get("/", (req, res) => res.status(200).send("sso"));

router.post("/login", login);

import * as getUserInfo from "./getUserInfo";
router.get("/getUserInfo", getUserInfo.root);
router.get("/getUserInfo/:ouid", getUserInfo.ouid);

export default router;
