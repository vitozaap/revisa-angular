import { DatePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import type { FeedbackTitle, Review } from '../../../models/review';
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
export class Report {
  // Vem do parâmetro :id da rota withComponentInputBinding
  id = input.required<string>();

  // null enquanto não vem do back (buscar pelo id da rota)
  review = signal<Review | null>(null);

  scoreRadius = SCORE_RADIUS;
  scoreCircumference = SCORE_CIRCUMFERENCE;
  scoreOffset = computed(
    () => SCORE_CIRCUMFERENCE * (1 - (this.review()?.finalScore ?? 0) / 100),
  );

  // Usei IA para me ajudar a como gerar a circunferencia do score
  // O título vem do back (escrito la como funciona) aqui somente texto em português e as cores de cada valor
  tone = computed(() => FEEDBACK_TONES[this.review()?.feedbackTitle ?? 'NEEDS_ATTENTION']);
}
