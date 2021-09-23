import {Progress} from "./modules/Progress";


window.addEventListener("DOMContentLoaded", () => {
    (function () {

        const downloadElement = document.getElementById('download-test');

        downloadElement.addEventListener('click', () => {
            const url = downloadElement.getAttribute('href');

            const progress = new Progress(url);

            progress.start();

            progress.downloading();

            return false;
        })
    })();
});