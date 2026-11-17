import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import type { Resume } from '../../models/review';
import { ResumeService } from '../../services/resume.service';
import { AppSidebar } from '../../sidebar/sidebar';
import { validateResumeFile } from '../../utils/resume-file';

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon],
  selector: 'resume-page',
  templateUrl: './resume.html',
})
export class ResumePage {
  private resumeService = inject(ResumeService);

  // Currículo principal, null se o usuário ainda não enviou (mostra o estado vazio)
  resume = signal<Resume | null>(null);
  error = signal('');
  dragging = signal(false);
  uploading = signal(false);

  constructor() {
    // Se der erro (404 = ainda não enviou), fica null e mostra o envio
    this.resumeService.getCurrent().subscribe((resume) => this.resume.set(resume));
  }

  onFileSelected(input: HTMLInputElement) {
    const file = input.files?.[0];
    input.value = '';
    if (file) this.upload(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) this.upload(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(true);
  }

  private upload(file: File) {
    if (this.uploading()) return;

    const error = validateResumeFile(file);
    this.error.set(error ?? '');
    if (error) return;

    this.uploading.set(true);
    this.resumeService
      .upload(file)
      .pipe(finalize(() => this.uploading.set(false)))
      .subscribe({
        next: (resume) => this.resume.set(resume),
        error: () => this.error.set('Não foi possível enviar o currículo.'),
      });
  }
}
