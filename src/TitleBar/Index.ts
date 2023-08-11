import { appWindow } from '@tauri-apps/api/window';
import { $, $$, EventListener, isHTMLElement } from './../Utils';
import { saveWindowState, StateFlags } from 'tauri-plugin-window-state-api';
import { TiltleBarId } from '../Constantes/JSPath';
import { AcctionBottonVar } from '../Constantes/CSSVar';

export async function initTitleBar() {
    const isMax = await appWindow.isMaximized();
    const TitleBar = $(TiltleBarId);
    if (TitleBar) {
        const Max = $$('img', TitleBar)[1];
        const Min = $$('img', TitleBar)[2];
        if (!isHTMLElement(Min)) return;
        if (!isHTMLElement(Max)) return;
        Min.style.setProperty(AcctionBottonVar, isMax ? 'unset' : 'none');
        Max.style.setProperty(AcctionBottonVar, isMax ? 'none' : 'unset');

        const button = $$('button', TitleBar);
        if (button[0]) EventListener(button[0], ['click', 'touchend'], minimize);
        if (button[1]) EventListener(button[1], ['click', 'touchend'], MaximizeMinimize);
        if (button[3]) EventListener(button[3], ['click', 'touchend'], close);
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
        const Max = $$('img', TitleBar)[1];
        const Min = $$('img', TitleBar)[2];
        if (!isHTMLElement(Min)) return;
        if (!isHTMLElement(Max)) return;
        Min.style.setProperty(AcctionBottonVar, isMax ? 'unset' : 'none');
        Max.style.setProperty(AcctionBottonVar, isMax ? 'none' : 'unset');
    }
}

function close() {
    appWindow.close();
}
