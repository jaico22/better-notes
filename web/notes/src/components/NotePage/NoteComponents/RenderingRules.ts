/**
* LockOnDraw instructs the note render to disable this component when drawing is occuring.
*  It is the implementations responsibility to handle locking of the component,
*   and the renderes responsbility to call the lock and unlock methods when drawing is
*   occuring.
*/
export interface LockOnDraw {
    lock: () => void;
    unlock: () => void;
}