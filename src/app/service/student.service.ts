import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl: string = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}`);
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  remove(student: Student): Observable<Student> {
    return this.http.delete<Student>(`${this.apiUrl}/${student.id}`);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}`, student);
  }

  update(student: Student): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${student.id}`, student);
  }
}
