import { saveWindowState, StateFlags } from 'tauri-plugin-window-state-api';
import { initTitleBar } from './TitleBar/Index';
import { $, $$, EventListener } from './Utils';
import { initCanvas, updateCanvas } from './Canvas/Index';
import { createColorPicker } from './ColorPicker';
import { initPencil } from './ToolBar/Pencil';
import { FirstLayerAttribute, ShowMenuClass } from './Constantes/Index';
import { FabricUpperCanvasClass } from './Constantes/JSPath';
import { Layer } from './Constantes/CSSVar';
import { initEraser } from './ToolBar/Eraser';
import { initCursor } from './ToolBar/Cursor';

EventListener(window, ['load'], init);
EventListener(window, ['resize'], updateWindow);
EventListener(window, ['mousedown', 'touchstart'], UnderCanvas);
EventListener(window, ['mouseup', 'touchleave', 'touchend'], UpperCanvas);
EventListener(window, ['keydown'], doShortCut);
EventListener(window, ['keyup'], undoShortCut);


function UnderCanvas(e) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            FirstLayer[i].style.setProperty(Layer, '-1');
        }
        const Menu = $('.' + ShowMenuClass);
        if (Menu && Menu.classList.contains(ShowMenuClass))
            Menu.classList.toggle(ShowMenuClass);
    }
}

function UpperCanvas(e) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            FirstLayer[i].style.setProperty(Layer, '1');
        }
    }
}

function updateWindow() {
    saveState();
    updateCanvas();
}

function init() {
    initTitleBar();
    initCanvas();
    createColorPicker();
    initPencil();
    initEraser();
    initCursor();
}

function saveState() {
    saveWindowState(StateFlags.ALL);
}

function doShortCut(e) {
    console.log('do', e);
}

function undoShortCut(e) {
    console.log('undo', e);
}
