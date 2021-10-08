export const button = (setting) => {
    const event = (el, fn) => {
        el.addEventListener('click', (e) => {
            return fn(e);
        })
    };
    const li = (key, content) => {
        let l = document.createElement("li");
        l.classList = `wings-drop-li wings-key-${key}`;
        l.innerHTML += content;
        return l;
    }

    const div = document.createElement("div");
    div.classList = "wing-container";
    const ul = document.createElement("ul");
    for (let stt of setting) {

        const appendLi = li(stt.key, stt.content);
        ul.appendChild(appendLi);

        event(appendLi, stt.fn);
    }

    div.appendChild(ul);

    div.addEventListener('click', e => {
        if (e.target !== div.target) {
            console.log("Target conflict");
            return;
        }
        if (div.classList.contains('open')) {
            div.classList.remove('open');
            return;
        }
        div.classList.add('open');

    })


    return div;
}