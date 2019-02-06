import { Request, Response } from "express";
import * as url from "url";
import axios from "axios";
import * as qs from "qs";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";

export default (req: Request, res: Response) => {
  const { code, state } = req.query;
  axios({
    method: "POST",
    url: "https://api.line.me/oauth2/v2.1/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://127.0.0.1:3124/api/auth/line/verify",
      client_id: "1642547393",
      client_secret: "f0f14ef28d00504ef7992e378eb7506b"
    })
  })
    .then(result => result.data)
    .then(json => {
      console.log(json.id_token);
      const decode: any = jwt.verify(
        json.id_token,
        "f0f14ef28d00504ef7992e378eb7506b"
      );
      return res
        .status(200)
        .json(
          _.assign({ userId: decode.sub, channelId: decode.aud }, json, decode)
        );
    })
    .catch(err => {
      console.log(err.response.data);
      return res.status(400).send(err.response.data);
    });
};
