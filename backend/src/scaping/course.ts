import * as _ from "lodash";
import isForceUpdate from "./middleware/isForceUpdate";
import regcookieMiddleware from "./middleware/regcookieMiddleware";
import getlist from "./function/getlist";
import getcourse from "./function/getcourse";
import { query } from "express-validator/check";
import assertValidate from "@auth/sso/middleware/assertValidator";

import * as db from "@db/index";

const message: string = `\\d{1} for gened,
\\d{2} for faculty,
\\d{10} for course
it can seperate by '+' or ','(%2c)
`;

export default [
  query("q", message)
    .matches(/^([1-5]{1}| |\d{2}|\d{7})+$/)
    .exists(),
  assertValidate(400),
  regcookieMiddleware,
  isForceUpdate,
  async function(req, res) {
    const cookies = res.locals.$cookie;
    const force = req.query.force;
    const codes = req.query.q.split(" ") as string[];
    if (!_.every(codes, code => /^(\d{1,2}|\d{7})$/.test(code))) {
      return res.status(400).json({ codes, message: "code not match pattern" });
    }
    let clusters = [];
    const courses = _.uniq(
      _.flatten(
        await Promise.all(
          _.map(codes, async (code: string) => {
            if (code.length == 7) return [code];
            if (code.length <= 2) {
              const doc = await db.courselist.findOne({ code });
              const lis_nw = !force && doc ? doc.toObject() : await getlist(cookies, code);
              clusters.push(lis_nw);
              await db.courselist.updateOne({ code }, lis_nw, { upsert: true, strict: false });
              return lis_nw.list;
            } else return [];
          })
        )
      )
    );

    const list = await Promise.all(
      courses.map(async course => {
        const doc = await db.course.findOne({ course }, { __v: 0 });
        while (true) {
          try {
            let res1 = doc ? doc.toObject() : { tags: {} };
            let res2 = force ? await getcourse(cookies, course) : res1;
            res2.tags = res1.tags || {};
            for (const { list, kind, info } of clusters) {
              if (kind && list.includes(course)) {
                res2.tags[kind] = info;
              }
            }
            await db.course
              .updateOne({ course: res2.course }, res2, {
                upsert: true,
                strict: false
              })
              .catch(console.error);
            return res2;
          } catch (e) {
            console.error("retry", course);
          }
        }
      })
    ).catch(console.error);

    const create = _.min(_.map(list as any[], "create")); // create time
    return res.status(200).json({
      create,
      list
    });
  }
];
