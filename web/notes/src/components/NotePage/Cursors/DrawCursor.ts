import {Cursor} from "./Cursor";
import {DrawingData} from "../../../types/DrawingData";
import {Point} from "../../../types/Point";

export class DrawCursor implements Cursor
{
    isMouseDown : boolean;
    drawData : DrawingData;
    captureCallback: (drawing: DrawingData) => any;

    constructor(captureCallback: (drawing: DrawingData) => any) {
        this.isMouseDown = false;
        this.drawData = new DrawingData(new Set<Point>());
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

    completeDrawing = () => {
        this.drawData.complete = true;
    }

    clearDrawing = () => {
        this.drawData = new DrawingData(new Set<Point>());
    }

    private getPointHash(point: Point) : string {
        return `${point.x}:${point.y}`
    }
}