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
import { resetMenu } from './ToolBar/Utils';

EventListener(window, ['load'], init);
EventListener(window, ['resize'], updateWindow);
EventListener(window, ['mousedown', 'touchstart'], UnderCanvas);
EventListener(window, ['mouseup', 'touchleave', 'touchend'], UpperCanvas);
EventListener(window, ['keydown'], doShortCut);
EventListener(window, ['keyup'], undoShortCut);


/**
* If the target of the clicked is the canvas every component which is up the canvas goes under
* @function
* @name UnderCanvas
* @param {MouseEvent} e 
* @return void*/
function UnderCanvas(e) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            FirstLayer[i].style.setProperty(Layer, '-1');
        }
        resetMenu();
    }
}

/**
* If the target realesed is the canvas every component which is currently under the canvas and goes up
* @function
* @name UnderCanvas
* @param {MouseEvent} e 
* @return void*/
function UpperCanvas(e) {
    if (e.target === $(FabricUpperCanvasClass)) {
        const FirstLayer = $$(FirstLayerAttribute);
        for (let i = 0; i < FirstLayer.length; i++) {
            FirstLayer[i].style.setProperty(Layer, '1');
        }
    }
}

/**
* Event when the window changes size updates the canvas and saves the size with the window
* @function
* @name updateWindow
* @return void*/
function updateWindow() {
    saveState();
    updateCanvas();
}

/**
* Initializes every event and component
* @function
* @name init
* @return void*/
function init() {
    initTitleBar();
    initCanvas();
    createColorPicker();
    initPencil();
    initEraser();
    initCursor();
}

/**
* Saves the size of the window
* @function
* @name saveState
* @return void*/
function saveState() {
    saveWindowState(StateFlags.ALL);
}

/**
* Event when keys are pressed
* @function
* @name doShortCut
* @param {KeyboardEvent} e 
* @return void*/
function doShortCut(e) {
    //console.log('do', e);
}

/**
* Event when keys are realesed
* @function
* @name undoShortCut
* @param {KeyboardEvent} e 
* @return void*/
function undoShortCut(e) {
    //console.log('undo', e);
}
