import { Question } from "./question";

export class Quiz {
    id: number = 0;
    title: string = '';
    description: string = '';
    questions: number[] = new Array;
    active: boolean = true;
}