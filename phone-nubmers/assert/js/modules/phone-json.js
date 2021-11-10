export default class PhoneJson {

    /**
     * Got json
     * @type {JSON}
     */
    json

    /**
     *  Parsed value from fn {toOption}
     * @type {null}
     */
    option = null

    constructor(json) {
        this.json = this._parse(json);
    }

    /**
     * Set prop for object
     * @param obj
     * @param key
     * @param value
     * @return {*}
     * @private
     */
    _setProp = (obj, key, value) => {
        Object.defineProperty(obj, key, {
            'value': value,
            writable: true,
            enumerable: true,
            configurable: true
        })
        return obj;
    }

    /**
     * Parse json
     * @private
     */
    _parse(json) {
        let j = {};

        for (let i in json) {

            let obj = {
                phone: json[i].phoneCode,
                name: json[i].countryName
            };

            j = this._setProp(j, json[i].code, obj);
        }

        console.log(j);

        return j;

    }

    /**
     * @return {string|number}
     * @private
     */
    _search(prop, search) {
        for (let key in this.json) {
            if (this.json[key][prop].trim() === search.trim()) {
                return key;
            }
        }
        return -1;
    }

    /**
     *
     * @param country {string}
     * @return {string}
     */
    getPhoneCode(country) {
        if (country in this.json) {
            return this.json[country].phone;
        }
        throw new Error(`Undefined country [${country}] for get phone code `);
    }

    /**
     * For expl: mask = 380 0234 324... and we return country code
     * @param mask {string}
     * @return {string}
     */
    getPhoneCountryByMask(mask) {
        mask = mask.trim().replace(/\s/g, '');

        if (!mask) {
            throw new Error(`Cant parse empty mask [${mask}]`);
        }

        mask = mask.includes('+') ? mask.slice(0, 4) : `+${mask.slice(0, 3)}`;

        const code = this._search('phone', mask);

        if (code === -1) {
            throw new Error(`Cant search by mask val [${mask}]`);
        }

        return code;
    }

    /**
     * Convert all list to special json format
     * @return {[JSON]}
     */
    toOption() {
        if (this.option) {
            return this.option;
        }

        let options = [];

        for (let k in this.json) {
            options.push({
                text: this.json[k].name,
                value: k
            });
        }


        this.option = options;

        return options;
    }
}