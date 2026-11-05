import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Resume } from '../models/review';

// Chamadas de /resumes. Cada envio vira uma versão nova e a análise usa sempre a mais recente
@Injectable({ providedIn: 'root' })
export class ResumeService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/resumes`;


  upload(file: File): Observable<Resume> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<Resume>(this.url, form);
  }

  // 404 = o usuário ainda não enviou nenhum currículo
  getCurrent(): Observable<Resume> {
    return this.http.get<Resume>(`${this.url}/current`);
  }

  // Apaga junto todas as análises desse currículo
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
