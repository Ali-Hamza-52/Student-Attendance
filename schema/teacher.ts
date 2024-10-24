import { z } from 'zod';

export const teacherSchema = z.object({
  teacherName: z
    .string()
    .nonempty({ message: "Teacher name is required" })
    .min(3, { message: "Teacher name must be at least 3 characters long" })
    .max(256, { message: "Teacher name must be less than 256 characters" }),
  teacherDepartment: z
    .string()
    .nonempty({ message: "Department is required" })
    .min(2, { message: "Department name must be at least 2 characters long" }),
  courses: z.array(
    z.object({
      courseName: z.string().nonempty({ message: "Course name is required" }),
      startTime: z.string().nonempty({ message: "Start time is required" }),
      days: z
        .array(z.string().nonempty({ message: "Day is required" }))
        .min(1, { message: "At least one day must be selected" }),
      className: z.string().nonempty({ message: "Class name is required" }),
    })
  ).min(1, { message: "At least one course must be added" }),
});
