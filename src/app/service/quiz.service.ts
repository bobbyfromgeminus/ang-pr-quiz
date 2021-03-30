import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  apiUrl: string = 'http://localhost:3000/quizzes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}`);
  }

  get(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  remove(quiz: Quiz): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.apiUrl}/${quiz.id}`);
  }

  create(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}`, quiz);
  }

  update(quiz: Quiz): Observable<Quiz> {
    return this.http.patch<Quiz>(`${this.apiUrl}/${quiz.id}`, quiz);
  }

}
