import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/model/question';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Answer } from 'src/app/model/answer';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  quiz: number = 0;
  numberOfAnswers: number = 0;
  answerArray: Answer[] = [];

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (Number(params.id) === 0) {
        return of(new Question());
      }

      this.quiz = params.qid;

      return this.questionService.get(Number(params.id)).pipe(
        tap( item => {
          this.numberOfAnswers = item.answers.length;
          this.answerArray = item.answers;
        })
      );

    })
  );

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(question: Question): void {
    try {
      if (question.id == 0) {
        this.questionService.create(question).subscribe(
          () => this.router.navigate(['/edit-quiz/'+this.quiz])
        );
      }
      else {
        this.questionService.update(question).subscribe(
          () => this.router.navigate(['/edit-quiz/'+this.quiz])
        );
      }
    } catch (error) {
      // Hibaüzi arra az esetre, ha baj lenne az adatbázis kapcsolattal.
    }
  }

}
