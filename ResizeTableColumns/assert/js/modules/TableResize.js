(function (root, factory) {
    if (typeof define === 'function' & define.amd) {

        define(['jquery'], factory);
    } else if (typeof exports === 'object') {

        module.exports = factory(require('jquery'));
    } else {

        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    const debounce = (func, wait, immediate) => {
        let timeout;

        return function executedFunction() {
            const context = this;
            const args = arguments;

            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };


    class TableResize {
        /**
         *
         * @param table
         * @param setting
         * @example $setting  =  {className : string, content : string, mouseDownEvent : object, mouseUpEvent : object}
         */
        constructor(table, setting = {}) {
            this.table = table;
            this.setting = setting;
            this.readCols(table.querySelectorAll('th'));
        }

        createElementResize(col) {
            const resizerContains = col.querySelector(`.${this.setting.className}`);

            if (col.contains(resizerContains)) {
                return resizerContains;
            }

            const resizer = document.createElement('span');

            const className = this.setting.hasOwnProperty('className') ? this.setting.className : 'resizer';
            resizer.classList.add(this.setting.className);

            let content = '|';
            if (this.setting.hasOwnProperty('content')) {
                content = this.setting.content;
            }
            resizer.textContent += content;

            col.appendChild(resizer);

            return resizer;

        }

        readCols(cols) {
            if (cols.length === 0) {
                throw new Error("Empty cols for generate Table Resize");
            }
            for (let col of cols) {

                const resizer = this.createElementResize(col);

                this.creatResizabledColumn(col, resizer);
            }
        }

        creatResizabledColumn(col, resizer) {

            let $this = this;

            let x = 0;
            let w = 0;

            const mouseDownHandler = e => {

                if ($this.setting.hasOwnProperty('mouseDownEvent')) {
                    $this.setting.mouseDownEvent(e);
                }

                x = e.clientX;

                w = col.offsetWidth;


                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = debounce(move => {

                const dx = document.documentElement.scrollLeft + move.clientX - x;

                col.style.width = `${(dx + w) + (0)}px`;
            }, 2, true);

            const mouseUpHandler = () => {

                if ($this.setting.hasOwnProperty('mouseUpEvent')) {
                    $this.setting.mouseUpEvent();
                }

                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };


            $this.col = col;
            resizer.addEventListener('mousedown', mouseDownHandler);
        }

    }

    return TableResize;
}));