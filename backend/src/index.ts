"use strict";
import * as _ from "lodash";
import * as cors from "cors";
import * as path from "path";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
import * as express from "express";
import * as fallback from "express-history-api-fallback";
import * as boolParser from "express-query-boolean";
import * as bodyParser from "body-parser";
import * as serveIndex from "serve-index";
import * as cookieParser from "cookie-parser";
import * as module_alias from "module-alias";
import chalk from "chalk";

module_alias.addAliases({
  "@": __dirname,
  "@db": __dirname + "/db",
  "@util": __dirname + "/util",
  "@auth": __dirname + "/auth",
  "@types": __dirname + "/types",
  "@config": __dirname + "/config",
  "@scaping": __dirname + "/scaping",
  "@regchula": __dirname + "/regchula"
});

import scapingAPI from "./scaping/index";
import authAPI from "./auth";
import mbtiAPI from "./mbti";
import microAPI from "./micro";
import hugsnanAPI from "./hugsnan";

dotenv.config({ path: ".env" });
if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: ".env.prod" });
}

const app = express();
const frontend =
  process.env.NODE_ENV == "production"
    ? "/var/www/gened"
    : path.join(__dirname, "..", "..", "frontend/dist");

console.log(chalk.green("[GENED.ML server]"));
console.log();
console.log(chalk.yellow("NODE_ENV:"), process.env.NODE_ENV);
console.log(chalk.yellow("FRONTEND:"), frontend);
console.log();

function vhost(hostname, server) {
  if (!hostname) throw new Error("vhost hostname required");
  if (!server) throw new Error("vhost server required");
  var regexp = new RegExp(
    "^" + hostname.replace(/[^*\w]/g, "\\$&").replace(/[*]/g, "(?:.*?)") + "$",
    "i"
  );
  if (server.onvhost) server.onvhost(hostname);
  return function vhost(req, res, next) {
    if (!req.headers.host) return next();
    var host = req.headers.host.split(":")[0];
    if (!regexp.test(host)) return next();
    if ("function" == typeof server) return server(req, res, next);
    server.emit("request", req, res);
  };
}
app.use(vhost("gened.ml", express.static("/var/www/gened")));
app.use(vhost("hugsnan.ml", express.static("/var/www/hugsnan")));

if (process.env.NODE_ENV == "production") {
  app.use(
    "/static",
    express.static("/root/filesharing/gened"),
    serveIndex("/root/filesharing/gened")
  );
}

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(boolParser());
app.use(cookieParser());

app.get("/api", (req, res) => res.status(200).send("Hello from Gened.ml"));
app.use("/api/scape", scapingAPI);
app.use("/api/auth", authAPI);
app.use("/api/mbti", mbtiAPI);
app.use("/api/micro", microAPI);
app.use("/api/hugsnan", hugsnanAPI);

app.use((err, req, res, next) => {
  console.log("ERROR:", err);
  try {
    return res.status(400).send(err.message);
  } catch {
    try {
      return res.status(400).send(err);
    } catch {
      return res.status(400).send("unknow error");
    }
  }
});

app.use(vhost("gened.ml", fallback("index.html", { root: "/var/www/gened" })));
app.use(vhost("hugsnan.ml", fallback("index.html", { root: "/var/www/hugsnan" })));

app.use(fallback("index.html", { root: frontend }));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontend, "index.html"));
// });

import printroute from "@util/allRouteAPI";
console.log(printroute(app));
console.log();

const PORT = process.env.PORT;
app.listen(PORT.valueOf(), () => {
  console.log(chalk.green("SERVER START"), "at", chalk.yellow("http://localhost:" + PORT));
  console.log();
});

export default app;
