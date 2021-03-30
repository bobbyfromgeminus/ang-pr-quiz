import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/model/question';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Answer } from 'src/app/model/answer';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  quiz: number = 0;
  nextFreeId: number = 0;

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap( params => {
      this.quiz = params.qid;

      if (Number(params.id) === 0) {
        return of(new Question());
      }

      return this.questionService.get(Number(params.id));

    })
  );

  defaultAnswer: Answer[] = [
    {
      "id": 1,
      "content": "",
      "correct": false
    },
    {
      "id": 2,
      "content": "",
      "correct": false
    },
    {
      "id": 3,
      "content": "",
      "correct": false
    }
  ];

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Szükségem van arra, hogy mi lesz a következő kiadható question id
    this.questionService.getAll().subscribe(
      data => {
        this.nextFreeId = data.slice(-1)[0].id + 1;
        console.log(this.nextFreeId);
      })
  }

  onFormSubmit(question: Question): void {
    try {
      if (question.id == 0) {
        question.answers = this.defaultAnswer;
        this.questionService.create(question).subscribe(
          () => {
            this.quizService.get(this.quiz).subscribe(
              data => {
                data.questions.push(this.nextFreeId);
                console.log(data.questions);
                this.quizService.update(data).subscribe(
                  () => this.router.navigate(['/edit-quiz/'+this.quiz])
                );
              })
            })
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
