import React, {ReactElement, useEffect, useRef} from 'react';
import styles from './NotePage.module.css'
import {InputObserver} from "./InputObserver";
import {NoteComponent} from "./NoteComponents/NoteComponent"
import {TextCursor} from "./Cursors/TextCursor";
import {Cursors, DrawCursor} from './Cursors';
import CursorSelectorContainer from "./CursorSelectorContainer/CursorSelectorContainer";
import {CursorSelector} from './CursorSelectors';
import {LockOnDraw} from "./NoteComponents/RenderingRules";

const NotePage = () => {
    // todo -- move to redux
    const init : Map<string, NoteComponent> = new Map<string, NoteComponent>();
    const [noteComponents, setNoteComponents] = React.useState(init);
    const [numberOfComponents, setNumberOfComponents] = React.useState(0);
    const [noteReactComponents, setNoteReactComponents] = React.useState<ReactElement[]>([]);
    const [selectedCursor, setSelectorCursor] = React.useState<Cursors>(Cursors.None);

    useEffect(() => {
        const componentRenderHandler = (noteComponent: NoteComponent) => {
            let newNoteComponets = new Map(noteComponents);
            newNoteComponets.set(noteComponent.id, noteComponent);
            setNoteComponents(newNoteComponets);
            if (noteComponent.complete){
                setNumberOfComponents(newNoteComponets.size);
                if (selectedCursor === Cursors.Text)
                    setSelectorCursor(Cursors.None);
            }
        };
        const observer = new InputObserver();
        observer.init();
        switch (selectedCursor){
            case Cursors.Draw:
                observer.setCursor(new DrawCursor(componentRenderHandler));
                break;
            case Cursors.Text:
                observer.setCursor(new TextCursor(componentRenderHandler));
                break;
            default:
                observer.clearCursor()
                break;
        }
        // eslint-disable-next-line
    },[numberOfComponents, selectedCursor])


    const canvasRef = useRef(null)

    function shouldLockOnDraw(component: any) : component is LockOnDraw {
        return (component as unknown as LockOnDraw).lock !== undefined;
    }

    useEffect(() => {
        if (canvasRef.current){
            const canvas = canvasRef.current as HTMLCanvasElement
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            const newReactComponents : ReactElement[] = [];
            const context = canvas.getContext('2d') as CanvasRenderingContext2D
            noteComponents.forEach((component) => {
                if (selectedCursor === Cursors.Draw && shouldLockOnDraw(component))
                {
                    (component as LockOnDraw).lock();
                }
                if (selectedCursor !== Cursors.Draw && shouldLockOnDraw(component))
                {
                    (component as LockOnDraw).unlock();
                }

                let newComponent = component.draw(context);
                if (newComponent){
                    newReactComponents.push(newComponent);
                    setNoteReactComponents(newReactComponents);
                }
            })
        }
    }, [noteComponents, selectedCursor])

    const changeCursor = (cursor: Cursors) => {
        setSelectorCursor(cursor);
    }

    return (<div className={styles.notePageContainer}>
        <CursorSelectorContainer>
            <CursorSelector currentCursorSelection={selectedCursor} changeCursorHandler={changeCursor} cursor={Cursors.None}/>
            <CursorSelector currentCursorSelection={selectedCursor} changeCursorHandler={changeCursor} cursor={Cursors.Draw}/>
            <CursorSelector currentCursorSelection={selectedCursor} changeCursorHandler={changeCursor} cursor={Cursors.Text}/>
        </CursorSelectorContainer>
        {noteReactComponents}
        <canvas ref={canvasRef} className={styles.notePageCanvas} style={{pointerEvents: "none"}}/>

    </div>)
}

export default  NotePage;