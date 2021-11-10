`use strict`;

const phoneJsonUrl = 'https://api.npoint.io/d0ac985ca62e2966ec70';
const MAXLENGTH = 13;
export default class Phone {

    constructor(list, ...selector) {
        this.selector = selector;
        this.list = list;
    }

    /**
     * Check if parent of selector contains <select> tag
     * @param selector {HTMLElement}
     * @return boolean
     */
    hasSelect(selector){
        return selector.parentElement.querySelectorAll('select').length === 1;
    }

    /**
     * Create selector <select> for parent element
     * @return HTMLElement
     * @private
     */
    _createSelect(){
        const dropdown = document.createElement('select');

        return dropdown;
    }


    /**
     * Add to selector parent tag <select>
     * @param selector {HTMLElement}
     * @param dropdown {HTMLElement}
     * @private
     */
    _addSelect(selector, dropdown){
        selector.parentElement.appendChild(dropdown);
    }

    /**
     * Init event for each selector
     */
    events(){
        const selectors = this.selector;

        for(let selector of selectors){
            let dropdown = null;
            if(!this.hasSelect(selector)){
                this._addSelect(selector, this._createSelect());
            }}



    }

    /**
     * Fetch json from url {const: phoneJsonUrl}
     * @param url
     * @param selectors
     * @returns {Promise<Phone>}
     */
    static async createByFetchingList(url = null, ...selectors) {

        if (Phone.list) {
            return Phone.list;
        }
        url = url ? url : phoneJsonUrl;

        const responseJson = async function () {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
            });
            return await response.json();
        };

        return responseJson().then(json => {
            return new Phone(json, ...selectors);
        });
    }
}