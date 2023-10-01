import { $, $$, EventListener, doubletap } from './../Utils';
import { Brush, changePencilBrushColor } from './../Canvas/Index';
import { ColorPickerAClass } from '../Constantes/Index';
import { PencilButtonId, PencilMenuId, PencilMenuPeview, PencilMenuSampleColor, PencilMenuSize } from '../Constantes/JSPath';
import { BackgroudColorVar } from '../Constantes/CSSVar';
import { hideColorPicker } from '../ColorPicker';
import { deleteInterval, showMenu, updateSize } from './Utils';

export function initPencil() {
    const Pencil = $(PencilButtonId);
    EventListener(Pencil, ['click', 'touchend'], showPenColor);
    const circlecolors = $$(PencilMenuSampleColor);
    for (const circle of circlecolors) {
        EventListener(circle, ['click', 'touchend'], CirleChangeColor);
    }
    const inputRange = $(PencilMenuSize);
    EventListener(inputRange, ['input', 'mousedown'], updateSize);
    EventListener(inputRange, ['mouseup'], deleteInterval);

    const Rectangule = $(ColorPickerAClass);
    EventListener(Rectangule, ['dblclick'], changeSavedColor);
    EventListener(Rectangule, ['touchend'], function() { doubletap(changeSavedColor.bind(this)); });
}

function showPenColor(e) {
    showMenu(e, PencilMenuId, Brush.Pencil);
}

function CirleChangeColor() {
    const RGBColor = this.style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    UpdateColorCircle(this);
}

export function changeColor(RGBColor) {
    changePencilBrushColor(RGBColor);
    const actualColorCircle = $(PencilMenuPeview);
    actualColorCircle.style.setProperty(BackgroudColorVar, RGBColor);

    const RangeSize = $(PencilMenuSize);
    RangeSize.style.setProperty(BackgroudColorVar, RGBColor);
}

export function ColorPickerUpdateColorCircle(RGBColor) {
    const Circle = $$(PencilMenuSampleColor);

    for (let i = Circle.length - 2; i >= 0; i--) {
        const Circle1 = Circle[i];
        const Circle2 = Circle[i + 1];
        Circle2.style.setProperty(BackgroudColorVar, Circle1.style.getPropertyValue(BackgroudColorVar));
    }
    const firstCircle = Circle[0];
    firstCircle.style.setProperty(BackgroudColorVar, RGBColor);
}

export function UpdateColorCircle(Node) {
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

function changeSavedColor() {
    const RGBColor = this.style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    ColorPickerUpdateColorCircle(RGBColor);
    hideColorPicker();
}
