export const MAX_RESUME_SIZE = 5 * 1024 * 1024;

// Retorna a mensagem de erro, ou null se o arquivo for um PDF válido
export function validateResumeFile(file: File): string | null {
  if (file.type !== 'application/pdf') return 'O arquivo precisa ser um PDF.';
  if (file.size > MAX_RESUME_SIZE) return 'O arquivo precisa ter até 5 MB.';
  return null;
}
