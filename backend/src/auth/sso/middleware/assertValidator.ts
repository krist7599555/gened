import { validationResult } from "express-validator/check";
import { Request, Response, NextFunction } from "express";

export default (code: number = 400) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(code).json({ errors: errors.array() });
  } else {
    next();
  }
};
