export function $(selector: string, ParentNode: ParentNode = document): Element | null {
    return ParentNode.querySelector(selector);
}

export function $$(selector: string, ParentNode: ParentNode = document) {
    return ParentNode.querySelectorAll(selector);
}

export function EventListener(Element: Element | Window, Events: string[], fn: EventListenerOrEventListenerObject) {
    for (let i = 0; i < Events.length; i++) {
        Element.addEventListener(Events[i], fn);
    }
}

export function isHTMLElement(node: Node): node is HTMLElement {
    return node instanceof HTMLElement;
}

let tapedTwice = false;

export function doubletap(Node: HTMLElement, cb: Function) {
    if (!tapedTwice) {
        tapedTwice = true;
        setTimeout(function() { tapedTwice = false; }, 300);
        return false;
    }
    cb(Node);
}
