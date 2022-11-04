import {Point} from "./Point";
import {NoteComponentData} from "./NoteComponentData";

export class DrawingData implements NoteComponentData
{
    points: Set<Point>
    xPosition: number;
    yPositon: number;

    constructor(points: Set<Point>) {
        this.points = points;
        this.xPosition = 0;
        this.yPositon = 1;
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


