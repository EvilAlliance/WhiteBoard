import { appWindow } from '@tauri-apps/api/window';
import { $, $$, EventListener } from './../Utils';
import { MaxIMG, MinIMG, TiltleBarId } from './../Constantes/Index';
import { saveWindowState, StateFlags } from 'tauri-plugin-window-state-api';

export async function initTitleBar() {
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    if (TitleBar) {
        const MinMax = $$('img', TitleBar)[1];
        if (MinMax instanceof HTMLImageElement) MinMax.src = isMax ? MaxIMG : MinIMG;

        const button = $$('button', TitleBar);
        if (button[0]) EventListener(button[0], ['click'], minimize);
        if (button[1]) EventListener(button[1], ['click'], MaximizeMinimize);
        if (button[2]) EventListener(button[2], ['click'], close);
    }
}

function minimize() {
    appWindow.minimize();
}

async function MaximizeMinimize() {
    await appWindow.toggleMaximize();
    saveWindowState(StateFlags.ALL);
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    if (TitleBar) {
        const MinMax = $$('img', TitleBar)[1];
        if (MinMax instanceof HTMLImageElement) MinMax.src = isMax ? MaxIMG : MinIMG;
    }
}

function close() {
    appWindow.close();
}
