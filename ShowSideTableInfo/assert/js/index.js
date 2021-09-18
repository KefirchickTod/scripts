import './bootstrap';


window.addEventListener("DOMContentLoaded", () => {
    (function () {
        const table = document.getElementById('side-table');


        console.log(window.sideTableInfo);

        const info = new window.sideTableInfo(table,
            {
                model: 'User',
                apiHandler: (request) => {
                    const id = Math.random();
                    console.log(request);
                    return {
                        status: 'ok',
                        data: [
                            {
                                title: `Id : ${id} Testing value`,
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
                },
                listener: 'updateTable'
            });


        // table.dispatchEvent(new Event('updateTable', {bubbles: true,}));

        console.log(info);
    })();
});