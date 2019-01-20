"use strict";
import * as _ from "lodash";
import * as cors from "cors";
import * as morgan from "morgan";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env"
});

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

import scapingAPI from "./scaping/index";
import authAPI from "./sso/index";

app.get("/api", (req, res) => res.status(200).send("Hello from Gened.ml"));
app.use("/api/scape", scapingAPI);
app.use("/api/auth", authAPI);

app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  if (typeof err == "string") return res.status(400).send(err);
  else return res.status(500).send(err);
});

const PORT = process.env.PORT;

app.listen(PORT.valueOf(), () => {
  console.log("SERVER START at port " + PORT);
});

export default app;
