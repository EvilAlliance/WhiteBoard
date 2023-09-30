import { changePencilBrushSize } from "../Canvas/Index";
import { WidthVar } from "../Constantes/CSSVar";
import { ShowMenuClass } from "../Constantes/Index";
import { $$ } from "../Utils";

export function resetMenu() {
    const ShowMenu = $$('.' + ShowMenuClass)
    for (const Menu of ShowMenu) {
        Menu.classList.toggle('.' + ShowMenuClass);
    }

}

let Interval;

export function updateSize() {
    const size = parseInt(this.value);
    const min = parseInt(this.min);
    const max = parseInt(this.max);
    updateSizeBrush(size, this.parentElement?.previousElementSibling);
    if (max < 128 && size === max) Interval = setInterval(increaseSizeInterval, 30, this);
    if (min > 1 && size === min) Interval = setInterval(decreaseSizeInterval, 30, this);
}

export function updateSizeBrush(size, circlePreview) {
    changePencilBrushSize(size);
    circlePreview.style.setProperty(WidthVar, size + 4 + 'px');
}

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

export function deleteInterval() {
    clearInterval(Interval);
}
