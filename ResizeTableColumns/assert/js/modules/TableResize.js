(function (root, factory) {
    if (typeof define === 'function' & define.amd) {

        define(['jquery'], factory);
    } else if (typeof exports === 'object') {

        module.exports = factory(require('jquery'));
    } else {

        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    class TableResize {
        constructor(table) {
            this.table = table;
            this.cols = this.readCols(table.querySelectorAll('th'));
        }

        readCols(cols) {
            if (cols.length === 0) {
                throw new Error("Empty cols for generate Table Resize");
            }
            for (let col of cols) {
                const resizer = document.createElement('span');
                resizer.classList.add('resizer');

                resizer.textContent += '|';

                col.appendChild(resizer);

                this.creatResizabledColumn(col, resizer);
            }
        }

        creatResizabledColumn(col, resizer) {

            let x = 0;
            let w = 0;

            const mouseDownHandler = e => {

                x = e.offsetX - 5;

                w = col.offsetWidth;


                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = move => {
                const dx = move.offsetX - x;

                col.style.width = `${(dx + w) + (0)}px`;
            };

            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };


            let $this = this;
            $this.col = col;
            resizer.addEventListener('mousedown', mouseDownHandler);
        }
    }

    return TableResize;
}));