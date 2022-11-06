import {Cursor} from "../Cursors/Cursor";

class InputObserver
{
    currentCursor: Cursor | null;

    constructor() {
        this.currentCursor = null;
    }

    init(): void {
        this.createClickObserver();
    }

    setCursor(cursor: Cursor): void {
        this.currentCursor = cursor;
    }

    clearCursor(): void {
        this.currentCursor = null;
    }

    private createClickObserver(): void {
        const self = this;
        document.onmousedown = function(event: MouseEvent){
            self.currentCursor?.onMouseDown(event.clientX, event.clientY);
        }
        document.onmouseup = function(event: MouseEvent){
            self.currentCursor?.onMouseUp(event.clientX, event.clientY);
        }
        document.onmousemove = function(event: MouseEvent){
            self.currentCursor?.onMouseMove(event.clientX, event.clientY);
        }
        document.onkeydown = function(event: KeyboardEvent){
            self.currentCursor?.onKeyDown(event);
        }
    }
}

export default InputObserver;