import { Brush, changeBrush, changeBrushSize } from "../Canvas/Index";
import { WidthVar } from "../Constantes/CSSVar";
import { ShowMenuClass } from "../Constantes/Index";
import { $$, $ } from "../Utils";

/**
* Closes the opened menus
* @function
* @name resetMenu
* @return void
* */
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
* @param {Brush} B
* @return void
* */
export function showMenu(e: Event, MenuId: string, B: Brush) {
    if ((e.target as HTMLElement).closest(MenuId)) return;
    if (changeBrush(B) || $('.' + ShowMenuClass)) {
        resetMenu();
        return;
    }
    const Menu = $(MenuId) as HTMLElement;
    Menu.classList.toggle(ShowMenuClass);
}

/**
 * Univrtal interval of menus
 * @type {NodeJS.Timeout}
 * */
let Interval: NodeJS.Timeout;

/**
* Updates the size of the Brush, range and preview. and generates the interval
* @function
* @name updateSize
* @return void
* */
export function updateSize(this: HTMLInputElement) {
    const size = parseInt(this.value);
    const min = parseInt(this.min);
    const max = parseInt(this.max);
    updateSizeBrush(size, (this.parentElement as HTMLElement).previousElementSibling as HTMLElement);
    if (max < 128 && size === max) Interval = setInterval(increaseSizeInterval, 30, this);
    if (min > 1 && size === min) Interval = setInterval(decreaseSizeInterval, 30, this);
}

/**
* Updates size of preveiw and size of the actual canvas size
* @function
* @name updateSizeBrush
* @param {number} size 
* @param {HTMLElement} circlePreview 
* @return void
* */
export function updateSizeBrush(size: number, circlePreview: HTMLElement) {
    changeBrushSize(size);
    circlePreview.style.setProperty(WidthVar, size + 4 + 'px');
}

/**
* Drecreses size of the preview, range and Brush and clears interval when size is outside of certain range
* @function
* @name decreaseSizeInterval
* @param {HTMLElement} El 
* @return void
* */
export function increaseSizeInterval(El: HTMLInputElement) {
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
    updateSizeBrush(size, (El.parentElement as HTMLElement).previousElementSibling as HTMLElement);
}

/**
* Drecreses size of the preview, range and Brush and clears interval when size is outside of certain range
* @function
* @name decreaseSizeInterval
* @param {HTMLElement} El 
* @return void
* */
export function decreaseSizeInterval(El: HTMLInputElement) {
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
    updateSizeBrush(size, (El.parentElement as HTMLElement).previousElementSibling as HTMLElement);
}

/**
* Deletes interval
* @function
* @name deleteInterval
* @return void
* */
export function deleteInterval() {
    clearInterval(Interval);
}
