import {Alert} from "./modules/alert";


window.addEventListener("DOMContentLoaded", () => {
    (function () {

        const btn1 = document.getElementById('btn1');

        const btn2 = document.getElementById('btn2');

        btn1.addEventListener('click', () => {
            Alert.success(
                'Success massage', 1500
            );
        });

        btn2.addEventListener('click', () => {
            Alert.error(
                'Error massage', 1500
            );
        });


    })();
});