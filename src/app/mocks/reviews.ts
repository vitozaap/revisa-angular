import type { Resume, Review } from '../models/review';

// Dados de exemplo enquanto não está integrado ao back
export const RESUMES: Resume[] = [
  {
    id: 3,
    path: 'resumes/1/curriculo-joao-da-silva.pdf',
    fileName: 'curriculo-joao-da-silva.pdf',
    userId: 1,
    createdAt: new Date(2026, 7, 30, 14, 10),
    updatedAt: new Date(2026, 7, 30, 14, 10),
  },
  {
    id: 2,
    path: 'resumes/1/curriculo-joao-v2.pdf',
    fileName: 'curriculo-joao-v2.pdf',
    userId: 1,
    createdAt: new Date(2026, 7, 11, 19, 0),
    updatedAt: new Date(2026, 7, 11, 19, 0),
  },
  {
    id: 1,
    path: 'resumes/1/curriculo-joao-v1.pdf',
    fileName: 'curriculo-joao-v1.pdf',
    userId: 1,
    createdAt: new Date(2026, 7, 3, 16, 20),
    updatedAt: new Date(2026, 7, 3, 16, 20),
  },
];

// Ordenadas da mais recente para a mais antiga
export const REVIEWS: Review[] = [
  {
    id: 4,
    resumeId: 3,
    jobDescription: 'Vaga de desenvolvedor front-end júnior com React e TypeScript...',
    jobTitle: 'Desenvolvedor(a) Front-end Júnior — Nuvemtech',
    strengths: [
      'Formação e cursos bem posicionados no topo da página.',
      'Projeto acadêmico com link do repositório no GitHub.',
      'Uma página só, na ordem esperada para vagas de estágio.',
    ],
    weaknesses: [
      'Nenhum resultado medido: inclua números nas experiências.',
      'Resumo profissional genérico, sem a área de interesse.',
      'Habilidades em lista longa, sem separar nível de domínio.',
    ],
    formattingErrors: [
      { original: 'atividade do setor', suggestion: 'atividades do setor' },
      { original: 'dinamico', suggestion: 'dinâmico' },
      { original: 'experiencia com Git', suggestion: 'experiência com Git' },
      { original: 'Três fontes diferentes', suggestion: 'padronize em uma só' },
    ],
    attendedRequirements: ['HTML e CSS', 'JavaScript', 'Git', 'React'],
    notAttendedRequirements: ['Testes', 'Acessibilidade', 'TypeScript'],
    finalScore: 72,
    feedbackTitle: 'GOOD_WITH_ADJUSTMENTS',
    feedbackDescription:
      'Seu currículo está bem estruturado, mas as experiências descrevem tarefas em vez de resultados.',
    resumeScore: 76,
    jobAdherenceScore: 68,
    createdAt: new Date(2026, 7, 30, 14, 12),
  },
  {
    id: 3,
    resumeId: 2,
    jobDescription: 'Vaga de analista de suporte júnior...',
    jobTitle: 'Analista de Suporte Júnior — Datacorp',
    strengths: [
      'Experiência com atendimento descrita com clareza.',
      'Certificações relevantes para a área de suporte.',
    ],
    weaknesses: ['Faltam ferramentas de chamados usadas no dia a dia.'],
    formattingErrors: [{ original: 'suporte tecnico', suggestion: 'suporte técnico' }],
    attendedRequirements: ['Atendimento ao cliente', 'Windows', 'Redes'],
    notAttendedRequirements: ['ITIL'],
    finalScore: 81,
    feedbackTitle: 'EXCELLENT',
    feedbackDescription:
      'Currículo claro e alinhado à vaga; faltam só detalhes sobre as ferramentas do dia a dia.',
    resumeScore: 78,
    jobAdherenceScore: 84,
    createdAt: new Date(2026, 7, 22, 9, 40),
  },
  {
    id: 2,
    resumeId: 2,
    jobDescription: 'Estágio em desenvolvimento web...',
    jobTitle: 'Estágio em Desenvolvimento Web — Órbita Digital',
    strengths: ['Projetos pessoais com tecnologias pedidas na vaga.'],
    weaknesses: [
      'Objetivo profissional não cita a área de desenvolvimento web.',
      'Datas das experiências em formatos diferentes.',
    ],
    formattingErrors: [{ original: 'Jan/24 - 03/2025', suggestion: 'jan/2024 – mar/2025' }],
    attendedRequirements: ['HTML e CSS', 'JavaScript'],
    notAttendedRequirements: ['Git', 'Inglês intermediário'],
    finalScore: 64,
    feedbackTitle: 'GOOD_WITH_ADJUSTMENTS',
    feedbackDescription:
      'Os projetos combinam com a vaga, mas o objetivo e as datas precisam de ajustes.',
    resumeScore: 67,
    jobAdherenceScore: 61,
    createdAt: new Date(2026, 7, 11, 19, 5),
  },
  {
    id: 1,
    resumeId: 1,
    jobDescription: null,
    jobTitle: null,
    strengths: ['Informações de contato completas e fáceis de achar.'],
    weaknesses: [
      'Experiências sem descrição do que foi feito.',
      'Currículo com duas páginas para pouca experiência.',
    ],
    formattingErrors: [
      { original: 'conhecimento em excel', suggestion: 'conhecimento em Excel' },
      { original: 'pro-ativo', suggestion: 'proativo' },
    ],
    attendedRequirements: [],
    notAttendedRequirements: [],
    finalScore: 58,
    feedbackTitle: 'NEEDS_ATTENTION',
    feedbackDescription:
      'As experiências não explicam o que foi feito e o currículo está longo para o seu momento.',
    resumeScore: 58,
    jobAdherenceScore: null,
    createdAt: new Date(2026, 7, 3, 16, 28),
  },
];
