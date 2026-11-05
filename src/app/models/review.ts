// Cada envio é uma versão nova, então só tem a data de envio
export interface Resume {
  id: number;
  fileName: string;
  uploadedAt: string; // ISO, sem fuso
}

export interface FormattingError {
  original: string;
  suggestion: string;
}

// Calculado pelo back a partir da finalScore: 90+, 75–89, 60–74, 40–59 e abaixo de 40
export type FeedbackTitle =
  | 'EXCELLENT'
  | 'VERY_GOOD'
  | 'GOOD_WITH_ADJUSTMENTS'
  | 'NEEDS_ATTENTION'
  | 'INSUFFICIENT';

// campos da tabela review p mostrar
export interface Review {
  id: number;
  resumeId: number;
  // Nome do currículo analisado, p mostrar no histórico
  fileName: string;
  jobDescription: string | null;
  jobTitle: string | null;
  weaknesses: string[];
  strengths: string[];
  formattingErrors: FormattingError[];
  attendedRequirements: string[];
  notAttendedRequirements: string[];
  finalScore: number;
  resumeScore: number;
  // Aderência à vaga (0 a 100); null quando a análise é sem vaga
  jobAdherenceScore: number | null;
  feedbackTitle: FeedbackTitle;
  feedbackDescription: string;
  createdAt: string; // ISO, sem fuso
}
