import { Brush, changeBrush } from '../Canvas/Index';
import { ShowMenuClass } from '../Constantes/Index';
import { EraserButtonId, EraserMenuId, EraserMenuSize } from '../Constantes/JSPath';
import { $, EventListener } from '../Utils';
import { deleteInterval, resetMenu, updateSize } from './Utils';

export function initEraser() {
    const Eraser = $(EraserButtonId);
    if (Eraser)
        EventListener(Eraser, ['click', 'touchend'], Erase);

    const inputRange = $(EraserMenuSize);
    if (!inputRange) return;
    EventListener(inputRange, ['input', 'mousedown'], updateSize);
    EventListener(inputRange, ['mouseup'], deleteInterval);
}

function Erase(e: Event) {
    const EraserMenu = $(EraserMenuId);
    if (!EraserMenu) return;
    if (!e.target) return;
    if (e.target instanceof HTMLElement)
        if (e.target.closest(EraserMenuId)) return;
    resetMenu();
    if (changeBrush(Brush.Eraser)) return;
    EraserMenu.classList.toggle(ShowMenuClass);
}
