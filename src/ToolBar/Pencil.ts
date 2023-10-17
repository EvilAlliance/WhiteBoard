import { $, $$, EventListener, doubletap } from './../Utils';
import { Brush, changePencilBrushColor } from './../Canvas/Index';
import { ColorPickerAClass } from '../Constantes/Index';
import { PencilButtonId, PencilMenuId, PencilMenuPeview, PencilMenuSampleColor, PencilMenuSize } from '../Constantes/JSPath';
import { BackgroudColorVar } from '../Constantes/CSSVar';
import { hideColorPicker } from '../ColorPicker';
import { deleteInterval, showMenu, updateSize } from './Utils';

/**
* Init Pencil button events of the toolbar
* @function
* @name initPencil
* @return void
* */
export function initPencil() {
    const Pencil = $(PencilButtonId) as HTMLElement;
    EventListener(Pencil, ['click', 'touchend'], showPenColor);
    const circlecolors = $$(PencilMenuSampleColor);
    for (const circle of circlecolors) {
        EventListener(circle, ['click', 'touchend'], CirleChangeColor);
    }
    const inputRange = $(PencilMenuSize) as HTMLElement;
    EventListener(inputRange, ['input', 'mousedown'], updateSize);
    EventListener(inputRange, ['mouseup'], deleteInterval);

    const Rectangule = $(ColorPickerAClass) as HTMLElement;
    EventListener(Rectangule, ['dblclick'], changeSavedColor);
    EventListener(Rectangule, ['touchend'], function(this: HTMLDivElement) { doubletap(changeSavedColor.bind(this)); });
}

/**
* Shows menu of the Brush
* @function
* @name showPenColor
* @param {MouseEvent} e 
* @return void
* */
function showPenColor(e: Event) {
    showMenu(e, PencilMenuId, Brush.Pencil);
}

/**
* Select a circle to select a color
* @function
* @kind Node clicked
* @name CirleChangeColor
* @return void
* */
function CirleChangeColor(this: HTMLDivElement) {
    const RGBColor = this.style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    UpdateColorCircle(this);
}

/**
* Changes color of the Brush
* @function
* @name changeColor
* @param {string} RGBColor 
* @return void
* */
export function changeColor(RGBColor: string) {
    changePencilBrushColor(RGBColor);
    const actualColorCircle = $(PencilMenuPeview) as HTMLElement;
    actualColorCircle.style.setProperty(BackgroudColorVar, RGBColor);

    const RangeSize = $(PencilMenuSize) as HTMLElement;
    RangeSize.style.setProperty(BackgroudColorVar, RGBColor);
}

/**
* Reorders the circle of the menu when color is selected with ColorPicker
* @function
* @name ColorPickerUpdateColorCircle
* @param {string} RGBColor 
* @return void
* */
export function ColorPickerUpdateColorCircle(RGBColor: string) {
    const Circle = $$(PencilMenuSampleColor);

    for (let i = Circle.length - 2; i >= 0; i--) {
        const Circle1 = Circle[i];
        const Circle2 = Circle[i + 1];
        Circle2.style.setProperty(BackgroudColorVar, Circle1.style.getPropertyValue(BackgroudColorVar));
    }
    const firstCircle = Circle[0];
    firstCircle.style.setProperty(BackgroudColorVar, RGBColor);
}

/**
* Reorders the circle of the menu when color is selected with the circle
* @function
* @name UpdateColorCircle
* @param {HTMLElement} Node Node clicked
* @return void
* */
export function UpdateColorCircle(Node: HTMLElement) {
    let flag = true;
    const RGBColor = Node.style.getPropertyValue(BackgroudColorVar);
    const Circle = $$(PencilMenuSampleColor);

    const length = Circle.length;
    if (Circle[0] === Node) return;

    for (let i = length - 1; i >= 0; i--) {
        if (flag && Node === Circle[i]) {
            flag = false;
        } else {
            if (!flag) {
                const Circle1 = Circle[i];
                const Circle2 = Circle[i + 1];
                Circle2.style.setProperty(BackgroudColorVar, Circle1.style.getPropertyValue(BackgroudColorVar));
            }
        }
    }
    const firstCircle = Circle[0];
    firstCircle.style.setProperty(BackgroudColorVar, RGBColor);
}

/**
* Event when rectangule is double clicked
* @function
* @name changeSavedColor
* @kind The rectangule
* @return void
* */
function changeSavedColor(this: HTMLElement) {
    const RGBColor = this.style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    ColorPickerUpdateColorCircle(RGBColor);
    hideColorPicker();
}
