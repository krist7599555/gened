import * as express from "express";
import * as cheerio from "cheerio";
import course from "./course";

var router = express.Router();

router.get("/", (req, res) => res.sendStatus(200));
router.get("/course", course);

export default router;
