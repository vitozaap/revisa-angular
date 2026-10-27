import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule, type ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import { RESUMES, REVIEWS } from '../../mocks/reviews';
import type { Resume, Review } from '../../models/review';
import { AppSidebar } from '../../sidebar/sidebar';
import { validateResumeFile } from '../../utils/resume-file';
import { scoreClass } from '../../utils/score';

@Component({
  imports: [AppSidebar, ButtonModule, DatePipe, PIcon, RouterLink, ToggleSwitchModule],
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

  //dev, alterna entre o estado vazio e os dados de exemplo enquanto não está integrado ao back
  toggleSampleData(event: ToggleSwitchChangeEvent) {
    this.resume.set(event.checked ? RESUMES[0] : null);
    this.recentReviews.set(event.checked ? REVIEWS.slice(0, 3) : []);
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
    const error = validateResumeFile(file);
    this.error.set(error ?? '');
    if (error) return;

    //dev, apenas para demonstração, depois o arquivo vai ser enviado para o back
    const now = new Date();
    this.resume.set({ id: 1, path: '', userId: 1, fileName: file.name, createdAt: now, updatedAt: now });
  }
}
