import { courseDetailSchema, genedListSchema, usersSchema } from "./schema";
import * as mongoose from "mongoose";

const client = mongoose.createConnection("mongodb://127.0.0.1:27017/gened", {
  useNewUrlParser: true
});

export const course = client.model("course", courseDetailSchema);
export const genedlist = client.model("genedlist", genedListSchema);
export const users = client.model("users", usersSchema);
export default { course, genedlist, users };
