import React, {useEffect, useRef} from 'react';
import styles  from './NotePage.module.css'
import { DrawCursor } from "./Cursors";
import { Cursor } from "./Cursors/Cursor";
import {InputObserver} from "./InputObserver";
import {NoteComponentData} from "../../types/NoteComponentData"

const NotePage = () => {
    // todo -- move to redux
    const init : NoteComponentData[] = [];
    const [noteComponents, setNoteComponents] = React.useState(init);

    const cursor: Cursor = new DrawCursor((drawing) => {
        let newNoteComponets = [...noteComponents];
        newNoteComponets.push(drawing);
        setNoteComponents(newNoteComponets);
    });

    const observer = new InputObserver();
    observer.init();
    observer.setCursor(cursor)

    const canvasRef = useRef(null)

    useEffect(() => {
        if (canvasRef.current){
            const canvas = canvasRef.current as HTMLCanvasElement
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            const context = canvas.getContext('2d') as CanvasRenderingContext2D
            noteComponents.forEach((component) => {
                component.draw(context);
            })
        }
    }, [noteComponents])


    return (<div className={styles.notePageContainer}>
        <canvas ref={canvasRef} className={styles.notePageCanvas}/>
    </div>)
}

export default  NotePage;