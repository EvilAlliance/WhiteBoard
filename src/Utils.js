/**
 * Hola
 * */
export function $(selector, ParentNode = document) {
    return ParentNode.querySelector(selector);
}

export function $$(selector, ParentNode = document) {
    return ParentNode.querySelectorAll(selector);
}

export function EventListener(Element, Events, fn) {
    for (let i = 0; i < Events.length; i++) {
        Element.addEventListener(Events[i], fn);
    }
}

let tapedTwice = false;

export function doubletap(cb) {
    if (!tapedTwice) {
        tapedTwice = true;
        setTimeout(function() { tapedTwice = false; }, 300);
        return false;
    }
    cb();
}
