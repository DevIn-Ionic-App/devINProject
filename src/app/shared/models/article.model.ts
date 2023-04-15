import { Timestamp } from "rxjs";

export interface Article {
    title: string;
    authorId: string;
    date:Date;
    content: string;
    likes :number;
    saves : number;
    img: string;
    category: string;
}
