export interface Resume {
  id: number;
  path: string;
  fileName: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormattingError {
  original: string;
  suggestion: string;
}

// Calculado pelo back a partir da finalScore (75+, 60–74, abaixo de 60)
export type FeedbackTitle = 'EXCELLENT' | 'GOOD_WITH_ADJUSTMENTS' | 'NEEDS_ATTENTION';

//Cópia dos campos da tabela para usar
export interface Review {
  id: number;
  resumeId: number;
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
  createdAt: Date;
}
