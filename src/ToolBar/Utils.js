import { Brush, changeBrush, changeBrushSize } from "../Canvas/Index";
import { WidthVar } from "../Constantes/CSSVar";
import { ShowMenuClass } from "../Constantes/Index";
import { $$, $ } from "../Utils";

/**
* Closes the opened menus
* @function
* @name resetMenu
* @return void*/
export function resetMenu() {
    const ShowMenu = $$('.' + ShowMenuClass)
    for (const Menu of ShowMenu) {
        Menu.classList.toggle(ShowMenuClass);
    }
}

/**
* Show a especific menu and changes canvas brush;
* @function
* @name ShowMenu
* @param {MouseEvent} e 
* @param {string} MenuId 
* @param {Brush} Brush 
* @return void*/
export function showMenu(e, MenuId, Brush) {
    if (e.target.closest(MenuId)) return;
    if (changeBrush(Brush) || $('.' + ShowMenuClass)) {
        resetMenu();
        return;
    }
    const Menu = $(MenuId);
    Menu.classList.toggle(ShowMenuClass);
}

/**
 * Univrtal interval of menus
 * @type {NodeJS.Timeout} */
let Interval;

/**
* Updates the size of the Brush, range and preview. and generates the interval
* @function
* @name updateSize
* @return void*/
export function updateSize() {
    const size = parseInt(this.value);
    const min = parseInt(this.min);
    const max = parseInt(this.max);
    updateSizeBrush(size, this.parentElement?.previousElementSibling);
    if (max < 128 && size === max) Interval = setInterval(increaseSizeInterval, 30, this);
    if (min > 1 && size === min) Interval = setInterval(decreaseSizeInterval, 30, this);
}

/**
* Updates size of preveiw and size of the actual canvas size
* @function
* @name updateSizeBrush
* @param {number} size 
* @param {HTMLElement} circlePreview 
* @return void*/
export function updateSizeBrush(size, circlePreview) {
    changeBrushSize(size);
    circlePreview.style.setProperty(WidthVar, size + 4 + 'px');
}

/**
* Increses size of the preview, range and Brush and clears interval when size is outside of certain range
* @function
* @name increaseSizeInterval
* @param {HTMLElement} El 
* @return void*/
export function increaseSizeInterval(El) {
    const size = parseInt(El.value);
    const min = parseInt(El.min);
    const max = parseInt(El.max);
    if (max > 128 || size !== max) {
        clearInterval(Interval);
        return;
    }
    El.max = max + 1 + '';
    El.value = size + 1 + '';
    El.min = min + 1 + '';
    updateSizeBrush(size, El.parentElement?.previousElementSibling);
}

/**
* Drecreses size of the preview, range and Brush and clears interval when size is outside of certain range
* @function
* @name decreaseSizeInterval
* @param {HTMLElement} El 
* @return void*/
export function decreaseSizeInterval(El) {
    const size = parseInt(El.value);
    const min = parseInt(El.min);
    const max = parseInt(El.max);
    if (min < 2 || size !== min) {
        clearInterval(Interval);
        return;
    }
    El.max = max - 1 + '';
    El.min = min - 1 + '';
    El.value = size - 1 + '';
    updateSizeBrush(size, El.parentElement?.previousElementSibling);
}

/**
* Deletes interval
* @function
* @name deleteInterval
* @return void*/
export function deleteInterval() {
    clearInterval(Interval);
}
