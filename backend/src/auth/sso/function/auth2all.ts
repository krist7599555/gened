import { users } from "@db/index";
// import a_cr60 from "./auth2cr60";
// import a_regdoc from "./auth2regdoc";
import a_reg from "./auth2reg";
import a_ticket from "./auth2ticket";
import t_raw from "./ticket2raw";
import u_user from "./user2user";

export default async function(username, password) {
  const ticket = await a_ticket(username, password);
  // const regdoc = await a_regdoc(username, password);
  // const cr60 = await a_cr60(username, password);
  const { regdoc, cr60, pinfo } = await a_reg(username, password, {
    cr60: true,
    regdoc: true,
    pinfo: true
  });
  const user = await u_user(await t_raw(ticket));
  const curr = await users.findOne({ ouid: user.ouid });

  const merg = { ...(curr ? curr.toJSON() : {}), ...user, cr60, regdoc, pinfo };

  const res = await users.updateOne({ ouid: user.ouid }, merg, {
    upsert: true,
    strict: false
  });

  return merg;
}
