import { z } from "zod";

export const studentSchema = z.object({
    students: z.array(z.object({
      studentName: z.string()
      .nonempty("Student Name is required")
      .min(3, 'Student name is required'),
      classId: z.string().optional(),
      rollNumber: z.string()
      .nonempty("Roll Number is required"),
      gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required' }),
      contactNumber: z.string().nonempty("Password is required").min(9, 'Contact number is minimum 9 digits'),
      address: z.string().min(1, 'Address is required'),
    }))
  });