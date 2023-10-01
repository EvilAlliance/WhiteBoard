import { fabric } from 'fabric';
import './../../node_modules/fabric/src/mixins/eraser_brush.mixin.js';
import { GenerateCursor } from './Cursor';
import { CanvasWhiteboardIdWHash } from '../Constantes/Index';

export const Brush = {
    Eraser: 0,
    EraserUndo: 1,
    EraserAll: 2,
    Pencil: 3,
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
    Canvas.freeDrawingBrush.width = size;
    GenerateCursor(Canvas);
}

export function changePencilBrushColor(RGBColor) {
    Canvas.freeDrawingBrush.color = RGBColor;
}

function EraseAll({ targets }) {
    if (EraserAll) {
        targets.forEach(obj => obj.group?.removeWithUpdate(obj) || Canvas.remove(obj));
    }
}

export function changeBrush(x) {
    switch (x) {
        case Brush.Eraser: {
            if (Canvas.freeDrawingBrush == EraserBrush && !EraserBrush.inverted) return false;
            EraserAll = false;
            EraserBrush.inverted = false;
            Canvas.freeDrawingBrush = EraserBrush;
            break;
        };
        case Brush.EraserUndo: {
            if (Canvas.freeDrawingBrush == EraserBrush && EraserBrush.inverted) return false;
            EraserAll = false;
            EraserBrush.inverted = true;
            Canvas.freeDrawingBrush = EraserBrush;
            break;
        };
        case Brush.EraserAll: {
            if (Canvas.freeDrawingBrush == EraserBrush && EraserAll) return false;
            EraserAll = true;
            EraserBrush.inverted = false;
            Canvas.freeDrawingBrush = EraserBrush;
            break;
        };
        case Brush.Pencil: {
            if (Canvas.freeDrawingBrush == PencilBrush) return false;
            Canvas.freeDrawingBrush = PencilBrush;
            break;
        };
        default: {
            console.log("TODO: " + x)
            break;
        }
    }
    GenerateCursor(Canvas);
    return true
}
