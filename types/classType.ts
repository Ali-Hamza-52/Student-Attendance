import { Document } from "mongoose";

export interface ClassFormValues {
    department: string;
    className: string;
    session: string;
  }

export interface IClass extends Document {
    department: string;
    className: string;
    session: string;
  }
  