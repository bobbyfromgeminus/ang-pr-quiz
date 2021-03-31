import { Answer } from "./answer";

export class Question {
    id: number = 0;
    question: string = '';
    answers: Answer[] = new Array;
    anums?: number = 0;
    points: number = 0;
    active: boolean = true;
}