import { appWindow } from '@tauri-apps/api/window';
import { $, $$, EventListener } from './../Utils';
import { saveWindowState, StateFlags } from 'tauri-plugin-window-state-api';
import { TiltleBarId } from '../Constantes/JSPath';
import { AcctionBottonVar } from '../Constantes/CSSVar';

export async function initTitleBar() {
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    const [_, Min, Max] = $$('img', TitleBar);
    Min.style.setProperty(AcctionBottonVar, isMax ? 'unset' : 'none');
    Max.style.setProperty(AcctionBottonVar, isMax ? 'none' : 'unset');

    const button = $$('button', TitleBar);
    EventListener(button[0], ['click', 'touchend'], minimize);
    EventListener(button[1], ['click', 'touchend'], MaximizeMinimize);
    EventListener(button[2], ['click', 'touchend'], close);
}

function minimize() {
    appWindow.minimize();
}

async function MaximizeMinimize() {
    await appWindow.toggleMaximize();
    saveWindowState(StateFlags.ALL);
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    const [_, Min, Max] = $$('img', TitleBar);
    Min.style.setProperty(AcctionBottonVar, isMax ? 'unset' : 'none');
    Max.style.setProperty(AcctionBottonVar, isMax ? 'none' : 'unset');
}

function close() {
    appWindow.close();
}
