import { Question } from "./question";

export class Quiz {
    id: number = 0;
    title: string = '';
    description: string = '';
    questions: Question = new Question();
    active: boolean = true;
}