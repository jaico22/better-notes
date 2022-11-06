import { Cursors } from "../Cursors";

export type CursorSelectorProps = {
    changeCursorHandler: (cursor: Cursors) => void;
    cursor: Cursors;
    currentCursorSelection: Cursors;
}

export default CursorSelectorProps;