import mongoose, { Schema, Document, Model } from 'mongoose';

// ICourse interface for individual courses
interface ICourse {
  courseName: string;
  startTime: string;
  days: string[];
  className: string;
}

interface ITeacherCourse extends Document {
  teacherName: string;
  teacherDepartment: string;
  courses: ICourse[];
}

const courseSchema = new Schema<ICourse>({
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

const teacherCourseSchema = new Schema<ITeacherCourse>({
  teacherName: {
    type: String,
    required: [true, 'Teacher Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name can\'t be more than 100 characters'],
  },
  teacherDepartment: {
    type: String,
    required: [true, 'Department is required'],
    minlength: [3, 'Department must be at least 3 characters'],
    maxlength: [100, 'Department can\'t be more than 100 characters'],
  },
  courses: {
    type: [courseSchema], // Embed courseSchema for the courses array
    required: [true, 'At least one course must be added'],
  },
});

const TeacherCourse: Model<ITeacherCourse> =
  mongoose.models.TeacherCourse || mongoose.model<ITeacherCourse>('TeacherCourse', teacherCourseSchema);

export { TeacherCourse };
