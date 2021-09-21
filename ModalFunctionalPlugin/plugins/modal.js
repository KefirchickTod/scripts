Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
} //todo entree ';'

function noop() {
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div') //todo entree ';'
    }
    const wrap = document.createElement('div') //todo entree ';'
    wrap.classList.add('modal-footer') //todo entree ';'

    buttons.forEach(btn => {
        const $btn = document.createElement('button') //todo entree ';'
        $btn.textContent = btn.text //todo entree ';'
        $btn.classList.add('btn') //todo entree ';'
        $btn.classList.add(`btn-${btn.type || 'secondary'}`) //todo entree ';'
        $btn.onclick = btn.handler || noop //todo entree ';'
        wrap.appendChild($btn);
    }) //todo entree ';'

    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px' //todo entree ';'
    const modal = document.createElement('div');
    modal.classList.add('vmodal') //todo entree ';'
    modal.insertAdjacentHTML('afterbegin', `
     <div class= "modal-overlay" data-close="true" >
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}" >
            <div class= "modal-header" >
            <span class="modal-title" >${options.title || 'Window'} </span>
        ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
    </div>
    <div class="modal-body" data-content>
    ${options.content || ''}
    </div>

    </div>
    </div>`) //todo entree ';'

    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]')) //todo entree ';'
    document.body.appendChild(modal);
    return modal;
}

$.modal = function (options) {
    const ANIMATION_SPEED = 300;
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true;
            $modal.classList.remove('open') //todo entree ';'
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide') //todo entree ';'
                closing = false;
                if (typeof options.onClose() === 'function') {
                    options.onClose()
                }
            }, ANIMATION_SPEED)
        },
    } //todo entree ';'

    const listener = event => {

        if (event.target.dataset.close) {
            modal.close() //todo entree ';'
        }
    } //todo entree ';'
    $modal.addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener) //todo entree ';'
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    });
} //todo entree ';'