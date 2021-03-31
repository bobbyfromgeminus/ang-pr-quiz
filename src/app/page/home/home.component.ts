import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list$: Observable<Quiz[]> = this.quizService.getAll().pipe(
    tap(
      data => {
        data.forEach(
          item => {
            item.qnums = item.questions.length;
        })
      })
  );
  
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
  }

}
