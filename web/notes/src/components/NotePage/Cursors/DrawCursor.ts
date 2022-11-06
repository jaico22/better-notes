import {Cursor} from "./Cursor";
import {Drawing} from "../NoteComponents"
import {Point} from "../NoteComponents/Point"

export class DrawCursor implements Cursor
{
    isMouseDown : boolean;
    drawData : Drawing;
    captureCallback: (drawing: Drawing) => any;

    constructor(captureCallback: (drawing: Drawing) => any) {
        this.isMouseDown = false;
        this.drawData = new Drawing(new Set<Point>());
        this.captureCallback = captureCallback;
    }

    onMouseDown(clientX: number, clientY: number):  void {
        this.isMouseDown = true;
    }

    onMouseUp(clientX: number, clientY: number):  void {
        this.isMouseDown = false;
        this.completeDrawing();
        this.captureCallback(this.drawData);
        this.clearDrawing();
    }

    onMouseMove(clientX: number, clientY: number):  void {
        if (this.isMouseDown){
            const point : Point = {
                x: clientX,
                y: clientY
            };
            if (!this.drawData.points.has(point)){
                this.drawData.points.add(point);
            }
            this.captureCallback(this.drawData);
        }
    }

    onKeyDown(event: KeyboardEvent) {
    }

    completeDrawing = () => {
        this.drawData.complete = true;
    }

    clearDrawing = () => {
        this.drawData = new Drawing(new Set<Point>());
    }
}