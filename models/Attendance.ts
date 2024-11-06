import mongoose, { Schema, Document, Types } from "mongoose";

interface IAttendanceStudent {
  rollNumber: string;
  attendance: "P" | "A" | "L";
}

export interface IAttendance extends Document {
  date: Date;
  classId: string;
  students: IAttendanceStudent[];
}

const attendanceStudentSchema = new Schema<IAttendanceStudent>({
  rollNumber: {
    type: String,
    required: true,
  },
  attendance: {
    type: String,
    enum: ["P", "A", "L"],
    default: "A",
    required: true,
  },
});

const attendanceSchema = new Schema<IAttendance>({
  date: {
    type: Date,
    required: true,
    default: Date.now, 
  },
  classId: {
    type: String,
    ref: "Class",
    required: true,
  },
  students: {
    type: [attendanceStudentSchema],
    required: true,
  },
});

const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
