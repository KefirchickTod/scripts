import './bootstrap';

const APIKEY = 'dcdc0875e17044d3923889b70df1b035';

window.addEventListener("DOMContentLoaded", () => {

    (function () {
        let selector = $(".currency-convert-container > select");
        if (selector.length === 0) {
            return;
        }
        const currencyDomRun = (response) => {
            function summ(currency1, currency2, val) { // Делаем функцию
                return window.currency.convert(currency1, currency2, val, response);
            }

            let resultSelector = $("#convert-result");

            const currentValues = () => {
                return {
                    input: $("#input-currency").val(),
                    from: $(".currency-convert-container #from").val(),
                    to: $(".currency-convert-container #to").val()

                };
            };
            const countEvent = () => {
                let values = currentValues();

                if (values.from === values.to) {
                    resultSelector.val(values.input);
                    return;
                }
                resultSelector.val(summ(values.from, values.to, values.input));
            };


            $('#convert').click(countEvent);
            $("#from").change(countEvent);
            $("#to").change(countEvent);
        };


        const curr = new window.currency(APIKEY);
        window.currency.getListOfSymbols('https://api.currencyfreaks.com/currency-symbols').then((response) => {
            selector.each(function () {
                let $this = $(this);
                for (let symbol in response) {
                    $this.append(`<option value="${symbol}">${response[symbol]}</option>`);
                }
            });
            curr
                .load()
                .then(currencyDomRun);
        });
    })();
});