export class Progress {


    constructor(link, setting = {}) {
        this.setting = setting;
        this.url = link;
    }


    start() {
        console.log("Start.....");

        if (this.hasInSetting('progressInsert')) {
            const insert = document.getElementById(this.getInSetting('progressInsert'));
            insert.appendChild(this.createProgressContainer());
            return;
        }

        document.appendChild(this.createProgressContainer());
        return;

    }

    downloading() {
        let $this = this;
        const load = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", $this.url, true);
            xhr.responseType = 'arraybuffer';

            xhr.onprogress = e => {
                const progress = document.getElementById('temp-progress-download');

                if (e.lengthComputable) {
                    let calc = parseInt((e.loaded / e.total) * 100, 10);
                    console.log(calc);
                }

            };

            xhr.onloadend = function () {
                let options = {};

                let header = xhr.getAllResponseHeaders();
                let typeMatch = header.match('/^Content-type\:\s*(.*?)$/mi')

                if (typeMatch && typeMatch[1]) {
                    options.type = typeMatch[1];
                }

                const blob = new Blob([this.response], options);

                resolve(window.URL.createObjectURL(blob));
            };

            xhr.send();

        });
    }

    end() {
        console.log(end);
    }

    getInSetting(key, def = null) {
        if (!this.hasInSetting(key)) {
            return def;
        }
        return this.setting[key];
    }

    hasInSetting(key) {
        if (key in this.setting) {
            return true;
        }

        return false;
    }

    createProgressContainer() {

        if (this.hasInSetting('progressTempCallback')) {
            const tempCallback = this.getInSetting('progressTempCallback');

            return tempCallback();
        }


        const container = document.createElement('div');

        const progress = document.createElement('progress');

        progress.setAttribute('max', 100);
        progress.setAttribute('value', 1);

        progress.setAttribute("id", 'temp-progress-download');

        container.appendChild(progress);

        return container;
    }
};