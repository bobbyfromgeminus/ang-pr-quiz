import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Quiz } from 'src/app/model/quiz';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // list
  list$: Observable<Quiz[]> = this.quizService.getAll().pipe(
    tap(
      data => {
        data.forEach(item => {
          let qnum = item.questions.length;
          item.qnums = qnum;
        })
      }
    )
  );

  // filter
  filterPhrase: string = '';
  filterKey: string = 'title';

  // Sorter
  sortby: string = '';
  sorterDirection: number = 1;
  
  selectedItemToDelete: Quiz = new Quiz();
  
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService
    ) {}

  ngOnInit(): void {
  }

  changeOrder(param: string): void {
    if (this.sortby === '' || this.sortby != param) {
      this.sorterDirection = 1;
    }
    if (this.sortby === param) {
      if (this.sorterDirection === 1) this.sorterDirection = 2;
      else this.sorterDirection = 1;
    }
    this.sortby = param;
    let allArrow = document.querySelectorAll('.arrow');
    allArrow.forEach(element => {
      element.classList.remove('arrow__active');
    });
    if (this.sorterDirection == 1) document.querySelector('#arrow_up_' + param)?.classList.add('arrow__active');
    else document.querySelector('#arrow_down_' + param)?.classList.add('arrow__active');
  }

  setToDelete(item: Quiz): void {
    this.selectedItemToDelete = item;
  }

  onDelete(): void {
    this.selectedItemToDelete.questions.forEach(
      data => {
        this.questionService.get(data).subscribe(
          item => {
            this.questionService.remove(item).subscribe(
              () => {
                this.quizService.remove(this.selectedItemToDelete).subscribe(
                  () => {
                    this.list$ = this.quizService.getAll();
                  }
                );
              }
            );
        });    
    });
  }

}
