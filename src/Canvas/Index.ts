import type { fabric as Tfabric } from './../@types-fabric/index.d.ts';
import { fabric } from 'fabric';
import './../../node_modules/fabric/src/mixins/eraser_brush.mixin.js';
import { GenerateCursor } from './Cursor';
import { CanvasWhiteboardIdWHash } from '../Constantes/Index';

/**
 * @typedef {Object} Brush
 * @property {number} Cursor
 * @property {number} Eraser
 * @property {number} Pencil
 * */

/**
 * Options for the canvas Brush
 * @constant
 * @type {Brush}
 * @readonly
 * @protected
 * */
export const enum Brush {
    Cursor,
    Eraser,
    Pencil,
};

/**
 * @typedef {Object} Eraser
 * @property {number} Do
 * @property {number} Undo
 * @property {number} All
 * */

/**
 * Options for the EraserBrush
 * @constant
 * @type {Eraser}
 * @readonly
 * @protected
 * */
export const enum Eraser {
    Do,
    Undo,
    All,
};

/**
 * Controls upper canvas and the one below (WEB)
 * @readonly
 * @type {fabric.Canvas}
 * @constant
 * @protected
 * */
let Canvas: Tfabric.Canvas;
/**
 * Is the Eraser of the canvas
 * @readonly
 * @type {fabric.EraserBrush}
 * @constant
 * @protected
 * */
let EraserBrush: fabric.EraserBrush;
/**
 * Is the Pencil of the Canvas
 * @readonly
 * @type {fabric.PencilBrush}
 * @constant
 * @protected
 * */
let PencilBrush: fabric.PencilBrush;
/**
 * Indicates if the eraser should erase the whole object
 * @readonly
 * @type {boolean}
 * @constant
 * @protected
 * */
let EraserAll: boolean;

/**
* Updates width and heigth of both canvas
* @function
* @name updateCanvas
* @return void
* */
export function updateCanvas() {
    const { clientHeight, clientWidth } = document.body;

    Canvas.setWidth(clientWidth);
    Canvas.setHeight(clientHeight);
    Canvas.renderAll();
}

/**
* Init the canvas and event on it and constants related
* @function
* @name initCanvas
* @return void
* */
export function initCanvas() {
    const { clientHeight, clientWidth } = document.body;


    Canvas = new fabric.Canvas(CanvasWhiteboardIdWHash, {
        isDrawingMode: true,
        perPixelTargetFind: true,
        selectionFullyContained: true,
        width: clientWidth,
        height: clientHeight
    });

    EraserBrush = new fabric.EraserBrush(Canvas);
    EraserBrush.width = 20;

    PencilBrush = new fabric.PencilBrush(Canvas);
    PencilBrush.width = 20;
    PencilBrush.color = 'rgba(0,0,0)';

    Canvas.freeDrawingBrush = PencilBrush;

    Canvas.on("erasing:end", EraseAll);
    Canvas.renderAll();

    GenerateCursor(Canvas);
}


/**
* Updates the size of the actual canvas brush
* @function
* @name changeBrushSize
* @param {number} size
* @return void
* */
export function changeBrushSize(size: number) {
    Canvas.freeDrawingBrush.width = size;
    GenerateCursor(Canvas);
}

/**
* Uptades the PencilBrush to the new color
* @function
* @name changePencilBrushColor
* @param {string} RGBColor 
* @return void
* */
export function changePencilBrushColor(RGBColor: string) {
    PencilBrush.color = RGBColor;
}

// @ts-ignore
function EraseAll({ targets }) {
    if (EraserAll) {
        // @ts-ignore
        targets.forEach(obj => obj.group?.removeWithUpdate(obj) || Canvas.remove(obj));
    }
}

/**
* Changes the brush to the one selected (Cursor, Eraser and Brush)
* @function
* @name changeBrush
* @param {Brush} x 
* @return boolean
* */
export function changeBrush(x: Brush) {
    switch (x) {
        case Brush.Cursor: {
            if (!Canvas.isDrawingMode) return false;
            Canvas.isDrawingMode = false;
            break;
        }
        case Brush.Eraser: {
            if (Canvas.isDrawingMode && Canvas.freeDrawingBrush == EraserBrush) return false;
            Canvas.isDrawingMode = true;
            console.trace();
            Canvas.freeDrawingBrush = EraserBrush;
            break;
        };
        case Brush.Pencil: {
            if (Canvas.isDrawingMode && Canvas.freeDrawingBrush == PencilBrush) return false;
            Canvas.isDrawingMode = true;
            Canvas.freeDrawingBrush = PencilBrush;
            break;
        };
        default: {
            console.log("TODO: " + x)
            break;
        }
    }
    return true
}

/**
* Updates the values of EraserBrush needed to enables certain behavior
* @function
* @name changeEraser
* @param {Eraser} x 
* @return boolean
* */
export function changeEraser(x: Eraser) {
    switch (x) {
        case Eraser.Do: {
            if (!EraserBrush.inverted) return false;
            EraserAll = false;
            EraserBrush.inverted = false;
            break;
        }
        case Eraser.Undo: {
            if (EraserBrush.inverted) return false;
            EraserAll = false;
            EraserBrush.inverted = true;
            break;
        };
        case Eraser.All: {
            if (EraserAll) return false;
            EraserAll = true;
            break;
        };
        default: {
            console.log("TODO: " + x)
            break;
        }
    }
    return true
}
