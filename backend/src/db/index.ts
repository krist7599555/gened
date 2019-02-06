import * as schema from "./schema";
import * as mongoose from "mongoose";
import * as config from "@config/mongo";

const client = mongoose.createConnection(config.url, {
  useNewUrlParser: true
});

export const users = client.model("users", schema.usersSchema);
export const course = client.model("course", schema.courseDetailSchema);
export const courselist = client.model("courselist", schema.courseListSchema);
