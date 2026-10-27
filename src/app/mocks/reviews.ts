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
    strongPoints: [
      'Formação e cursos bem posicionados no topo da página.',
      'Projeto acadêmico com link do repositório no GitHub.',
      'Uma página só, na ordem esperada para vagas de estágio.',
    ],
    weakPoints: [
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
    resumeScore: 75,
    descriptionScore: 68,
    createdAt: new Date(2026, 7, 30, 14, 12),
  },
  {
    id: 3,
    resumeId: 2,
    jobDescription: 'Vaga de analista de suporte júnior...',
    jobTitle: 'Analista de Suporte Júnior — Datacorp',
    strongPoints: [
      'Experiência com atendimento descrita com clareza.',
      'Certificações relevantes para a área de suporte.',
    ],
    weakPoints: ['Faltam ferramentas de chamados usadas no dia a dia.'],
    formattingErrors: [{ original: 'suporte tecnico', suggestion: 'suporte técnico' }],
    attendedRequirements: ['Atendimento ao cliente', 'Windows', 'Redes'],
    notAttendedRequirements: ['ITIL'],
    finalScore: 81,
    resumeScore: 78,
    descriptionScore: 84,
    createdAt: new Date(2026, 7, 22, 9, 40),
  },
  {
    id: 2,
    resumeId: 2,
    jobDescription: 'Estágio em desenvolvimento web...',
    jobTitle: 'Estágio em Desenvolvimento Web — Órbita Digital',
    strongPoints: ['Projetos pessoais com tecnologias pedidas na vaga.'],
    weakPoints: [
      'Objetivo profissional não cita a área de desenvolvimento web.',
      'Datas das experiências em formatos diferentes.',
    ],
    formattingErrors: [{ original: 'Jan/24 - 03/2025', suggestion: 'jan/2024 – mar/2025' }],
    attendedRequirements: ['HTML e CSS', 'JavaScript'],
    notAttendedRequirements: ['Git', 'Inglês intermediário'],
    finalScore: 64,
    resumeScore: 66,
    descriptionScore: 61,
    createdAt: new Date(2026, 7, 11, 19, 5),
  },
  {
    id: 1,
    resumeId: 1,
    jobDescription: null,
    jobTitle: null,
    strongPoints: ['Informações de contato completas e fáceis de achar.'],
    weakPoints: [
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
    resumeScore: 58,
    descriptionScore: null,
    createdAt: new Date(2026, 7, 3, 16, 28),
  },
];
