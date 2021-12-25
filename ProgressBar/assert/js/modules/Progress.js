import './scss/app.scss'

export class Progress {


    constructor(link, setting = {}) {
        this.setting = setting;
        this.url = link;
    }


    download() {
        const progressContainer = this.start();
        return this.downloading(progressContainer);
    }

    start() {
        console.log("Start.....");

        const containerProgress = this.createProgressContainer();

        if (this.hasInSetting('progressInsert')) {
            const insert = document.getElementById(this.getInSetting('progressInsert'));
            insert.appendChild(containerProgress);
            return containerProgress;
        }

        //console.log(containerProgress);

        document.body.append(containerProgress);

        return containerProgress;


    }

    downloading(containerProgress) {
        let $this = this;
        const load = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", $this.url, true);
            xhr.responseType = 'arraybuffer';
            const progress = document.getElementById('temp-progress-download');
            xhr.onprogress = e => {
                //const progress = containerProgress.getElementById('temp-progress-download');

                if (e.lengthComputable) {
                    let calc = parseInt((e.loaded / e.total) * 100, 10);

                    progress.value = calc;
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

        }).then((objectUrl) => {
            $this.end(containerProgress);
        });

        return load;
    }

    end(progress) {

        console.log("End........");


        progress.remove();

        // console.log(end);
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
        container.classList.add('progress-container-modal');

        const progress = document.createElement('progress');

        progress.setAttribute('max', 100);
        progress.setAttribute('value', 1);

        progress.setAttribute("id", 'temp-progress-download');

        container.append(progress);

        return container;
    }
};