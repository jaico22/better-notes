import React from "react";
import styles from "./CursorSelectors.module.css";
import CursorSelectorProps from "./CursorSelectorProps";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFont, faPen, faArrowPointer} from '@fortawesome/free-solid-svg-icons'
import {Cursors} from "../Cursors";

const CursorSelector = (props: CursorSelectorProps) => {

    const isSelected = props.cursor == props.currentCursorSelection;

    const className = isSelected
        ? styles.cursorSelectorSelected
        : styles.cursorSelector;
    
    let icon : JSX.Element | null = null;

    switch (props.cursor){
        case Cursors.Draw:
            icon = (<FontAwesomeIcon icon={faPen} size="2x"/>)
            break;
        case Cursors.Text:
            icon = (<FontAwesomeIcon icon={faFont} size="2x"/>)
            break;
        case Cursors.None:
            icon = (<FontAwesomeIcon icon={faArrowPointer} size="2x"/>)
        break;
        default:
            break;
    }
    return (
        <div className={className} onClick={() => props.changeCursorHandler(props.cursor)}>
            {icon && icon}
        </div> )
}

export default CursorSelector;