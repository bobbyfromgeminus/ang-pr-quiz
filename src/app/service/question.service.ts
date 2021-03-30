import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl: string = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}`);
  }

  get(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  remove(question: Question): Observable<Question> {
    return this.http.delete<Question>(`${this.apiUrl}/${question.id}`);
  }

  create(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}`, question);
  }

  update(question: Question): Observable<Question> {
    return this.http.patch<Question>(`${this.apiUrl}/${question.id}`, question);
  }

}
