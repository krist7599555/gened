import * as mongoose from "mongoose";
export const sectionDetailSchema = new mongoose.Schema(
  {
    ตอนเรียน: String,
    วิธีสอน: String,
    วันเรียน: String,
    เวลาเรียน: String,
    อาคาร: String,
    ห้อง: String,
    ผู้สอน: String,
    หมายเหตุ: String,
    จำนวนนิสิต: String,
    เวลาเริ่ม: String,
    เวลาจบ: String
  },
  { strict: false, versionKey: false }
);
export const courseDetailSchema = new mongoose.Schema(
  {
    course: String,
    yeartime: String,
    group: String,
    courseName: {
      id: String,
      nameSHORT: String,
      nameTHAI: String,
      nameENG: String
    },
    faculty: String,
    credit: String,
    creditDetail: {
      credit: String,
      hour: String
    },
    prerequisite: String,
    exam: {
      midterm: String,
      final: String
    },
    schedule: {
      table: [[String]],
      record: Object
    },
    tags: Object
  },
  { strict: false, versionKey: false }
);

export const courseLittleSchema = new mongoose.Schema(
  {
    cluster: String,
    clusterName: String,
    courseId: String,
    courseName: String,
    dateil: mongoose.Schema.Types.Mixed
  },
  { strict: false, versionKey: false }
);

export const courseListSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    list: [String]
  },
  { strict: false, versionKey: false }
);

export const usersSchema = new mongoose.Schema(
  {
    ouid: String,
    name: String,
    faculty: String
  },
  { strict: false, versionKey: false }
);
