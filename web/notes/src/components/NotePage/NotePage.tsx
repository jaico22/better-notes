import React, {useEffect, useRef} from 'react';
import styles  from './NotePage.module.css'
import {DrawCursor} from "./Cursors";
import {Cursor} from "./Cursors/Cursor";
import {InputObserver} from "./InputObserver";
import {NoteComponent} from "./NoteComponents/NoteComponent"

const NotePage = () => {
    // todo -- move to redux
    const init : Map<string, NoteComponent> = new Map<string, NoteComponent>();
    const [noteComponents, setNoteComponents] = React.useState(init);
    const [numberOfComponents, setNumberOfComponents] = React.useState(0);

    const componentRenderHandler = (noteComponent: NoteComponent) => {
        let newNoteComponets = new Map(noteComponents);
        newNoteComponets.set(noteComponent.id, noteComponent);
        setNoteComponents(newNoteComponets);
        if (noteComponent.complete){
            setNumberOfComponents(newNoteComponets.size);
        }
    };

    useEffect(() => {
        const cursor: Cursor = new DrawCursor(componentRenderHandler);
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