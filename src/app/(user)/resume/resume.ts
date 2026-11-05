import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import type { Resume } from '../../models/review';
import { AppSidebar } from '../../sidebar/sidebar';
import { validateResumeFile } from '../../utils/resume-file';

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon],
  selector: 'resume-page',
  templateUrl: './resume.html',
})
export class ResumePage {
  // Currículo principal, null enquanto não vem do back (mostra o estado vazio)
  resume = signal<Resume | null>(null);
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

    //dev, falta enviar o arquivo para o back
  }
}
