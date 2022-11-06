import { Cursor } from "./Cursor";
import {TextBox} from "../NoteComponents"

export class TextCursor implements Cursor {
    textBox: TextBox;
    isInitializing: boolean;
    captureCallback: (textBox: TextBox) => any;

    constructor(captureCallback: (textBox: TextBox) => any) {
        this.textBox = new TextBox("");
        this.isInitializing = false;
        this.captureCallback = captureCallback;

    }

    onKeyDown(event: KeyboardEvent): void {
    }

    onMouseDown(xpos: number, ypos: number): void {
        if (!this.isInitializing){
            this.isInitializing = true;
            this.textBox.xPosition = xpos;
            this.textBox.yPosition = ypos;
        }
    }

    onMouseUp(xpos: number, ypos: number): void {
        if (this.isInitializing){
            this.isInitializing = false;
            this.textBox.width = xpos - this.textBox.xPosition;
            this.textBox.height = ypos - this.textBox.yPosition;
            this.textBox.complete = true;
            this.captureCallback(this.textBox);
        }
    }

    onMouseMove(xpos: number, ypos: number): void {
        if (this.isInitializing){
            this.textBox.height = ypos - this.textBox.yPosition;
            this.textBox.width = xpos - this.textBox.xPosition;
            this.captureCallback(this.textBox);
        }
    }
}