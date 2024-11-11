import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface for the student document
interface IStudent extends Document {
  studentName: string;
  rollNumber: string;
  gender: string;
  contactNumber: string;
  address: string;
  classId: mongoose.Schema.Types.ObjectId;
}

const studentSchema = new Schema<IStudent>({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  classId: {
    type: String,
    required: [true, 'Class ID is required'],
  },
});

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
export default Student;
