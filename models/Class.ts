import { IClass } from '@/types/classType';
import mongoose, { Schema } from 'mongoose';

const classSchema = new Schema<IClass>({
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  className: {
    type: String,
    required: [true, 'Class name is required'],
  },
  session: {
    type: String,
    required: [true, 'Session is required'],
  },
});

const Class =  mongoose.models.Class || mongoose.model<IClass>('Class', classSchema);
export default Class;
