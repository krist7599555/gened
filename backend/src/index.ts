"use strict";
import * as _ from "lodash";
import * as cors from "cors";
import * as path from "path";
import * as morgan from "morgan";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as module_alias from "module-alias";
import * as serveIndex from "serve-index";

module_alias.addAliases({
  "@db": __dirname + "/db",
  "@util": __dirname + "/util",
  "@auth": __dirname + "/auth",
  "@config": __dirname + "/config",
  "@scaping": __dirname + "/scaping",
  "@regchula": __dirname + "/regchula"
});

dotenv.config({ path: ".env" });
if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: ".env.prod" });
}

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

import scapingAPI from "./scaping/index";
import authAPI from "./auth";
import mbtiAPI from "./mbti";

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/static", express.static(__dirname), serveIndex(__dirname));

app.get("/api", (req, res) => res.status(200).send("Hello from Gened.ml"));
app.use("/api/scape", scapingAPI);
app.use("/api/auth", authAPI);
app.use("/api/mbti", mbtiAPI);

app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  return res.status(400).send(err);
});

const PORT = process.env.PORT;

app.listen(PORT.valueOf(), () => {
  console.log("SERVER START at port " + PORT);
  // var host = server.address().address;
  // var port = server.address().port;
  // console.log("my app is listening at http://%s:%s", host, port);
});

export default app;

function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
  } else if (layer.method) {
    console.log(
      "%s /%s",
      layer.method.toUpperCase(),
      path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join("/")
    );
  }
}
function split(thing) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    var match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, "$1").split("/")
      : "<complex:" + thing.toString() + ">";
  }
}
app._router.stack.forEach(print.bind(null, []));

console.log(__dirname);
