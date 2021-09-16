import './bootstrap';


window.addEventListener("DOMContentLoaded", () => {
    (function () {
        const table = document.getElementById('side-table');


        const info = new window.sideTableInfo(table,
            {
                model: 'User',
                apiHandler: (request) => {
                    console.log(request);
                    return {
                        status: 'ok',
                        data: [
                            {
                                title: 'Testing value',
                                value: 'hello world',
                                type: 'text',
                                name: 'outer_name',
                            },
                            {
                                title: 'Testing value2',
                                value: 'hello world2',
                                type: 'input',
                                name: 'outer_name',
                            },
                            {
                                title: 'Testing value3',
                                value: 'hello world3',
                                type: 'tag',
                                name: 'outer_name',
                            }
                        ],
                    }
                }
            });

        console.log(info);
    })();
});