import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { RESUMES } from '../../mocks/reviews';
import type { Resume } from '../../models/review';
import { AppSidebar } from '../../sidebar/sidebar';
import { validateResumeFile } from '../../utils/resume-file';

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon],
  selector: 'resume-page',
  templateUrl: './resume.html',
})
export class ResumePage {
  // Currículo principal (dados de exemplo enquanto não está integrado ao back). Use null para ver o estado vazio.
  resume = signal<Resume | null>(RESUMES[0]);
  error = signal('');
  dragging = signal(false);

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
    const error = validateResumeFile(file);
    this.error.set(error ?? '');
    if (error) return;

    //dev, apenas para demonstração, depois o arquivo vai ser enviado para o back
    const now = new Date();
    this.resume.update((current) => ({
      id: current?.id ?? 1,
      path: current?.path ?? '',
      userId: current?.userId ?? 1,
      fileName: file.name,
      createdAt: current?.createdAt ?? now,
      updatedAt: now,
    }));
  }
}
