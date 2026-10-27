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

//Cópia dos campos da tabela para usar 
export interface Review {
  id: number;
  resumeId: number;
  jobDescription: string | null;
  jobTitle: string | null;
  weakPoints: string[];
  strongPoints: string[];
  formattingErrors: FormattingError[];
  attendedRequirements: string[];
  notAttendedRequirements: string[];
  finalScore: number;
  resumeScore: number;
  descriptionScore: number | null;
  createdAt: Date;
}
