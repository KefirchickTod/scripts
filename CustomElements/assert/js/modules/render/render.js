import {DivWings, TableWings} from "./wings";

export class Render {
    static types = {
        'table': TableWings,
        'div': DivWings
    };


    /**
     * Remove from property types by key
     * @param key {string}
     */
    static removeType(key) {
        if (!Render.hasType(key)) {
            throw new Error(`Cant delete type: ${key} not found`);
        }

        delete Render.types[key];
    }

    /**
     * Check if exists of type class
     * @param key {string}
     */
    static hasType(key) {
        return Render.types.hasOwnProperty(key);
    }

    /**
     * Add class by type
     * @param key {string}
     * @param type {Object}
     */
    static addType(key, type) {
        try {
            if (Render.hasType(key)) {
                throw new Error(`Type: ${type} already exist`);
            }
            Render.types[key] = type;
        } catch (e) {
            console.error(e.toString());
            Render.removeType(key);
        }
    }
}

