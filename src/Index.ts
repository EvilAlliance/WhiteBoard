import { saveWindowState, StateFlags } from 'tauri-plugin-window-state-api';
import { initTitleBar } from './TitleBar/Index';
import { $, $$, EventListener } from './Utils';
import { initCanvas, updateCanvas } from './Canvas/Index';
import { createColorPicker } from './ColorPicker';
import { initPencilMenu } from './ToolBar/Pencil';
import { FirstLayerAttribute, ShowMenuClass } from './Constantes/Index';
import { FabricUpperCanvasClass, PencilMenuId } from './Constantes/JSPath';
import { Layer } from './Constantes/CSSVar';

EventListener(window, ['load'], init);
EventListener(window, ['resize'], updateWindow);
EventListener(window, ['mousedown', 'touchstart'], UnderCanvas);
EventListener(window, ['mouseup', 'touchleave', 'touchend'], UpperCanvas);


function UnderCanvas(e: Event) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            const Element = FirstLayer[i];
            if (Element instanceof HTMLElement)
                Element.style.setProperty(Layer, '-1');
        }
        const PencilMenu = $(PencilMenuId);
        if (PencilMenu && PencilMenu.classList.contains(ShowMenuClass)) {
            PencilMenu.classList.toggle(ShowMenuClass);
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
    initPencilMenu();
}

function saveState() {
    saveWindowState(StateFlags.ALL);
}
