import './bootstrap';


window.addEventListener("DOMContentLoaded", () => {
    (function () {
        const table = document.getElementById('resize-table');


        const resize = new window.tableResize(table);

        console.log(resize);
    })();
});