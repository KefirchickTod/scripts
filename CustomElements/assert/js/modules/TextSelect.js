export class TextSelect {
    constructor(element) {

        this._parse(element);

        this.element = element;
    }

    /**
     *  Create global custom event textSelect parse el
     * @param {HTMLElement|HTMLCollection} elements
     * @private
     */
    _parse(elements) {
        if (!Array.isArray(elements) || elements.constructor.name !== 'HTMLCollection') {
            elements = [elements];
        }
        const event = (text, e) => {
            console.log(text, e);
            return new CustomEvent('textSelect', {
                bubbles: true,
                detail: {
                    text: () => text,
                    el: () => e,
                }
            })
        };
        for (let el of elements) {
            this.initEvents(el, event);
        }
    }

    /***
     * Add for each el custom event trigger on event mouseup
     * @param {HTMLCollection|HTMLElement} el
     * @param {Function} event
     */
    initEvents(el, event) {

        if (el.constructor.name === 'HTMLCollection') {
            el = el[0];
        }
        el.addEventListener('mouseup', (e) => {

            if (window.getSelection) {
                e.target.dispatchEvent(event(window.getSelection().toString(), e));
                return;
            }

            if (document.selection) {
                e.target.dispatchEvent(event(document.selection.createRange().text, e));
                return;
            }

            return;
        })
    }

    /**
     * Static creator of class
     * @param elements {HTMLCollection|HTMLElement}
     * @returns {TextSelect}
     */
    static create(elements) {
        return new TextSelect(elements);
    }


    onSelect(closure) {

        for (let el of this.element) {
            el.addEventListener('textSelect', e => {
                const detail = e.detail;

                console.table(detail, e);

                return closure(e);
            })
        }

    }
}