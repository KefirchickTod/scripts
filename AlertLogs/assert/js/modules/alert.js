import "./scss/app.scss";

const SUCCESS = 0;
const ERORR = 1;


export class Alert {
    constructor(delay = 5000) {
        this.time = delay;
    }


    /**
     * Create element for show text massage and  add listener for click
     * @return {HTMLElement}
     */
    createElementAlert() {
        const article = document.createElement('article');

        article.setAttribute('class', 'alertify-log  alertify-log-show');

        article.addEventListener('click', () => {
            this.hide(article);
        });

        return article;
    }

    /**
     * Create section for contains alerts
     * @return {HTMLElement}
     */
    createElementSection() {

        const section = document.createElement('section');

        section.setAttribute('class', 'alertify-logs alertify-logs-hidden');


        return section;
    }

    /**
     * Basic function of animation
     * @param options
     */
    animate(options) {
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }


    /**
     * Animate for hide alert
     * @param alert
     * @param duration
     */
    delayAnimation(alert, duration = 1000) {


        const alertWidth = alert.offsetWidth;
        this.animate({
            duration: 1000,
            timing: function back(x, timeFraction) {
                return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
            }.bind(-1, 1.5),
            draw: function (progress) {
                alert.style.left = progress * alertWidth + 'px';
            }
        });

    }

    /**
     * Hide alert from delayAnimation
     * @param alert
     */
    hide(alert) {
        const delay = 1000;

        this.delayAnimation(alert, delay);
        setTimeout(() => {

            alert.remove();
        }, delay);

    }

    getOffestSection(def = null) {
        if (!this.offsetSection()) {
            return typeof def == 'function' ? def() : def;
        }
        return document.querySelectorAll('section.alertify-logs')[0];
    }

    /**
     * Check if document body has section
     * @return {boolean}
     */
    offsetSection() {
        if (document.querySelectorAll('section.alertify-logs').length > 0) {
            return true;
        }

        return false;
    }


    /**
     * Create massage by type
     * @param text {string}
     * @param type {number}
     */
    massage(text, type = 0) {
        const alert = this.createElementAlert();

        switch (type) {
            case SUCCESS:
                alert.classList.add('alertify-log-success');
                break;
            case ERORR:
                alert.classList.add('alertify-log-error');
                break;
            default:
                alert.classList.add('alertify-log-success');
                break;
        }


        let section = this.getOffestSection(() => {
            let s = this.createElementSection();
            s.classList.remove('alertify-logs-hidden');
            return s;
        });

        alert.innerText = text;


        document.body.append(this.showAnimation(section, alert));


        this.delay(alert, this.time);
    }


    /**
     * Set animation for show alert
     * @param section {HTMLElement}
     * @param alert {HTMLElement}
     * @return {HTMLElement}
     */
    showAnimation(section, alert){
        alert.classList.add('alertify-animate-show');

        section.appendChild(alert);

        setTimeout(() => {
            alert.classList.remove('alertify-animate-show');
        }, 400);

        return section;
    }

    /**
     * Set delay for alert after create
     * @param alert
     * @param time
     * @return {Promise<unknown>}
     */
    delay(alert, time) {

        if (!time) {
            return;
        }

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                this.hide(alert);

                return alert;
            }, time)
        });
    }

    /**
     *
     * @param text {string}
     * @param delay {number}
     */
    static error(text, delay = 5000) {
        const alert = new Alert(delay);
        alert.massage(text, ERORR);
    }

    /**
     *
     * @param text {string}
     * @param delay {number}
     */
    static success(text, delay) {
        const alert = new Alert(delay);
        alert.massage(text, SUCCESS);
    }


}