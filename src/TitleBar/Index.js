import { appWindow } from '@tauri-apps/api/window';
import { $, $$, EventListener } from './../Utils';
import { saveWindowState, StateFlags } from 'tauri-plugin-window-state-api';
import { TiltleBarId } from '../Constantes/JSPath';
import { AcctionButtonVar } from '../Constantes/CSSVar';

/**
* Init events of the tilebar
* @function
* @name initTitleBar
* @return void*/
export async function initTitleBar() {
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    const [_, Min, Max] = $$('img', TitleBar);
    Min.style.setProperty(AcctionButtonVar, isMax ? 'unset' : 'none');
    Max.style.setProperty(AcctionButtonVar, isMax ? 'none' : 'unset');

    const button = $$('button', TitleBar);
    EventListener(button[0], ['click', 'touchend'], minimize);
    EventListener(button[1], ['click', 'touchend'], MaximizeMinimize);
    EventListener(button[2], ['click', 'touchend'], close);
}

/**
* minimize the window
* @function
* @name minimize
* @return void*/
function minimize() {
    appWindow.minimize();
}

/**
* Maximize the screen or minimize it depending of the actual windows state
* @function
* @name MaximizeMinimize
* @return void*/
async function MaximizeMinimize() {
    await appWindow.toggleMaximize();
    saveWindowState(StateFlags.ALL);
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    const [_, Min, Max] = $$('img', TitleBar);
    Min.style.setProperty(AcctionButtonVar, isMax ? 'unset' : 'none');
    Max.style.setProperty(AcctionButtonVar, isMax ? 'none' : 'unset');
}

/**
* Closes the windwos
* function
* @name close
* @return void*/
function close() {
    appWindow.close();
}
