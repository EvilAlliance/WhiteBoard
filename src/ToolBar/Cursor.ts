import { Brush, changeBrush } from '../Canvas/Index';
import { CursorButtonId } from '../Constantes/JSPath';
import { $, EventListener } from './../Utils';

/**
* Init Cursor button of the toolbar events 
* @function
* @name initCursor
* @return void
* */
export function initCursor() {
    const Cursor = $(CursorButtonId) as HTMLElement;
    EventListener(Cursor, ['click'], action)
}

/**
* Changes the brush of the canvas
* @function
* @name action
* @return void
* */
function action() {
    changeBrush(Brush.Cursor)
}
