import "@style/app.scss";

export class Modal {

    /**
     * @param button
     * @param title
     */
    constructor(button, title = '') {
        this.button = button;

        this.title = title;

        this.side = 'right';
    }

    sideRigth() {
        this.side = 'right';
        return this;
    }

    sideLeft() {
        this.side = 'left';
        return this;
    }

    /**
     * Set modal body
     * @param content
     * @return {Modal}
     */
    content(content) {
        if (typeof content != "string") {
            content[0].outerHTML;
        }
        this.body = content;
        return this;
    }


    /**
     * Easy method for create dom element
     * @param tagName
     * @param classList
     * @param attr
     * @param append
     * @return {Element}
     */
    static createElement(tagName, classList = [], attr = {}, append = null) {
        const element = document.createElement(tagName);

        if (classList.length > 0) {
            element.classList.add(...classList);
        }
        for (let key in attr) {
            element.setAttribute(key, attr[key]);
        }

        if (append !== null) {
            element.appendChild(append);
        }

        return element;
    }

    /**
     * Init listener for buttons
     */
    setEventLstenner() {
        let $this = this;


        $this.button.addEventListener('click', () => {
            const modal = $this.createModalElement();
            document.body.appendChild(modal);

            const close = modal.getElementsByClassName('close');

            close.addEventListener('click', () => {
                modal.remove();
            });
        });
    }

    /**
     * Trigger click to button(render model without listener)
     */
    trigger() {
        const modal = this.createModalElement();
        modal.classList.add('in');


        document.body.appendChild(modal);
        const close = modal.querySelector('.close');

        console.log(modal, close);

        if (close !== null) {
            close.addEventListener('click', () => {
                modal.remove();
            });
        }


    }

    /**
     * Init element of modal and generate super dom
     * @return {Element}
     */
    createModalElement() {

        let $this = this;


        const dialog = append => {
            return Modal.createElement('div', ['modal', $this.side, 'fade'], {
                tabindex: '-1',
                role: 'dialog'
            }, append);
        };
        const document = append => {
            return Modal.createElement('div', ['modal-dialog'], {
                // role : '-1',
                role: 'document'
            }, append);
        };

        const container = append => {
            return Modal.createElement('div', ['modal-content'], {}, append);
        };

        const header = append => {
            return Modal.createElement('div', ['modal-header'], {}, append);
        };

        const closeButton = append => {
            const button = Modal.createElement('button', ['close'], {
                'data-dismiss': 'modal',
                'aria-label': 'Close',
            });
            const closeSpan = Modal.createElement('span', [], {
                'aria-hidden': 'true'
            });

            closeSpan.textContent += 'x';

            button.appendChild(closeSpan);

            return button;
        };

        const body = (content, append = null) => {
            let element = Modal.createElement('div', ['modal-body'], {}, append);

            element.innerHTML += content;

            return element;
        };

        const containerElement = () => {
            let element = container();
            element.appendChild(header(closeButton()));
            element.appendChild(body($this.body));
            return element;
        };


        const modal = dialog(
            document(
                containerElement()
            )
        );

        return modal;


    }

}




