import z from 'zod';

export const JOB_DESCRIPTION_MAX_LENGTH = 4000;

export const newAnalysisSchema = z
  .object({
    jobTitle: z.string().max(120, 'Use no máximo 120 caracteres.'),
    jobDescription: z
      .string()
      .max(JOB_DESCRIPTION_MAX_LENGTH, `Use no máximo ${JOB_DESCRIPTION_MAX_LENGTH} caracteres.`),
  })
  // A vaga é opcional, mas se tiver descrição precisa ter título
  .refine((data) => !data.jobDescription.trim() || data.jobTitle.trim(), {
    path: ['jobTitle'],
    message: 'Informe o título da vaga.',
  });

export type NewAnalysisFormData = z.infer<typeof newAnalysisSchema>;
