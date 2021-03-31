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
  
  questionIDArray: number[] = []
  questionArray: Question[] = [];
  selectedItemToDelete: Question = new Question();
  quizID: number = 0;

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap( params => {
      console.log(params.id);
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
                  let anum: number = 0;
                  x.answers.forEach(
                    element => {
                      if (element.content!='') anum++;
                  });
                  x.anums = anum;
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

  // A kérdés törlésénél a törlés mellett a quiz questions tömbjéból is ki kell venni az érintett id-t!
  setToDelete(item: Question): void {
    this.selectedItemToDelete = item;
  }

  onDelete(): void {
    let delQn: Question = this.selectedItemToDelete;
    let filteredIDArray: number[] = [];
    this.questionService.remove(this.selectedItemToDelete).subscribe(
      () => {
        // törlendő ID törlése a kérdés tömbből
        filteredIDArray = this.questionIDArray.filter(
          value => {
            return value != delQn.id;
        });
        this.quizService.get(this.quizID).subscribe(
          data => {
            // kvíz kérdés tömbjének cseréje és update
            data.questions = filteredIDArray;
            this.quizService.update(data).subscribe(
              () => {
                // tábla sorának törlése
                document.querySelector('#tr_'+delQn.id)?.remove();
            });
        });
    });
    
  }

}
