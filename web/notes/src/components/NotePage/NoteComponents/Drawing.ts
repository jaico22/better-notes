import {Point} from "./Point";
import {v4 as uuidv4} from 'uuid';
import {NoteComponent} from "./NoteComponent";

export class Drawing implements NoteComponent
{
    points: Set<Point>
    xPosition: number;
    yPosition: number;
    id: string;
    complete: boolean;

    constructor(points: Set<Point>) {
        this.points = points;
        this.xPosition = 0;
        this.yPosition = 1;
        this.id = uuidv4();
        this.complete = false;
    }

    draw(ctx: CanvasRenderingContext2D): any {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        let start = true;
        this.points.forEach((value) => {
            if (start){
                ctx.moveTo(value.x, value.y);
                start = false;
            }else{
                ctx.lineTo(value.x, value.y);
            }
        })
        ctx.stroke();
        ctx.closePath();
    }
}


