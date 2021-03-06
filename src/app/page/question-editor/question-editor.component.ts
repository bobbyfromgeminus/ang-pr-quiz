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
  lastID: number = 0;

  // üres tripla válasz tömb
  defaultAnswer: Answer[] = [
    { "id": 1, "content": "", "correct": false },
    { "id": 2, "content": "", "correct": false },
    { "id": 3, "content": "", "correct": false }
  ];

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap( params => {
      // eltárolom annak a kvíznek az id-jét, amelyhez kapcsolom majd az új kérdést - paraméterként átadtam
      this.quiz = params.qid;

      // ha a id===0, akkor új kérdést rögzítek
      if (Number(params.id) === 0) {
        let newQuestion = new Question;
        newQuestion.answers = this.defaultAnswer;
        return of(newQuestion);
      }

      // ellenkező esetben lekérem az adott id-jű kérdést az űrlap számára
      return this.questionService.get(Number(params.id));

    })
  );

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  onFormSubmit(question: Question): void {
    try {
      // LÉTREHOZÁS
      if (question.id == 0) {
        //question.answers = this.defaultAnswer;
        // Új kérdés létrehozása
        this.questionService.create(question).subscribe(
          createdQuestion => {
            // Szükségem van arra a kvízre, amelyhez kapcsolni akarom a létrehozott kérdést...
            this.quizService.get(this.quiz).subscribe(
              data => {
                data.questions.push(createdQuestion.id);
                // ... végül updatelem a kvízt a módosult adattal.
                this.quizService.update(data).subscribe(
                  () => {
                    this.router.navigate(['/edit-quiz/'+this.quiz]);
                });
            })
        })
      }
      else {
        // MÓDOSÍTÁS
        this.questionService.update(question).subscribe(
          () => this.router.navigate(['/edit-quiz/'+this.quiz])
        );
      }
    } catch (error) {
      // HIBA
    }
  }

}
