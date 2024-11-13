import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  students: {
    type: [{
      rollNumber: String,
      attendance: String,
    }],
    required: true,
  },
});


const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
