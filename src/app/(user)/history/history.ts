import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { EllipsisH } from '@primeicons/angular/ellipsis-h';
import { PIcon } from '@primeicons/angular/p-icon';
import { RouterLink } from '@angular/router';
import { ConfirmationService, type MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { type Menu, MenuModule } from 'primeng/menu';
import { RESUMES, REVIEWS } from '../../mocks/reviews';
import { AppSidebar } from '../../sidebar/sidebar';

interface Analysis {
  id: number;
  fileName: string;
  jobTitle: string | null;
  score: number;
  createdAt: Date;
}

type Filter = 'all' | 'with-job' | 'without-job';

@Component({
  imports: [
    AppSidebar,
    ButtonModule,
    ConfirmDialogModule,
    DatePipe,
    EllipsisH,
    MenuModule,
    PIcon,
    RouterLink,
  ],
  providers: [ConfirmationService],
  selector: 'history',
  templateUrl: './history.html',
})
export class History {
  private confirmationService = inject(ConfirmationService);

  filters: { label: string; value: Filter }[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Com vaga', value: 'with-job' },
    { label: 'Sem vaga', value: 'without-job' },
  ];
  filter = signal<Filter>('all');

  // Monta a lista a partir dos dados de exemplo (Review + Resume) enquanto não está integrado ao back
  analyses = signal<Analysis[]>(
    REVIEWS.map((review) => ({
      id: review.id,
      fileName: RESUMES.find((resume) => resume.id === review.resumeId)?.fileName ?? '',
      jobTitle: review.jobTitle,
      score: review.finalScore,
      createdAt: review.createdAt,
    })),
  );

  // aqui retorna o maior valor usando .max() entre as analises, mapeando pelo score
  bestScore = computed(() => Math.max(...this.analyses().map((analysis) => analysis.score)));

  // so pega o id da primeira da array
  latestId = computed(() => this.analyses()[0]?.id);

  //Usei computed por ser um valor derivado das análises e por ser somente leitura (li nas docs oficiais sobre filtros e valores computados)
  filteredAnalyses = computed(() => {
    switch (this.filter()) {
      case 'with-job':
        return this.analyses().filter((analysis) => analysis.jobTitle);
      case 'without-job':
        return this.analyses().filter((analysis) => !analysis.jobTitle);
      default:
        return this.analyses();
    }
  });

  //funçãozinha somente para definir cores e styles 
  scoreClass(score: number) {
    if (score >= 75) return 'bg-success-bg text-success-ink';
    if (score >= 60) return 'bg-cream text-gold-dark';
    return 'bg-danger-bg text-danger-ink';
  }

  // Análise do menu de ações aberto (o menu é um só, compartilhado entre os itens da lista)
  private selectedAnalysis: Analysis | null = null;

  actionItems: MenuItem[] = [
    {
      label: 'Excluir',
      icon: 'trash',
      // Mesmo padrão do item "Delete" nos exemplos de menu das docs do PrimeNG
      linkClass:
        'text-red-500! dark:text-red-400! [&_.p-menu-item-icon]:text-red-500! dark:[&_.p-menu-item-icon]:text-red-400!',
      command: () => this.confirmDelete(),
    },
  ];

  openActions(event: Event, analysis: Analysis, menu: Menu) {
    this.selectedAnalysis = analysis;
    menu.toggle(event);
  }

  // Segue o exemplo "Basic" do ConfirmDialog nas docs do PrimeNG
  private confirmDelete() {
    const analysis = this.selectedAnalysis;
    if (!analysis) return;

    this.confirmationService.confirm({
      message: `Deseja excluir o relatório de "${analysis.jobTitle ?? analysis.fileName}"?`,
      header: 'Excluir análise',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },
      //dev, por enquanto só remove da lista; depois vai chamar o back para excluir
      accept: () => this.analyses.update((list) => list.filter((item) => item.id !== analysis.id)),
    });
  }
}
