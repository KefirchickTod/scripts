let fruits = [
    {
        id: 1,
        title: "Apple",
        price: 20,
        img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
    },
    {
        id: 2,
        title: "Orange",
        price: 40,
        img: "https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG9yYW5nZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
        id: 3,
        title: "Mango",
        price: 50,
        img: "https://img.freepik.com/free-photo/ripe-mango-with-green-leaf-isolated-on-white_252965-183.jpg?size=626&ext=jpg"
    }
]

const toHTML = fruit => `
 <div class="col">
            <div class="card">
                <img class="card-img-top" style="height: 300px"
                     src="${fruit.img}" alt="${fruit.title}"/>
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                </div>
                <div class="card-body">
                    <a href="#" class="card-link btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
                    <a href="#" class="card-link btn btn-danger" data-btn="delete" data-id="${fruit.id}">Delete</a>
                </div>
            </div>
        </div>`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruints').innerHTML = html;
}

render()

const priceModal = $.modal({
    title: 'Item price',
    closable: true,
    width: '500px',
    footerButtons: [
        {
            text: 'Close', type: 'primary', handler() {
                priceModal.close()
            }
        },
    ]
});


document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);
    if (btnType === 'price') {

        priceModal.setContent(`
        <p>Price for ${fruit.title}: <strong>${fruit.price}$</strong> </p>   
        `)
        priceModal.open();
    } else if (btnType === 'delete') {
        $.confirm({
            title: 'Are you sure?',
            content: `
            <p>Do you really want to delete : <strong>${fruit.title}</strong> </p>
            `
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render();
        }).catch(() => {
            console.log('cancel')
        })
    }
})

