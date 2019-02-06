import { Router, Request, Response, NextFunction } from "express";
import login from "./login";
import verify from "./verify";
const router = Router();

router.get("/", (req: Request, res: Response) => res.sendStatus(200));
router.get("/login", login);
router.get("/verify", verify);

export default router;
