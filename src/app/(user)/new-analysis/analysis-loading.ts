import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Aparece no lugar do formulário enquanto o back faz a análise
@Component({
  imports: [ProgressSpinnerModule],
  selector: 'analysis-loading',
  template: `
    <section
      class="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-24 text-center"
    >
      <p-progressspinner strokeWidth="4" ariaLabel="Analisando currículo" [style]="{ width: '3.5rem', height: '3.5rem' }" />
      <h2 class="text-xl font-semibold text-ink">Analisando seu currículo</h2>
      <span class="max-w-md text-subtle">
      Sua review fica pronta em até 20 segundos. Não feche essa página.
      </span>
    </section>
  `,
})
export class AnalysisLoading {}
