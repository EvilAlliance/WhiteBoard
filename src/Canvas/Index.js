import { fabric } from 'fabric';
import './../../node_modules/fabric/src/mixins/eraser_brush.mixin.js';
import { GenerateCursor } from './Cursor';
import { CanvasWhiteboardIdWHash } from '../Constantes/Index';

export const Brush = {
    Cursor: 0,
    Eraser: 1,
    Pencil: 2,
}

export const Eraser = {
    Do: 0,
    Undo: 1,
    All: 2,
}

let Canvas;
let EraserBrush;
let PencilBrush;
let EraserAll;

export function updateCanvas() {
    const { clientHeight, clientWidth } = document.body;

    Canvas.setWidth(clientWidth);
    Canvas.setHeight(clientHeight);
    Canvas.renderAll();
}

export function initCanvas() {
    const { clientHeight, clientWidth } = document.body;


    Canvas = new fabric.Canvas(CanvasWhiteboardIdWHash, {
        isDrawingMode: true,
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


export function changePencilBrushSize(size) {
    PencilBrush.width = size;
    GenerateCursor(Canvas);
}

export function changePencilBrushColor(RGBColor) {
    PencilBrush.color = RGBColor;
}

function EraseAll({ targets }) {
    if (EraserAll) {
        targets.forEach(obj => obj.group?.removeWithUpdate(obj) || Canvas.remove(obj));
    }
}

export function changeBrush(x) {
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

export function changeEraser(x) {
    switch (x) {
        case Eraser.Do: {
            if (!EraserBrush.inverted) return false;
            EraserAll = false;
            EraserBrush.inverted = false;
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
