import { Router } from "express";

import sso from "./sso";
import line from "./line";
import { RSA_NO_PADDING } from "constants";

const router = Router();
router.get("/", (req, res) => res.sendStatus(200));
router.use("/sso", sso);
router.use("/line", line);

export default router;
