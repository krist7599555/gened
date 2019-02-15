export interface genedSection {
  ตอนเรียน: string;
  วิธีสอน: string;
  วันเรียน: string;
  เวลาเรียน: string;
  อาคาร: string;
  ห้อง: string;
  ผู้สอน: string;
  หมายเหตุ: string;
  จำนวนนิสิต: string;
  เวลาเริ่ม: string;
  เวลาจบ: string;
  ลงทะเบียน: string;
  ที่นั้งทั้งหมด: string;
}

export interface genedData {
  cluster: string;
  clusterName: string;
  courseId: string;
  courseName: string;
  detail: {
    credit: string;
    exam: {
      midterm: string;
      final: string;
    };
    schedule: {
      [key: string]: Array<genedSection>;
    };
  };
}
