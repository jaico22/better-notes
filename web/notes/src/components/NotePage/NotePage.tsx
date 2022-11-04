import React, {useEffect, useMemo, useRef} from 'react';
import styles  from './NotePage.module.css'
import { DrawCursor } from "./Cursors";
import { Cursor } from "./Cursors/Cursor";
import {InputObserver} from "./InputObserver";
import {NoteComponentData} from "../../types/NoteComponentData"
import {DrawingData} from "../../types/DrawingData";
import { Point } from '../../types/Point';

const NotePage = () => {
    // todo -- move to redux
    const init : Map<string, NoteComponentData> = new Map<string, NoteComponentData>();
    const [noteComponents, setNoteComponents] = React.useState(init);
    const [numberOfComponents, setNumberOfComponents] = React.useState(0);

    const callback = (drawing: DrawingData) => {
        let newNoteComponets = new Map(noteComponents);
        newNoteComponets.set(drawing.id, drawing);
        setNoteComponents(newNoteComponets);
        if (drawing.complete){
            setNumberOfComponents(newNoteComponets.size);
        }
    };

    useEffect(() => {
        const cursor: Cursor = new DrawCursor(callback);
        const observer = new InputObserver();
        observer.init();
        observer.setCursor(cursor)
    },[numberOfComponents])


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