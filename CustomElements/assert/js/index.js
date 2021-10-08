import "@style/app.scss";
import {TextSelect} from "@models/TextSelect";
import {DivWings} from "@models/render/wings";

window.addEventListener('DOMContentLoaded', function () {
    const elements = document.getElementsByClassName('custom-block');

    const text = TextSelect.create(elements);

    text.onSelect((info, event) => {
        return true;
    });

    const test = document.getElementById("test-block");


    let wings = new DivWings(test);

    wings.execute();

});