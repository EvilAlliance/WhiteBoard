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

EventListener(window, ['load'], init);
EventListener(window, ['resize'], updateWindow);
EventListener(window, ['mousedown', 'touchstart'], UnderCanvas);
EventListener(window, ['mouseup', 'touchleave', 'touchend'], UpperCanvas);
EventListener(window, ['keydown'], doShortCut);
EventListener(window, ['keyup'], undoShortCut);


function UnderCanvas(e: Event) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            const Element = FirstLayer[i];
            if (Element instanceof HTMLElement)
                Element.style.setProperty(Layer, '-1');
        }
        const Menu = $('.' + ShowMenuClass);
        if (Menu && Menu.classList.contains(ShowMenuClass)) {
            Menu.classList.toggle(ShowMenuClass);
        }
    }
}

function UpperCanvas(e: Event) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            const Element = FirstLayer[i];
            if (Element instanceof HTMLElement)
                Element.style.setProperty(Layer, '1');
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
}

function saveState() {
    saveWindowState(StateFlags.ALL);
}

function doShortCut(e: Event) {
    console.log('do', e);
}

function undoShortCut(e: Event) {
    console.log('undo', e);
}
