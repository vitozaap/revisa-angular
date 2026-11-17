import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, type OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import type { FeedbackTitle, Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { AppSidebar } from '../../../sidebar/sidebar';


const FEEDBACK_TONES: Record<FeedbackTitle, { label: string; stroke: string; badge: string }> = {
  // Por enquanto as 5 faixas usam as 3 cores que já existem
  EXCELLENT: { label: 'Excelente', stroke: 'stroke-success', badge: 'bg-success-bg text-success-ink' },
  VERY_GOOD: { label: 'Muito bom', stroke: 'stroke-success', badge: 'bg-success-bg text-success-ink' },
  GOOD_WITH_ADJUSTMENTS: { label: 'Bom, com ajustes', stroke: 'stroke-gold', badge: 'bg-cream text-gold-dark' },
  NEEDS_ATTENTION: { label: 'Precisa de atenção', stroke: 'stroke-danger', badge: 'bg-danger-bg text-danger-ink' },
  INSUFFICIENT: { label: 'Insuficiente', stroke: 'stroke-danger', badge: 'bg-danger-bg text-danger-ink' },
};

// Constantes que definem tamanho da circunferencia do score total
const SCORE_RADIUS = 52;
const SCORE_CIRCUMFERENCE = 2 * Math.PI * SCORE_RADIUS;

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon, RouterLink],
  selector: 'report',
  templateUrl: './report.html',
})
export class Report implements OnInit {
  private reviewService = inject(ReviewService);

  // Vem do parâmetro :id da rota withComponentInputBinding
  id = input.required<string>();

  review = signal<Review | null>(null);
  // Enquanto carrega não mostra o "não encontrado"
  loading = signal(true);

  // No constructor o input id ainda não chegou, por isso busca no ngOnInit
  ngOnInit() {
    this.reviewService.get(Number(this.id())).subscribe({
      next: (review) => {
        this.review.set(review);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  scoreRadius = SCORE_RADIUS;
  scoreCircumference = SCORE_CIRCUMFERENCE;
  scoreOffset = computed(
    () => SCORE_CIRCUMFERENCE * (1 - (this.review()?.finalScore ?? 0) / 100),
  );

  // Usei IA para me ajudar a como gerar a circunferencia do score
  // O título vem do back (escrito la como funciona) aqui somente texto em português e as cores de cada valor
  tone = computed(() => FEEDBACK_TONES[this.review()?.feedbackTitle ?? 'NEEDS_ATTENTION']);
}
