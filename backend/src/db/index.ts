import * as schema from "./schema";
import * as mongoose from "mongoose";
import * as config from "@config/mongo";

mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection open to");
});

mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error:", err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});

const client = mongoose.createConnection(config.url, {
  useNewUrlParser: true
});

export const users = client.model("users", schema.usersSchema);
export const course = client.model("course", schema.courseDetailSchema);
export const courselist = client.model("courselist", schema.courseListSchema);
