import * as iconv from "iconv-lite";
import * as _ from "lodash";
import { Model, Document, Types } from "mongoose";

/* special thank to : http://www.online-decoder.com/th */
export function buffer2thai(data: Buffer | string) {
  data = data instanceof Buffer ? data : Buffer.from(data, "binary");
  return iconv.decode(data, "ISO-8859-11");
}

export function objId2Time(_id: string | number) {
  const timestamp = Types.ObjectId(_id).getTimestamp();
  return {
    timestamp
  };
}

export async function getMongoDocs(collection: Model<Document>, condition) {
  let doc = await collection.findOne(condition);
  return doc ? _.omit(doc.toJSON(), ["_id", "__v"]) : null;
  // if (doc) {
  //   const _id = doc._id;
  //   const createTime = Types.ObjectId(_id).getTimestamp();
  //   const diffTime = new Date().getTime() - createTime.getTime();
  //   if (diffTime > 60 * 60 * 1000) {
  //     await collection.deleteOne(condition);
  //   } else return doc;
  // }
  // return null;
}
