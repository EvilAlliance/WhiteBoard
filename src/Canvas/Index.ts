import { fabric } from 'fabric';
import './../../node_modules/fabric/src/mixins/eraser_brush.mixin.js';
import type { fabric as Tfabric } from 'fabric';
import { GenerateCursor } from './Cursor';
import { CanvasWhiteboardIdWHash } from '../Constantes/Index';

export const enum Brush {
    Eraser,
    Pencil
}

let Canvas: Tfabric.Canvas;
let EraserBrush: Tfabric.PencilBrush;
let PencilBrush: Tfabric.PencilBrush;

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

    //@ts-ignore
    EraserBrush = new fabric.EraserBrush(Canvas);
    EraserBrush.width = 20;

    PencilBrush = new fabric.PencilBrush(Canvas);
    PencilBrush.width = 20;
    PencilBrush.color = 'rgba(0,0,0)';

    Canvas.freeDrawingBrush = PencilBrush;

    Canvas.renderAll();

    GenerateCursor(Canvas);
}


export function changePencilBrushSize(size: number) {
    Canvas.freeDrawingBrush.width = size;
    GenerateCursor(Canvas);
}

export function changePencilBrushColor(RGBColor: string) {
    Canvas.freeDrawingBrush.color = RGBColor;


}

export function changeBrush(x: Brush): boolean {
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
