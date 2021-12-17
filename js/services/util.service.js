'use strict';

function idMaker() {
    return ++gNextId
}

function $(selectorOrEl) {
    var el = selectorOrEl;
    if (typeof selectorOrEl === 'string') {
        el = document.querySelector(selectorOrEl);
    }
    const $el = {

        addClass(className) {
            el.classList.add(className)

            return $el
        },
        removeClass(className) {
            el.classList.remove(className)
            return $el
        },
        text(str) {
            if (str) el.innerText = str
            return el.innerText
        },
        hide() {
            el.hidden = true
            return $el
        },
        show() {
            el.hidden = false
            return $el
        },
        on(eventName, func) {
            el.addEventListener(eventName, func)
            return $el
        }
    }
    return $el;
}