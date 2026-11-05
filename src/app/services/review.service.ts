import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Review } from '../models/review';

export interface ReviewRequest {
  jobTitle: string;
  jobDescription: string;
}

// chamadas de /reviews
@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/reviews`;

  create(job?: ReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.url, job ?? {});
  }

  // mais recente p mais antiga
  list(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url);
  }

  get(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
