import { Timestamp } from "rxjs";

export interface Article {
    title: string;
    authorId: string;
    date:Date;
    content: string;
    likes :number;
    shares : number;

    
}
