import { DEPARTMENTS } from "@/localDb/departments";
import { z } from "zod";

export const classSchema = z.object({
  department: z.enum(DEPARTMENTS, { required_error: 'Department is required' }),
  className: z.string().nonempty('Class name is required').min(4, 'Use Valid class name like BSIT-8 , First Year'),
  session: z.string().refine((val) => val >= "2020" && val <= "2050", {
    message: "Session must be between 2020 and 2050",
  }),
});
