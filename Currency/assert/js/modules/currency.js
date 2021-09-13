(function (root, factory) {
    if (typeof define === 'function' & define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Глобальные переменные. root это windows
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {

    const BASE = 'USD';

    class Currency {

        static response = {};

        constructor(key) {
            if (typeof key != 'string') {
                throw new Error("API key must be string");
            }
            this.key = key;
        }


        load(baseCurrency = null) {
            const key = this.key;
            const url = `https://api.currencyfreaks.com/latest?apikey=${key}`;

            if (sessionStorage.getItem(url) !== null) {
                return new Promise((resolve, reject) => {
                    resolve(JSON.parse(sessionStorage.getItem(url)));
                })
            }


            return Currency
                .send(url).then((response) => {
                    sessionStorage.setItem(url, JSON.stringify(response));
                    return response;
                });
        }

        static send(url) {
            async function fn(url = '') {

                //https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
                const response = await fetch(url, {
                    method: 'GET',
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer',
                });
                return await response.json();
            }

            return fn(url).then((response) => {
                Currency.response[url] = response;
                return response;
            });
        }

        static hasSaveResponse(url) {
            if (Currency.response.length === 0) {
                return false;
            }
            return Currency.response.hasOwnProperty(url);
        }

        static getSaveResponse(url) {
            return Currency.response[url];
        }

        static getListOfSymbols(url) {

            if (Currency.hasSaveResponse(url)) {
                return new Promise((resolve, reject) => {
                    resolve(Currency.getSaveResponse(url));
                });
            }

            return Currency.send(url);
        }

        static convert(currency1, currency2, value, response){
            console.log(response);
            if (currency1 !== BASE) {
                let z = value * response.rates[currency1];
                return Math.ceil((z / response.rates[currency2]) * 100) / 100; // Делим на курс и округляем до сотых
            }
            return Math.ceil((value * response.rates[currency2]) * 100) / 100; // Умножаем на курс и округляем до сотых
        }


    }

    return Currency;
}));