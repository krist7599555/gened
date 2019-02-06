import * as _ from "lodash";
import { Model, Document, Types } from "mongoose";

export default async function getMongoDocs(
  collection: Model<Document>,
  condition
) {
  let doc = await collection.findOne(condition);
  return doc ? _.omit(doc.toJSON(), ["_id", "__v"]) : null;
}
