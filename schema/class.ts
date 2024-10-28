import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for a single student
interface IStudent {
  studentName: string;
  rollNumber: string;
  gender: string;
  contactNumber: string;
  address: string;
}

// Interface for the class form with students array
interface IClassForm extends Document {
  department: string;
  className: string;
  students: IStudent[];
}

// Schema for the student structure
const studentSchema = new Schema<IStudent>({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    minlength: [1, 'Student name cannot be empty'],
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true, // assuming each roll number is unique
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'], // specifying gender options
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    minlength: [10, 'Contact number must be at least 10 digits'],
    maxlength: [15, 'Contact number must be at most 15 digits'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [1, 'Address cannot be empty'],
  },
});

// Schema for the class form
const classFormSchema = new Schema<IClassForm>({
  department: {
    type: String,
    required: [true, 'Department is required'],
    minlength: [2, 'Department name must be at least 2 characters long'],
  },
  className: {
    type: String,
    required: [true, 'Class name is required'],
    minlength: [2, 'Class name must be at least 2 characters long'],
  },
  students: {
    type: [studentSchema], // Embeds the student schema
  },
});

// Model definition
const Class: Model<IClassForm> =
  mongoose.models.Class || mongoose.model<IClassForm>('Class', classFormSchema);

export { Class };
