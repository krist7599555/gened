import { Request, Response } from "express";
import submit from "./function/submit";
import * as db from "@db/index";

export default async function(req: Request, res: Response) {
  try {
    const mbti = await submit(req.body);
    await db.users.updateOne(
      { ticket: req.cookies.ticket },
      { mbti },
      { upsert: false, strict: false }
    );
    res.status(200).send(mbti);
  } catch (e) {
    res.status(408).send("time out");
  }
}
