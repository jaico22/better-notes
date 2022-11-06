import {ReactElement, ReactNode} from "react";

export interface NoteComponent {
    /**
    * draw is called when the component needs to be rendered. It can both render
    * on the note page canvas by using the canvas context passed in or it can return
    * a JSX or React element to be added to the render stack.
    */
    draw (context: CanvasRenderingContext2D): JSX.Element | ReactElement | null;

    // Unique Id for the component to be rendered.
    id: string;

    // Set to true when the component setup has been complete. (e.g. when a text box has been drawn)
    complete: boolean;
}