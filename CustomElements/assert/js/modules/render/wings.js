import {button} from "./button";

export class Wings {
    constructor(element) {
        this.element = element;
    }

}

export class TableWings extends Wings {

    _setting = {};

    constructor(element) {
        super(element);
    }

    execute() {

    }
}

export class DivWings extends Wings {
    _setting = [
        {
            type: "change",
            content: 'change color',
            fn: e => {
                console.log('click');
                this.changeColor(e);
            }
        }
    ];

    constructor(element) {
        super(element);
    }

    changeColor(e) {
        const element = e.target;

        element.style.color = "green";

        const hash = element.hash;
        console.log(`Change to green, hash: ${hash}`);
    }

    execute() {

        console.log(this.element);
        console.log(button(this._setting));

        this.element.append(button(this._setting));
    }
}