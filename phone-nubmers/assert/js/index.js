import Phone from "./modules/phone";

window.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementsByClassName('phone');

    const phone = Phone.createByFetchingList(null, ...selector);

});