import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import type { Resume, Review } from '../../models/review';
import { AppSidebar } from '../../sidebar/sidebar';
import { validateResumeFile } from '../../utils/resume-file';
import { scoreClass } from '../../utils/score';

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon, RouterLink],
  selector: 'home',
  templateUrl: './home.html',
})
export class Home {
  firstName = 'Victor';
  resume = signal<Resume | null>(null);
  recentReviews = signal<Review[]>([]);
  error = signal('');
  dragging = signal(false);
  scoreClass = scoreClass;

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
