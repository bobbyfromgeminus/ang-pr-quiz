import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { HomeComponent } from './page/home/home.component';
import { QuestionEditorComponent } from './page/question-editor/question-editor.component';
import { QuizEditorComponent } from './page/quiz-editor/quiz-editor.component';
import { QuizComponent } from './page/quiz/quiz.component';
import { StudentEditorComponent } from './page/student-editor/student-editor.component';
import { StudentComponent } from './page/student/student.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'edit-quiz/:id',
    component: QuizEditorComponent,
  },
  {
    path: 'edit-question/:id/:qid',
    component: QuestionEditorComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
  },
  {
    path: 'edit-student/:id',
    component: StudentEditorComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
