import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

   // list
   list$: Observable<Student[]> = this.studentService.getAll();

  // filter
  filterPhrase: string = '';
  filterKey: string = 'name';

  // Sorter
  sortby: string = '';
  sorterDirection: number = 1;
  
  selectedItemToDelete: Student = new Student();
  
  constructor(private studentService: StudentService) {}

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

  setToDelete(item: Student): void {
    this.selectedItemToDelete = item;
  }

  onDelete(): void {
    this.studentService.remove(this.selectedItemToDelete).subscribe(
      () => {
        this.list$ = this.studentService.getAll();
      }
    );
  }

}
