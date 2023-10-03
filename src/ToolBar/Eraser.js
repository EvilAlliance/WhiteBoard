import { Brush, Eraser, changeBrush, changeEraser } from '../Canvas/Index';
import { EraserButtonId, EraserMenuId, EraserMenuOptions, EraserMenuSize } from '../Constantes/JSPath';
import { $, $$, EventListener } from '../Utils';
import { deleteInterval, showMenu, updateSize } from './Utils';

export function initEraser() {
    const Eraser = $(EraserButtonId);
    EventListener(Eraser, ['click', 'touchend'], Erase);

    const inputRange = $(EraserMenuSize);
    EventListener(inputRange, ['input', 'mousedown'], updateSize);
    EventListener(inputRange, ['mouseup'], deleteInterval);

    const options = $$(EraserMenuOptions);
    EventListener(options[0], ['click'], Do);
    EventListener(options[1], ['click'], Undo);
    EventListener(options[2], ['click'], EraserAll);
}

function Erase(e) {
    showMenu(e, EraserMenuId, Brush.Eraser);
}

function Do() {
    changeEraser(Eraser.Do);
    $(".Modes>.active").classList.toggle("active");
    $$(".Modes>div")[0].classList.toggle("active");
}

function Undo() {
    changeEraser(Eraser.Undo);
    $(".Modes>.active").classList.toggle("active");
    $$(".Modes>div")[1].classList.toggle("active");
}

function EraserAll() {
    changeEraser(Eraser.All);
    $(".Modes>.active").classList.toggle("active");
    $$(".Modes>div")[2].classList.toggle("active");
}
