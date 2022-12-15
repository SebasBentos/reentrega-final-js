// Pruductos//
const productos = [
    //Buzos//
    {
        id: "buzo-01",
        titulo: "Buzo 01",
        imagen: "./imgenes/buzos/3c8316fa-c5e0-4103-8e0e-5797e3252359.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 5000

    },
    {
        id: "buzo-02",
        titulo: "Buzo 02",
        imagen: "./imgenes/buzos/441990f3-c796-466b-9871-a2bfe3e82fed.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 5000

    },
    {
        id: "buzo-03",
        titulo: "Buzo 03",
        imagen: "./imgenes/buzos/58a24a0c-168d-4fdf-b146-0a2781597dba.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 5000

    },
    {
        id: "buzo-04",
        titulo: "Buzo 04",
        imagen: "./imgenes/buzos/bd42e204-fe79-427c-a9fd-281496215354.jpg",
        categoria: {
            nombre: "Buzos",
            id: "buzos"
        },
        precio: 5000

    },
    //pantalones//
    {
        id: "pantalones-01",
        titulo: "Pantalones 01",
        imagen: "./imgenes/pantalon/08afa767-aa25-4f05-8c45-e6a43c144212.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 3000
    },
    {
        id: "pantalones-02",
        titulo: "Pantalones 02",
        imagen: "./imgenes/pantalon/94e2d63e-c432-41c5-871b-cb810c175849.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 3000
    },
    {
        id: "pantalones-03",
        titulo: "Pantalones 03",
        imagen: "./imgenes/pantalon/bcc4f64f-39b1-4cd2-8cc3-1cbb443001b6.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 3000
    },
    //Gorras//
    {
        id: "gorras-01",
        titulos: "Gorras 01",
        imagen: "./imgenes/gorras/Gorra-F1-Max-Vertapen.jpg",
        categoria: {
            nombre: "Gorras",
            id: "gorras",
        },
        precio: 1500
    },
    {
        id: "gorras-02",
        titulos: "Gorras 02",
        imagen: "./imgenes/gorras/gorra-puma-mercedes-amg-petronas-f1-gris-640040023167002-1.jpg",
        categoria: {
            nombre: "Gorras",
            id: "gorras",
        },
        precio: 1500
    },
    {
        id: "gorras-03",
        titulos: "Gorras 03",
        imagen: "./imgenes/gorras/McLaren-F1-3.jpg",
        categoria: {
            nombre: "Gorras",
            id: "gorras",
        },
        precio: 1500
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="productos-detalles">
            <h3 class="producto-encabeza">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">agregar</button>
        </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosSeleccionado = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosSeleccionado);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }


    })
});

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click",agregarAlCarrito);
    });
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton =e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);   

    if(productosEnCarrito.some(producto =>producto.id === idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad =1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
 let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
 numerito.innerText= nuevoNumerito;
}