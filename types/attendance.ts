export interface AttendanceType {
    date: Date;
    classId: string;
    students: {
      rollNumber: string;
      attendance: "P" | "A" | "L";
    }[];
  }