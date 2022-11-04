export interface NoteComponentData {
    xPosition: number;
    yPositon: number;
    draw (context: CanvasRenderingContext2D): any;
    id: string;
    complete: boolean;
}