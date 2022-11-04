import {Cursor} from "./Cursor";
import {DrawingData} from "../../../types/DrawingData";
import {Point} from "../../../types/Point";

export class DrawCursor implements Cursor
{
    isMouseDown : boolean;
    drawPoints : Map<string, Point>;
    captureCallback: (drawing: DrawingData) => any;

    constructor(captureCallback: (drawing: DrawingData) => any) {
        this.isMouseDown = false;
        this.drawPoints = new Map<string, Point>();
        this.captureCallback = captureCallback;
    }

    onMouseDown(clientX: number, clientY: number):  void {
        this.isMouseDown = true;
    }

    onMouseUp(clientX: number, clientY: number):  void {
        this.isMouseDown = false;
        this.captureCallback(this.captureDrawing());
    }

    onMouseMove(clientX: number, clientY: number):  void {
        if (this.isMouseDown){
            const point : Point = {
                x: clientX,
                y: clientY
            };
            const pointHash = this.getPointHash(point);
            if (!this.drawPoints.has(pointHash)){
                this.drawPoints.set(pointHash, point);
            }
        }
    }

    captureDrawing(): DrawingData {
        let points = new Set<Point>();
        this.drawPoints.forEach((value) => {
            points.add(value)
        })
        this.clearDrawing();
        return new DrawingData(points);
    }

    clearDrawing(): void {
        this.drawPoints = new Map<string, Point>();
    }

    private getPointHash(point: Point) : string {
        return `${point.x}:${point.y}`
    }
}