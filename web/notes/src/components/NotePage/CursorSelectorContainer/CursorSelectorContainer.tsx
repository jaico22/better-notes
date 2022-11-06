import React from 'react';
import styles from "./CursorSelectorContainer.module.css"

type CursorSelectorProps = {
    children: JSX.Element | JSX.Element[]
}
const CursorSelectorContainer = (props: CursorSelectorProps) => {
    return(
    <div className={styles.cursorSelectorContainer}>
        <div className={styles.cursorSelectorPanel}>
            {props.children}
        </div>
    </div>);
}

export default CursorSelectorContainer;