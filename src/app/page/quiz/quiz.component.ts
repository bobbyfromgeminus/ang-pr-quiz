import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { Student } from 'src/app/model/student';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  selectedStudent: Student = new Student();
  students$: Observable<Student[]> = this.studentService.getAll();

  questionIDArray: number[] = []
  questionArray: Question[] = [];
  selectedItemToDelete: Question = new Question();
  quizID: number = 0;
  
  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap( params => {
      
      if (Number(params.id) === 0) {
        return of(new Quiz());
      }
      return this.quizService.get(Number(params.id)).pipe(
        tap(
          item => {
            this.quizID = params.id;
            this.questionIDArray = item.questions;
            item.questions.forEach(element => {
              this.questionService.get(element).subscribe(
                x => {
                  this.questionArray.push(x);
                })
                console.table(this.questionArray);
            })
          }
        )
      );

    })
  );


  constructor(
    private studentService: StudentService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  selectStudent(student: Student): void {
    this.selectedStudent = student;
    let studies = document.querySelector('.studies');
    studies?.classList.add('hide');
  }

}
