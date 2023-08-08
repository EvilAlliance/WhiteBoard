import { $, $$, EventListener, isHTMLElement } from './../Utils';
import { GenerateCursor } from './../Canvas/Cursor';
import { Canvas } from './../Canvas/Index';
import { BackgroudColorVar, ColorPickerAClass, PencilButtonId, PencilMenuId, PencilMenuPeview, PencilMenuSampleColor, PencilMenuSize, ShowMenuClass, WidthVar } from '../Constantes/Index';

export function initPencilMenu() {
    const Pencil = $(PencilButtonId);
    if (Pencil)
        EventListener(Pencil, ['click', 'touchend'], showPenColor)
    const circlecolors = $$(PencilMenuSampleColor);
    for (const circle of circlecolors) {
        EventListener(circle, ['click', 'touchend'], CirleChangeColor);
    }
    const inputRange = $(PencilMenuSize);
    if (!inputRange) return;
    console.log(inputRange);
    EventListener(inputRange, ['input'], updateSizeBrush);
}

function showPenColor(e: Event) {
    const PencilMenu = $(PencilMenuId);
    if (!PencilMenu) return;
    if (!e.target) return;
    if (e.target instanceof HTMLElement)
        if (e.target.closest(PencilMenuId)) return;
    PencilMenu.classList.toggle(ShowMenuClass);
}

function CirleChangeColor(this: HTMLElement) {
    const RGBColor = this.style.getPropertyValue(BackgroudColorVar);
    changeColor(RGBColor);
    UpdateColorCircle(this);
}

function updateSizeBrush(this: HTMLInputElement) {
    const size = parseInt(this.value);
    const min = parseInt(this.min);
    const max = parseInt(this.max);
    const circlePreview = $(PencilMenuPeview);
    if (!circlePreview) return;
    if (!isHTMLElement(circlePreview)) return;
    Canvas.freeDrawingBrush.width = size;
    circlePreview.style.setProperty(WidthVar, size + 4 + 'px');
    GenerateCursor(Canvas);
    if (max < 128 && size === max) {
        this.max = max + 1 + '';
        this.min = min + 1 + '';
    }
    if (min > 1 && size === min) {
        this.max = max - 1 + '';
        this.min = min - 1 + '';
    }
}

export function changeColor(RGBColor: string) {
    Canvas.freeDrawingBrush.color = RGBColor;

    const Rectangule = $(ColorPickerAClass);
    if (!Rectangule) return;
    if (!isHTMLElement(Rectangule)) return;
    Rectangule.style.setProperty(BackgroudColorVar, RGBColor);

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
