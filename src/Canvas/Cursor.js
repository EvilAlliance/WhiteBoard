export function GenerateCursor(Canvas) {
    const w = Canvas.freeDrawingBrush.width / 2;
    const canv = document.createElement('canvas');
    const ctx = canv.getContext('2d');

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
