import { z } from "zod";

export const attendanceSchema = z.object({
    date: z.date(),
    classId: z.string(),
    students: z.array(
      z.object({
        rollNumber: z.string(),
        attendance: z.enum(["P", "A", "L"]).default("A"),
      })
    ),
  });
  