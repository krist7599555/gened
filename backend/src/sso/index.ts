import { Router, Request, Response, NextFunction } from "express";
import login from "./login";
import validateTicket from "./validateTicket";
import getUserInfo from "./getUserInfo";
import { check, validationResult } from "express-validator/check";

const preventBadRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

const router: Router = Router();

router.post(
  "/login",
  check("username")
    .isNumeric()
    .isLength({ min: 10, max: 10 }),
  check("password").isAlphanumeric(),
  preventBadRequest,
  login
);

router.get("/", (req, res) => res.status(200).send("sso"));
router.get("/getUserInfo/:ouid", getUserInfo);
router.get("/getUserInfo", validateTicket, (req, res) => {
  res.redirect(req.baseUrl + "/getUserInfo/" + res.locals.user.ouid);
});

export default router;
