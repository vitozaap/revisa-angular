import z from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().nonempty('Informe seu nome.'),
  email: z.email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres.')
    .max(32, 'A senha pode ter no máximo 32 caracteres.'),
  termsAndPrivacy: z.boolean().refine((accepted) => accepted, 'Você precisa aceitar os termos.'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
