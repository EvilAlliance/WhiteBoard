import { $, $$, EventListener, doubletap, isHTMLElement } from './../Utils';
import { Brush, changeBrush, changePencilBrushColor } from './../Canvas/Index';
import { ColorPickerAClass, ShowMenuClass } from '../Constantes/Index';
import { PencilButtonId, PencilMenuId, PencilMenuPeview, PencilMenuSampleColor, PencilMenuSize } from '../Constantes/JSPath';
import { BackgroudColorVar } from '../Constantes/CSSVar';
import { hideColorPicker } from '../ColorPicker';
import { deleteInterval, resetMenu, updateSize } from './Utils';

export function initPencil() {
    const Pencil = $(PencilButtonId);
    if (Pencil)
        EventListener(Pencil, ['click', 'touchend'], showPenColor);
    const circlecolors = $$(PencilMenuSampleColor);
    for (const circle of circlecolors) {
        EventListener(circle, ['click', 'touchend'], CirleChangeColor);
    }
    const inputRange = $(PencilMenuSize);
    if (!inputRange) return; updateSize
    EventListener(inputRange, ['input', 'mousedown'], updateSize);
    EventListener(inputRange, ['mouseup'], deleteInterval);

    const Rectangule = $(ColorPickerAClass);
    if (!Rectangule) return;
    // @ts-ignore
    EventListener(Rectangule, ['dblclick'], changeSavedColor);
    EventListener(Rectangule, ['touchend'], function(this: HTMLDivElement) { doubletap(this, changeSavedColor); });
}

function showPenColor(e: Event) {
    const PencilMenu = $(PencilMenuId);
    if (!PencilMenu) return;
    if (!e.target) return;
    if (e.target instanceof HTMLElement)
        if (e.target.closest(PencilMenuId)) return;
    resetMenu();
    if (changeBrush(Brush.Pencil)) return;
    PencilMenu.classList.toggle(ShowMenuClass);
}

function CirleChangeColor(this: HTMLElement) {
    const RGBColor = this.style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    UpdateColorCircle(this);
}

export function changeColor(RGBColor: string) {
    changePencilBrushColor(RGBColor);
    const actualColorCircle = $(PencilMenuPeview);
    if (!actualColorCircle) return;
    if (!isHTMLElement(actualColorCircle)) return;
    actualColorCircle.style.setProperty(BackgroudColorVar, RGBColor);

    const RangeSize = $(PencilMenuSize);
    if (!RangeSize) return;
    if (!isHTMLElement(RangeSize)) return;
    RangeSize.style.setProperty(BackgroudColorVar, RGBColor);
}

export function ColorPickerUpdateColorCircle(RGBColor: string) {
    const Circle = $$(PencilMenuSampleColor);

    for (let i = Circle.length - 2; i >= 0; i--) {
        const Circle1 = Circle[i];
        const Circle2 = Circle[i + 1];
        if (!isHTMLElement(Circle1)) return;
        if (!isHTMLElement(Circle2)) return;
        Circle2.style.setProperty(BackgroudColorVar, Circle1.style.getPropertyValue(BackgroudColorVar));
    }
    const firstCircle = Circle[0];
    if (!isHTMLElement(firstCircle)) return;
    firstCircle.style.setProperty(BackgroudColorVar, RGBColor);
}

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
                if (!isHTMLElement(Circle1)) return;
                if (!isHTMLElement(Circle2)) return;
                Circle2.style.setProperty(BackgroudColorVar, Circle1.style.getPropertyValue(BackgroudColorVar));
            }
        }
    }
    const firstCircle = Circle[0];
    if (!isHTMLElement(firstCircle)) return;
    firstCircle.style.setProperty(BackgroudColorVar, RGBColor);
}

function changeSavedColor(this: HTMLDivElement, Node?: HTMLDivElement) {
    const RGBColor = (this ?? Node).style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    ColorPickerUpdateColorCircle(RGBColor);
    hideColorPicker();
}
