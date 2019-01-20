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
  { strict: false }
);
export const courseDetailSchema = new mongoose.Schema(
  {
    courseId: String,
    yeartime: String,
    group: String,
    course: {
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
      record: {
        type: Map,
        of: [sectionDetailSchema]
      }
    }
  },
  { strict: false }
);

export const courseLittleSchema = new mongoose.Schema(
  {
    cluster: String,
    clusterName: String,
    courseId: String,
    courseName: String,
    dateil: mongoose.Schema.Types.Mixed
  },
  { strict: false }
);
export const genedListSchema = new mongoose.Schema(
  {
    cluster: String,
    list: [courseLittleSchema]
  },
  { strict: false }
);

export const usersSchema = new mongoose.Schema(
  {
    ouid: String,
    name: String,
    faculty: String
  },
  { strict: false }
);
