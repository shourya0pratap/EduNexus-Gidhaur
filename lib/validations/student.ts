import { z } from "zod";

export const studentSchema = z.object({
  full_name: z.string().min(2).max(120),
  roll_number: z.string().min(1).max(30),
  date_of_birth: z.string().date(),
  gender: z.string().max(30).optional().nullable(),
  admission_number: z.string().max(50).optional().nullable(),
  parent_name: z.string().max(120).optional().nullable(),
  parent_phone: z.string().max(30).optional().nullable(),
  email: z.string().email().optional().nullable()
});
