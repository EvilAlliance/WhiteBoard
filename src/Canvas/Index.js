import { fabric } from 'fabric';
import './../../node_modules/fabric/src/mixins/eraser_brush.mixin.js';
import { GenerateCursor } from './Cursor';
import { CanvasWhiteboardIdWHash } from '../Constantes/Index';

export const Brush = {
    Eraser: 0,
    Pencil: 1
}

let Canvas;
let EraserBrush;
let PencilBrush;

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

export function changeBrush(x) {
    switch (x) {
        case Brush.Eraser: {
            if (Canvas.freeDrawingBrush == EraserBrush) return false;
            Canvas.freeDrawingBrush = EraserBrush;
            break;
        };
        case Brush.Pencil: {
            if (Canvas.freeDrawingBrush == PencilBrush) return false;
            Canvas.freeDrawingBrush = PencilBrush;
            break;
        }
    }
    GenerateCursor(Canvas);
    return true
}
