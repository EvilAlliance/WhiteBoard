import { fabric } from 'fabric';
import type { fabric as Tfabric } from 'fabric';
import { GenerateCursor } from './Cursor';
import { CanvasWhiteboardIdWHash } from '../Constantes/Index';

export let Canvas: Tfabric.Canvas;

export function updateCanvas() {
    const { clientHeight, clientWidth } = document.body;

    Canvas.setWidth(clientWidth);
    Canvas.setHeight(clientHeight);
    Canvas.renderAll();
}

export function initCanvas() {
    Canvas = new fabric.Canvas(CanvasWhiteboardIdWHash, {
        isDrawingMode: true,
    });
    Canvas.freeDrawingBrush.width = 20;
    Canvas.freeDrawingBrush.color = 'rgba(0,0,0)';

    const { clientHeight, clientWidth } = document.body;

    Canvas.setWidth(clientWidth);
    Canvas.setHeight(clientHeight);
    Canvas.renderAll();

    GenerateCursor(Canvas);
}
