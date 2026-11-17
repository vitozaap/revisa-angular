import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import type { Resume, Review } from '../../models/review';
import { ResumeService } from '../../services/resume.service';
import { ReviewService } from '../../services/review.service';
import { AppSidebar } from '../../sidebar/sidebar';
import { validateResumeFile } from '../../utils/resume-file';
import { scoreClass } from '../../utils/score';

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon, RouterLink],
  selector: 'home',
  templateUrl: './home.html',
})
export class Home {
  private resumeService = inject(ResumeService);
  private reviewService = inject(ReviewService);

  firstName = 'Victor';
  resume = signal<Resume | null>(null);
  recentReviews = signal<Review[]>([]);
  error = signal('');
  dragging = signal(false);
  uploading = signal(false);
  scoreClass = scoreClass;

  constructor() {
    // Se der erro (404 é pq ainda não enviou), fica null e mostra o envio
    this.resumeService.getCurrent().subscribe((resume) => this.resume.set(resume));
    this.reviewService.list().subscribe((reviews) => this.recentReviews.set(reviews.slice(0, 3)));
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
      //usei pipe aqui para eu conseguir alterar o estado do front assim que o upload/requisição for concluído
      .pipe(finalize(() => this.uploading.set(false)))
      .subscribe({
        next: (resume) => this.resume.set(resume),
        error: () => this.error.set('Não foi possível enviar o currículo.'),
      });
  }
}
