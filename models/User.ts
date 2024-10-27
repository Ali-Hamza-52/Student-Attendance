import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  teacherName: string;
  contactNumber: string;
  department: string;
  password: string;
  address: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  teacherName: {
    type: String,
    required: [true, "Teacher Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [100, "Name can't be more than 100 characters"]
  },
  contactNumber: {
    type: String,
    required: [true, "Contact Number is required"],
    minlength: [10, "Contact number must be at least 10 digits"],
    maxlength: [15, "Contact number can't be more than 15 digits"]
  },
  department: {
    type: String,
    enum: [
      "Arts", "Biology", "Chemistry", "Commerce", "Computer", "Economics",
      "English", "Geography", "History", "Islamiyat", "Literature",
      "Mathematics", "PakStudy", "Physics", "Sociology", "Urdu"
    ],
    required: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"]
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [5, "Address must be at least 5 characters"]
  }
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);