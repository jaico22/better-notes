import React, {useState} from 'react'
import {NoteComponent} from "./NoteComponent";
import {v4 as uuidv4} from 'uuid';
import {ReactElement} from "react";
import {LockOnDraw} from "./RenderingRules";

type TextAreaProps = {
    x: number;
    y: number;
    fontSize: number;
    width: number;
    height: number;
    locked: boolean;
}

const TextArea = (props: TextAreaProps) => {
    const [state, setState] = useState<string>("");
    let y = props.height < 0 ? props.y + props.height : props.y;
    let x = props.width < 0 ? props.x + props.width : props.x;
    return (
        <textarea
            value={state}
            disabled={props.locked}
            onChange={(event) => {console.log('dfgdfg'); setState(event.target.value)}}
            style={{resize: props.locked ? "none" : "both", width: Math.abs(props.width), height: Math.abs(props.height), position: "absolute", top: y, left: x, fontSize: props.fontSize, color: "white", background: "transparent"}}
        /> )
}

export class TextBox implements NoteComponent, LockOnDraw
{
    xPosition: number;
    yPosition: number;
    id: string;
    complete: boolean;
    width: number;
    height: number;
    fontSize: number;
    isLocked: boolean;

    constructor(text: string) {
        this.xPosition = 0;
        this.yPosition = 0;
        this.id = uuidv4();
        this.complete = false;
        this.fontSize = 20;

        this.width = 0;
        this.height = 0;
        this.isLocked = false;
    }

    lock() {
        this.isLocked = true;
    }

    unlock() {
        this.isLocked = false;
    }

    draw(ctx: CanvasRenderingContext2D) : ReactElement | null {
        if (this.complete){
            return (
                <TextArea
                    key={this.id}
                    x={this.xPosition}
                    y={this.yPosition}
                    fontSize={this.fontSize}
                    width={this.width}
                    height={this.height}
                    locked={this.isLocked}
                />);
        }
        ctx.beginPath();
        ctx.setLineDash([6]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white"
        ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
        return null;
    }
}