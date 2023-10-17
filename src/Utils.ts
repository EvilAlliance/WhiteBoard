/**
* querySelector
* @function
* @name $
* @param {string} selector 
* @param {HTMLElement} [ParentNode=document] = to document
* @return HTMLELement | null
* */
export function $(selector: string, ParentNode: HTMLElement | Document = document) {
    return ParentNode.querySelector(selector);
}

/**
* querySelectorAll
* @function
* @name $$
* @param {string} selector 
* @param {HTMLElement} [ParentNode=document] = to document
* @return HTMLElement[]
* */
export function $$(selector: string, ParentNode: HTMLElement | Document = document) {
    // @ts-ignore
    return ParentNode.querySelectorAll(selector) as HTMLElement[];
}

/**
* addEventListener
* @function
* @name EventListener
* @param {HTMLElement} Element 
* @param {string[]} Events 
* @param {Function} fn 
* @return void
* */
export function EventListener(Element: HTMLElement | Window, Events: (keyof HTMLElementEventMap)[], fn: Function) {
    for (let i = 0; i < Events.length; i++) {
        // @ts-ignore
        Element.addEventListener(Events[i], fn);
    }
}

/**
 * True when alredy clicked one time
 * type {boolean}
 * @protected
 * */
let tapedTwice = false;

/**
* When double tap in a certain amout of time activates a cb
* @function
* @name doubletap
* @param {Function} cb 
* @return boolean
* */
export function doubletap(cb: Function) {
    if (!tapedTwice) {
        tapedTwice = true;
        setTimeout(function() { tapedTwice = false; }, 300);
        return false;
    }
    cb();
}
