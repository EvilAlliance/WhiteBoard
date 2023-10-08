import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';
import { $ } from './Utils';
import { ColorPickerUpdateColorCircle, changeColor } from './ToolBar/Pencil';
import { ColorPickerAClass, ColorPickerBId, ColorPickerPosition, ColorPickerTheme } from './Constantes/Index';
import { BackgroudColorVar } from './Constantes/CSSVar';
import { PencilMenuId } from './Constantes/JSPath';

/**
 * Controls colorpciker
 * @readonly
 * @constant
 * @type {Pickr}
 * @protected*/
let ColorPicker;

/**
* Generates the colorpicker and his events
* @function
* @name createColorPicker
* @return void*/
export function createColorPicker() {
    const SustituteEl = $(ColorPickerBId);
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
    entryButton.style.setProperty(BackgroudColorVar, defaultColor);

    ColorPicker
        .on('save', ColorPickerSavedColor)
        .on('change', ColorPickerChangeColor);

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

/**
* Changes color when saved in the ColorPicker menu
* @function
* @name ColorPickerSavedColor
* @return void*/
function ColorPickerSavedColor() {
    const RGBColor = getRBG();
    changeColor(RGBColor);
    ColorPickerUpdateColorCircle(RGBColor);
}

/**
* Updates the rectungule BackgroudColorVar when the ColorPicker changes
* @function
* @name ColorPickerChangeColor
* @return void*/
function ColorPickerChangeColor() {
    const RGBColor = getRBG();
    const Rectangule = $(ColorPickerAClass);
    Rectangule.style.setProperty(BackgroudColorVar, RGBColor);
}

/**
* Gets the color of the ColorPicker and formating it in and array of three spaces and output the rgb string
* @function
* @name getRBG
* @return string*/
function getRBG() {
    const Color = ColorPicker.getColor().toRGBA();
    return `rgb(${Color[0]}, ${Color[1]}, ${Color[2]}, ${Color[3]})`;
}

/**
* Hides the ColorPicker
* @function
* @name hideColorPicker
* @return void*/
export function hideColorPicker() {
    ColorPicker.hide();
}
