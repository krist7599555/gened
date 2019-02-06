import { Request, Response } from "express";
import * as url from "url";

export default (req: Request, res: Response) =>
  res.redirect(
    url.format({
      pathname: "https://access.line.me/oauth2/v2.1/authorize",
      query: {
        response_type: "code",
        client_id: "1642547393",
        redirect_uri: "http://127.0.0.1:3124/api/auth/line/verify",
        state: "randomstring",
        scope: "profile openid email",
        // bot_prompt: "normal",
        bot_prompt: "aggressive",
        prompt: "consent"
      }
    })
  );
