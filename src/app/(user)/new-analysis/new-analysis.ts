import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import type { Resume } from '../../models/review';
import { ResumeService } from '../../services/resume.service';
import { ReviewService } from '../../services/review.service';
import { AppSidebar } from '../../sidebar/sidebar';
import { AnalysisLoading } from './analysis-loading';
import {
  JOB_DESCRIPTION_MAX_LENGTH,
  newAnalysisSchema,
  type NewAnalysisFormData,
} from './new-analysis-form';

@Component({
  imports: [
    AnalysisLoading,
    AppSidebar,
    ButtonModule,
    DatePipe,
    FloatLabelModule,
    FormField,
    InputTextModule,
    MessageModule,
    RouterLink,
    TextareaModule,
  ],
  selector: 'new-analysis',
  templateUrl: './new-analysis.html',
})
export class NewAnalysis {
  private router = inject(Router);
  private resumeService = inject(ResumeService);
  private reviewService = inject(ReviewService);

  // Currículo mais recente do usuário, é ele que o back analisa
  resume = signal<Resume | null>(null);
  maxLength = JOB_DESCRIPTION_MAX_LENGTH;
  loading = signal(false);
  error = signal('');

  constructor() {
    this.resumeService.getCurrent().subscribe((resume) => this.resume.set(resume));
  }

  newAnalysisModel = signal<NewAnalysisFormData>({
    jobTitle: '',
    jobDescription: '',
  });

  newAnalysisForm = form(this.newAnalysisModel, (path) => {
    validateStandardSchema(path, newAnalysisSchema);
  });

  criteria = [
    'Clareza das experiências e resultados',
    'Aderência aos requisitos da vaga',
    'Ortografia e gramática',
    'Formatação e legibilidade',
  ];

  onSubmit(event: Event) {
    event?.preventDefault();
    if (this.newAnalysisForm().invalid()) return;

    this.loading.set(true);
    this.error.set('');

    // Só conta como vaga se tiver descrição, senão vai sem vaga ({} no back)
    const { jobTitle, jobDescription } = this.newAnalysisModel();
    
    const job = jobDescription.trim() ? { jobTitle, jobDescription } : undefined;

    this.reviewService.create(job).subscribe({
      next: (review) => this.router.navigate(['/history', review.id]),
      error: () => {
        this.loading.set(false);
        this.error.set('Não foi possível fazer a análise. Tente novamente.');
      },
    });
  }
}
