(function (root, factory) {
    if (typeof define === 'function' & define.amd) {

        define(['./Modal'], factory);

    } else if (typeof exports === 'object') {

        module.exports = factory(require('./Modal'));

    } else {

        root.returnExports = factory(root.Modal);

    }
}(this, function ($) {


    class EntriesType {

        /**
         * Global name for class container html
         * @type {string}
         */
        static containerClass = 'entries-container';


        constructor(entries) {
            this.entries = entries;
        }

        /**
         * Render container with some additional elements;
         * @param content {Array}
         * @returns {*}
         */
        static createContainer(content) {


            if (document.getElementsByClassName(this.containerClass).length > 0) {
                for (let elementsByClassNameKey of document.getElementsByClassName(this.containerClass)) {
                    elementsByClassNameKey.remove();
                }
            }

            const container = document.createElement('div');

            container.classList.add(this.containerClass);

            container.append(...content);

            const closeElement = document.createElement('span');
            closeElement.classList.add('close-container');

            container.appendChild(closeElement);

            closeElement.addEventListener('click', () => {
                container.remove();
            });


            return container;
        }


    }

    class EntriesTypeText extends EntriesType {

        constructor(entries) {
            super(entries);
        }


        /**
         * Render content from entries
         * @returns {Element|string}
         */
        render() {

            const typeContainer = document.createElement('div');
            const title = document.createElement('h2');
            const text = document.createElement('span');

            title.innerText += this.entries.title;
            text.innerText += this.entries.value;

            typeContainer.classList.add('entries-type-text');

            typeContainer.append(title, text);

            return typeContainer;

        }
    }

    class EntriesTypeFactory {

        /**
         * Default processors for processing a entries data
         * @type {{text: *}}
         */
        processing = {
            text: EntriesTypeText,
        };

        constructor(processing = null) {
            this.registerCustom(processing);

        }

        /**
         * Add to factory custom processors
         * @param processing
         */
        registerCustom(processing) {
            if (processing === null) {
                return;
            }

            for (let type in processing) {
                this.processing[type] = processing;
            }
        }

        /**
         *
         * @param type {string}
         * @param value
         * @return {Object}
         */
        factory(type, value) {
            if (!this.processing.hasOwnProperty(type)) {
                type = 'text';
            }

            return new this.processing[type](value);
        }
    }

    class SideTableInfo {

        static processing = [];


        /**
         * Render new buttons for refresh table
         */
        refresh() {
            this.colsId = this.readTableColsId(this.table)
        }

        constructor(table, settings = {}) {
            this.setting = settings;

            this.table = table;

            this.colsId = this.readTableColsId(table);

            if (this.hasInSetting('listener')) {
                this.initCustomEvent();
            }
        }

        /**
         * Init custom listener for dynamiclly dispatchig
         */
        initCustomEvent() {
            let $this = this;
            this.table.addEventListener(this.getInSetting('listener', 'updateTable'), () => {
                console.log("Dispatched event");
                $this.refresh();
            })
        }

        /**
         * Register custom type processor
         * @param type
         * @param processing
         */
        static registerType(type, processing) {
            SideTableInfo.processing[type] = processing;
        }

        /**
         * Create button if not exist in
         * @param tr
         * @return {Element|HTMLButtonElement}
         */
        createElementShowButton(tr) {

            const td = tr.children[this.getNeedTdIdFromSetting()];

            if (!td) {
                throw new Error("Undefined td with index " + this.getNeedTdIdFromSetting());
            }


            const infoContains = td.querySelector(`.${this.getNeedButtonClassFromSetting()}`);

            if (td.contains(infoContains)) {
                return infoContains;
            }

            const infoButton = document.createElement("button");

            infoButton.classList.add(this.getNeedButtonClassFromSetting());

            infoButton.textContent += "Show side info";

            td.appendChild(infoButton);

            return infoButton;
        }


        /**
         * Return selector for getting tr
         * @returns {string}
         */
        getNeedTrSelectorFromSetting() {
            return this.getInSetting('trSelector', 'tbody > tr')
        }

        /**
         * Reading col from table and create eventListener
         * @param table
         * @return {Element}
         */
        readTableColsId(table) {
            const cols = table.querySelectorAll(this.getNeedTrSelectorFromSetting());

            let colsId = [];


            let iterator = 0;
            for (let tr of cols) {


                let attributeId = tr.getAttribute(this.getNeedAttributeFromSetting());


                if (attributeId === null) {
                    attributeId = iterator;
                }


                let button = this.createElementShowButton(tr);
                this.handleButton(button, attributeId);


                const modal = new $.Modal(button);
                modal.setTitle(this.createStepButtons(iterator, cols.length, attributeId));

                colsId[attributeId] = {'button': button, id: attributeId, 'tr': tr, 'modal': modal};

                iterator++;
            }


            return colsId;

        }

        createStepButtons(current, max, attrId) {
            let $this = this;
            const step = (id, stepWhere = 'up') => {


                const button = document.createElement('button');

                button.classList.add(`side-info-step-${stepWhere}`);
                button.innerText = stepWhere;

                $this.handleButton(button, attrId);

                return button;
            };

            let result = [];

            if (current > 1) {
                result.push(step(current - 1, 'up'));
            }

            if (current < (max - 1)) {
                result.push(step(current + 1, 'down'));
            }

            return result;

        }

        /**
         * Render side navigation by response
         * @param response: JSON|Object
         */
        renderByResponse(response, id) {
            if (!response.hasOwnProperty('data')) {
                throw new Error("Cant read data in json");
                return;
            }

            const data = response.data;

            const factory = new EntriesTypeFactory(SideTableInfo.processing);

            let result = [];
            for (let current in data) {
                let entries = data[current];

                if (typeof entries != 'object') {
                    console.info("Entries must be typeof object");
                    continue;
                }

                const type = entries.type;

                result.push(factory.factory(type, entries).render());
            }


            if (result.length > 0) {

                const container = EntriesType.createContainer(result);

                const modal = this.colsId[id].modal;


                modal.content(container);

                modal.trigger();

            }

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

        trigger(id) {
            const coll = this.colsId[id];

            coll.button.click();
        }

        /**
         * Init trigger for each individual button
         * @param button
         * @param id
         */
        handleButton(button, id) {
            let $this = this;
            button.addEventListener('click', () => {
                let module = $this.getNeedModuleNameFromSettingTableAttribute();

                async function sending() {
                    const api = $this.getApiHandler();

                    return await api({'module': module, 'id': id});
                }

                sending().then((response) => {
                    if (!response.hasOwnProperty('status')) {
                        throw new Error("Cant get status from response");
                        return;
                    }

                    const status = response.status;

                    if (status === 'error') {
                        throw new Error(response.massage);
                        return;
                    }
                    $this.renderByResponse(response, id);
                })
            });
        }


        getApiHandler() {
            if (!this.hasInSetting('apiHandler')) {
                throw new Error("Undefined apiHandler in setting");
            }
            return this.getInSetting('apiHandler');
        }

        /**
         * Get from setting key for array of td. Need for insert button in td
         * @return {number|string}
         */
        getNeedTdIdFromSetting() {
            return this.getInSetting('tdId', 0);
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