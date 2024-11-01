import mongoose, { Schema, Document, Model } from 'mongoose';
interface ICourse {
  courseName: string;
  startTime: string;
  days: string[];
  className: string;
  classId: string;
}

const courseSchema = new Schema<ICourse>({
  classId:{
    type: String,
    required: [true, 'Class ID is required'],
  },
  courseName: {
    type: String,
    required: [true, 'Course Name is required'],
    minlength: [3, 'Course name must be at least 3 characters'],
    maxlength: [100, 'Course name can\'t be more than 100 characters'],
  },
  startTime: {
    type: String,
    required: [true, 'Start Time is required'],
  },
  days: [
    {
      type: String,
      required: [true, 'Day is required'],
    },
  ],
  className: {
    type: String,
    required: [true, 'Class Name is required'],
    minlength: [3, 'Class name must be at least 3 characters'],
    maxlength: [100, 'Class name can\'t be more than 100 characters'],
  },
});

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export { Course };
