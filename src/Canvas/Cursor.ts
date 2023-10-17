/**
 * @typedef {import('fabric')} fabric
 * Generates a Cursor for the canvas
 * @function
 * @name Generate Cursor
 * @param {fabric.Canvas} Canvas 
 * @returns void
 * */
export function GenerateCursor(Canvas: fabric.Canvas) {
    const w = Canvas.freeDrawingBrush.width / 2;
    const canv = document.createElement('canvas');
    const ctx = canv.getContext('2d') as CanvasRenderingContext2D;

    ctx.canvas.width = w * 2;
    ctx.canvas.height = w * 2;
    ctx.beginPath();
    ctx.arc(w, w, w, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'black';
    ctx.strokeStyle = 'white';
    ctx.stroke();
    Canvas.freeDrawingCursor = 'url(' + canv.toDataURL() + ') ' + w + ' ' + w + ' , auto';
}
