import { z } from 'zod';
const environmentSchema = z.object({
  production: z.boolean().nonoptional(),
  primeNgLicense: z.string().nonoptional(),
});

export type Environment = z.infer<typeof environmentSchema>;
