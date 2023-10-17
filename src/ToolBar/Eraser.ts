import { Brush, Eraser, changeEraser } from '../Canvas/Index';
import { EraserButtonId, EraserMenuId, EraserMenuOptionActive, EraserMenuOptions, EraserMenuSize } from '../Constantes/JSPath';
import { $, $$, EventListener } from '../Utils';
import { deleteInterval, showMenu, updateSize } from './Utils';

/**
* Init Eraser button of toolbar events
* @function
* @name initEraser
* @return void
* */
export function initEraser() {
    const Eraser = $(EraserButtonId) as HTMLElement;
    EventListener(Eraser, ['click', 'touchend'], Erase);

    const inputRange = $(EraserMenuSize) as HTMLElement;
    EventListener(inputRange, ['input', 'mousedown'], updateSize);
    EventListener(inputRange, ['mouseup'], deleteInterval);

    const options = $$(EraserMenuOptions);
    EventListener(options[0], ['click'], Do);
    EventListener(options[1], ['click'], Undo);
    EventListener(options[2], ['click'], EraserAll);
}

/**
* Show the eraser menu
* @function
* @name Erase
* @param {MouseEvent} e 
* @return void
* */
function Erase(e: Event) {
    showMenu(e, EraserMenuId, Brush.Eraser);
}

/**
* Activates the normal eraser
* @function
* @name Do
* @return void
* */
function Do() {
    changeEraser(Eraser.Do);
    ($(EraserMenuOptionActive) as HTMLElement).classList.toggle("active");
    $$(EraserMenuOptions)[0].classList.toggle("active");
}

/**
* Activates the eraser which backtraces what was done by the eraser
* @function
* @name Undo
* @return void
* */
function Undo() {
    changeEraser(Eraser.Undo);
    ($(EraserMenuOptionActive) as HTMLElement).classList.toggle("active");
    $$(EraserMenuOptions)[1].classList.toggle("active");
}

/**
* Activates the eraser which eraser all the object
* @function
* @name ErasesrAll
* @return void
* */
function EraserAll() {
    changeEraser(Eraser.All);
    ($(EraserMenuOptionActive) as HTMLElement).classList.toggle("active");
    $$(EraserMenuOptions)[2].classList.toggle("active");
}
