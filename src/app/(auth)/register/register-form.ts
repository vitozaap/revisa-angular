import z from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty().nonoptional(),
  email: z.email().nonempty().nonoptional(),
  password: z.string().min(6).max(32).nonoptional(),
  termsAndPrivacy: z.boolean().nonoptional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
