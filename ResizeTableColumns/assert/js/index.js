import './bootstrap';


window.addEventListener("DOMContentLoaded", () => {
    (function () {
        const table = document.getElementById('resize-table');


        const resize = new window.tableResize(table,  {
            mouseDownEvent : () => {
                console.log('Event mouse down....')
            },
            mouseUpEvent : () => {
                console.log("Event mouse up....")
            },
            content : '|',
            className: 'resizer'
        });

    })();
});