import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { RESUMES, REVIEWS } from '../../../mocks/reviews';
import { AppSidebar } from '../../../sidebar/sidebar';


// Constantes que definem tamanho da circunferencia do score total
const SCORE_RADIUS = 52;
const SCORE_CIRCUMFERENCE = 2 * Math.PI * SCORE_RADIUS;

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon, RouterLink],
  selector: 'report',
  templateUrl: './report.html',
})
export class Report {
  // Vem do parâmetro :id da rota (withComponentInputBinding)
  id = input.required<string>();

  // Mockado por enquanto, usa .find para buscar o id e bater com o id que chega dos parâmetros da rota
  review = computed(() => REVIEWS.find((review) => review.id === Number(this.id())));
  //Mesma coisa rsrs
  resume = computed(() => RESUMES.find((resume) => resume.id === this.review()?.resumeId));

  scoreRadius = SCORE_RADIUS;
  scoreCircumference = SCORE_CIRCUMFERENCE;
  scoreOffset = computed(
    () => SCORE_CIRCUMFERENCE * (1 - (this.review()?.finalScore ?? 0) / 100),
  );

  // Usei IA para me ajudar a como gerar a circunferencia do score
  tone = computed(() => {
    const score = this.review()?.finalScore ?? 0;
    if (score >= 75) return { label: 'Muito bom', stroke: 'stroke-success', badge: 'bg-success-bg text-success-ink' };
    if (score >= 60) return { label: 'Bom, com ajustes', stroke: 'stroke-gold', badge: 'bg-cream text-gold-dark' };
    return { label: 'Precisa de atenção', stroke: 'stroke-danger', badge: 'bg-danger-bg text-danger-ink' };
  });
}
