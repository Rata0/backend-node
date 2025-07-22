import z from "zod";

export const UserCreateSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["USER", "ADMIN"]).optional(),
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
