import {Render} from "./render/render";


export class RenderWings extends Render {


    /**
     *
     * @param {HTMLCollection} elements
     */
    constructor(elements) {
        super();
        this.el = this._convert(elements);
    }


    execute() {
        for (let render of this.el) {
            render.execute();
        }
    }

    /**
     * Convert element to needle render Object
     * @param {HTMLCollection} elements
     * @private
     */
    _convert(elements) {
        let types = [];
        for (let el of elements) {
            const tag = el.tagName;

            if (!Render.hasType(tag)) {
                console.warn(`Cant find type: ${tag}`);
                continue;
            }
            const render = (() => {
                let obj = Render.types[tag];
                return new obj(el);
            })();

            types.push(render);
        }
        return types;
    }

}

