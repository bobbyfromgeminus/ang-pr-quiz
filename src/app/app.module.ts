import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './page/admin/admin.component';
import { QuizEditorComponent } from './page/quiz-editor/quiz-editor.component';
import { QuestionEditorComponent } from './page/question-editor/question-editor.component';
import { QuizComponent } from './page/quiz/quiz.component';
import { HomeComponent } from './page/home/home.component';
import { NavigationComponent } from './common/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    QuizEditorComponent,
    QuestionEditorComponent,
    QuizComponent,
    HomeComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
