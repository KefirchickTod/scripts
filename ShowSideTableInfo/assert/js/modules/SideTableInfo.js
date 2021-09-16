(function (root, factory) {
    if (typeof define === 'function' & define.amd) {

        define(['jquery'], factory);
    } else if (typeof exports === 'object') {

        module.exports = factory(require('jquery'));
    } else {

        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    class SideTableInfo {
        constructor(table, settings = {}) {
            this.setting = settings;

            this.table = table;

            this.colsId = this.readTableColsId(table);
        }


        /**
         * Create button if not exist in
         * @param tr
         * @return {Element|HTMLButtonElement}
         */
        createElementShowButton(tr) {
            const infoContains = tr.querySelector(`.${this.getNeedButtonClassFromSetting()}`);

            if (tr.contains(infoContains)) {
                return infoContains;
            }

            const infoButton = document.createElement("button");

            infoButton.classList.add(this.getNeedButtonClassFromSetting());

            infoButton.textContent += "Show side info";

            tr.appendChild(infoButton);

            return infoButton;
        }

        /**
         * Reading col from table and create eventListener
         * @param table
         * @return {Element}
         */
        readTableColsId(table) {
            const cols = table.querySelector('tbody > tr');

            let attr = [];

            for (let tr of cols) {

                if (!tr.hasAttribute(this.getNeedAttributeFromSetting())) {
                    throw new Error("Cant find attr for tr");
                    continue;
                }

                let button = this.createElementShowButton(tr);
                this.triggerButtons(button, tr.getAttribute(this.getNeedAttributeFromSetting()));


            }

            return cols;

        }


        /**
         * Render side navigation by response
         * @param response
         */
        renderByResponse(response) {

        }

        /**
         * Get module name for attr table or setting json
         * @return string
         */
        getNeedModuleNameFromSettingTableAttribute() {

            if (typeof this.model !== 'undefined' && this.model !== null) {
                return this.model;
            }

            let model = this.getInSetting('model', null);

            if (model !== null) {
                return model;
            }

            if (!this.table.hasAttribute('data-table-show-model')) {
                throw new Error("Cant find model  for table");
            }

            this.model = model;


            return this.model;
            // return this.getInSetting('model', null)
        }

        /**
         * Init trigger for each individual button
         * @param button
         */
        triggerButtons(button) {
            let $this = this;
            button.addEventListener('click', () => {
                let module = $this.getNeedModuleNameFromSettingTableAttribute();

                async function sending() {
                    const api = $this.getApiHandler();

                    return await api(module);
                }

                sending().then((response) => {
                    $this.renderByResponse(response);
                })
            });
        }


        getApiHandler() {
            if (!this.hasInSetting('apiHandler')) {
                throw new Error("Undefined handler");
            }
            return this.getInSetting('apiHandler');
        }

        /**
         * Check if exist in setting class for triggers
         * @return {*}
         */
        getNeedButtonClassFromSetting() {
            return this.getInSetting('buttonClass', 'showInfoTable');
        }

        /**
         * Get attribute key
         * @return {*}
         */
        getNeedAttributeFromSetting() {
            return this.getInSetting('attr', 'data-table-row-id');
        }

        /**
         * Get property from setting if exist
         * @param key
         * @param def
         * @return {*}
         */
        getInSetting(key, def = null) {
            if (!this.hasInSetting(key)) {
                return def
            }

            return this.setting[key];
        }

        /**
         * Check if exist key in getting setting
         * @param key : string
         * @return boolean
         */
        hasInSetting(key) {
            if (typeof this.setting != 'object') {
                throw new Error("Setting must be typeof object");
            }

            if (this.setting.hasOwnProperty(key)) {
                return true;
            }
            return false;
        }
    }


    return SideTableInfo;
}));