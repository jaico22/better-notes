export interface Cursor {
    onMouseDown (xpos: number, ypos: number): void;
    onMouseUp (xpos: number, ypos: number): void;
    onMouseMove (xpos: number, ypos: number): void;
}