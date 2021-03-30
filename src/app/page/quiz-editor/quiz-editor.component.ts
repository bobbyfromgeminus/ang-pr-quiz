import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})
export class QuizEditorComponent implements OnInit {
  
  questionArray: Question[] = [];
  numberOfQuestions: number = 0;

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (Number(params.id) === 0) {
        return of(new Quiz());
      }

      return this.quizService.get(Number(params.id)).pipe(
        tap(
          item => {
            item.questions.forEach(element => {
              this.numberOfQuestions = item.questions.length;
              this.questionService.get(element).subscribe(
                x => {
                  this.questionArray.push(x);
                })
            })
          }
        )
      );

    })
  );

  

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(quiz: Quiz): void {
    try {
      if (quiz.id == 0) {
        this.quizService.create(quiz).subscribe(
          () => this.router.navigate(['/admin'])
        );
      }
      else {
        this.quizService.update(quiz).subscribe(
          () => this.router.navigate(['/admin'])
        );
      }
    } catch (error) {
      // Hibaüzi arra az esetre, ha baj lenne az adatbázis kapcsolattal.
    }
  }

}
