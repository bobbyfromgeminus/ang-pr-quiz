import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.scss']
})
export class StudentEditorComponent implements OnInit {

  selectedItemToDelete: Student = new Student();
  paramID: number = 0;

  student$: Observable<Student> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (Number(params.id) === 0) {
        return of(new Student());
      }
      this.paramID = params.id;
      return this.studentService.get(Number(params.id));

    })
  );

  constructor(
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(student: Student): void {
    try {
      if (student.id == 0) {
        this.studentService.create(student).subscribe(
          () => this.router.navigate(['/student'])
        );
      }
      else {
        this.studentService.update(student).subscribe(
          () => this.router.navigate(['/student'])
        );
      }
    } catch (error) {
      // Hibaüzi arra az esetre, ha baj lenne az adatbázis kapcsolattal.
    }
  }

  setToDelete(item: Student): void {
    this.selectedItemToDelete = item;
  }

  onDelete(): void {
    this.studentService.remove(this.selectedItemToDelete).subscribe(
      () => {
        this.student$ = this.studentService.get(this.paramID);
    });
    
  }
}
