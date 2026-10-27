import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().nonempty('Informe sua senha.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
