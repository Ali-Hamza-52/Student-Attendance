import { z } from "zod";

export const signupSchema = z
  .object({
    teacherName: z
      .string()
      .nonempty("Teacher Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name can't be more than 100 characters"),
    contactNumber: z
      .string()
      .nonempty("Contact Number is required")
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number can't be more than 15 digits"),
    department: z.enum([
      "Arts",
      "Biology",
      "Chemistry",
      "Commerce",
      "Computer",
      "Economics",
      "English",
      "Geography",
      "History",
      "Islamiyat",
      "Literature",
      "Mathematics",
      "PakStudy",
      "Physics",
      "Sociology",
      "Urdu",
    ]),
    // department: z.enum([
    //     'Computer', 'English', 'Urdu', 'Math', 'Physics', 'Chemistry',
    //     'Economics', 'Islamiyat', 'Physical Education'
    //   ]),
    password: z.string()
     .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormInputs = z.infer<typeof signupSchema>;

