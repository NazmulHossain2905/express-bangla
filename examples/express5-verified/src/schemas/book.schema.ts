// ts-validation পাঠের Zod schema + z.infer উদাহরণ
import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "title খালি হতে পারে না").max(200),
  author: z.string().min(1, "author খালি হতে পারে না"),
  year: z.coerce.number().int().min(1000).max(2026).optional(),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
