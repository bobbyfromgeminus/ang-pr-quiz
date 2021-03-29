import { Question } from "./question";

export class Quiz {
    id: number = 0;
    title: string = '';
    description: string = '';
    questions: Question[] = new Array;
    active: boolean = true;
}