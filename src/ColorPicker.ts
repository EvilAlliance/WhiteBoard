import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';
import { isHTMLElement } from './Utils';
import { $ } from './Utils';
import { ColorPickerUpdateColorCircle, changeColor } from './ToolBar/Pencil';
import { BackgroudColorVar, ColorPickerAClass, ColorPickerBId, ColorPickerPosition, ColorPickerTheme, PencilMenuId } from './Constantes/Index';
import { RGB } from './Types/Index';

export let ColorPicker: Pickr;

export function createColorPicker() {
    const SustituteEl = $(ColorPickerBId);
    if (!SustituteEl) return;
    if (!isHTMLElement(SustituteEl)) return;
    const defaultColor = SustituteEl.style.getPropertyValue(BackgroudColorVar);
    ColorPicker = Pickr.create({
        el: ColorPickerBId,
        theme: ColorPickerTheme,
        default: defaultColor,
        container: PencilMenuId,
        position: ColorPickerPosition,
        components: {
            // Main components
            preview: false,
            opacity: true,
            hue: true,
            // Input / output Options
            interaction: {
                input: true,
                save: true,
            }
        }
    });
    const entryButton = $(ColorPickerAClass);
    if (!entryButton) return;
    if (!isHTMLElement(entryButton)) return;
    entryButton.style.setProperty(BackgroudColorVar, defaultColor);

    ColorPicker.on('save', ColorPickerChangeColor);

    /*ColorPicker.on('init', instance => {
        console.log('Event: "init"', instance);
    }).on('hide', instance => {
        console.log('Event: "hide"', instance);
    }).on('show', (color, instance) => {
        console.log('Event: "show"', color, instance);
    }).on('save', (color, instance) => {
        console.log('Event: "save"', color, instance);
    }).on('clear', instance => {
        console.log('Event: "clear"', instance);
    }).on('change', (color, source, instance) => {
        console.log('Event: "change"', color, source, instance);
    }).on('changestop', (source, instance) => {
        console.log('Event: "changestop"', source, instance);
    }).on('cancel', instance => {
        console.log('Event: "cancel"', instance);
    }).on('swatchselect', (color, instance) => {
        console.log('Event: "swatchselect"', color, instance);
    });*/
}

function ColorPickerChangeColor() {
    const RGBColor = getRBG();
    changeColor(RGBColor);
    ColorPickerUpdateColorCircle(RGBColor);
}

function getRBG(): RGB {
    const Color = ColorPicker.getColor().toRGBA();
    return `rgb(${Color[0]}, ${Color[1]}, ${Color[2]}, ${Color[3]})`;
}
