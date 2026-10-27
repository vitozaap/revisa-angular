import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RESUMES, REVIEWS } from '../../mocks/reviews';
import { AppSidebar } from '../../sidebar/sidebar';
import {
  JOB_DESCRIPTION_MAX_LENGTH,
  newAnalysisSchema,
  type NewAnalysisFormData,
} from './new-analysis-form';

@Component({
  imports: [
    AppSidebar,
    ButtonModule,
    DatePipe,
    FloatLabelModule,
    FormField,
    InputTextModule,
    TextareaModule,
  ],
  selector: 'new-analysis',
  templateUrl: './new-analysis.html',
})
export class NewAnalysis {
  private router = inject(Router);

  // Currículo mais recente do usuário (dados de exemplo enquanto não está integrado ao back)
  resume = RESUMES[0];
  maxLength = JOB_DESCRIPTION_MAX_LENGTH;

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

    const analysis = this.newAnalysisModel();
    console.log({ resumeId: this.resume.id, ...analysis });

    //dev, apenas para demonstração, depois vai abrir o relatório criado pelo back
    this.router.navigate(['/history', REVIEWS[0].id]);
  }
}
