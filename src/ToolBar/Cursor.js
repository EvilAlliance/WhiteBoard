import { Brush, changeBrush } from '../Canvas/Index';
import { CursorButtonId } from '../Constantes/JSPath';
import { $, EventListener } from './../Utils';

export function initCursor() {
    const Cursor = $(CursorButtonId);
    EventListener(Cursor, ['click'], action)
}

function action() {
    changeBrush(Brush.Cursor)
}
