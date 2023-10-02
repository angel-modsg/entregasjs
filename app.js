const shopContent = document.getElementById ("shopContent");
const verCarrito = document.getElementById ("verCarrito");
const modalContainer = document.getElementById ("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");
const productos = [
    { id: 1, nombre: "Vacio", precio: 3500, img:"./img/img-vacio.png", cantidad:1},
    { id: 2, nombre: "Tira", precio: 3600, img: "./img/img-costilla.png", cantidad:1},
    { id: 3, nombre: "Chorizo", precio: 2800, img: "./img/img-chori.png", cantidad:1 },
    { id: 4, nombre: "Matambre", precio: 3000, img: "./img/img-matambre.png", cantidad:1 },
    { id: 5, nombre: "Molleja", precio: 4000, img: "./img/img-molleja.png", cantidad:1 },
    { id: 6, nombre: "Chinchulines", precio: 2200, img: "./img/img-chinchu.png", cantidad:1 },
    { id: 7, nombre: "Morcilla", precio: 2000, img: "./img/img-morcilla.png", cantidad:1 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement ("div");
    content.className = "card";
    content.innerHTML = `
    <img src = "${product.img}">
    <h3>${product.nombre}</h3>
    <p class="precio">$${product.precio}</p>
    `;
shopContent.append(content);

let botonComprar = document.createElement("button")
botonComprar.innerText = "Comprar";
content.append(botonComprar);
botonComprar.className = "comprar"

botonComprar.addEventListener("click", () => {
const repeat = carrito.some ((repeatProduct) => repeatProduct.id === product.id);
if(repeat){
carrito.map((prod) => {
    if(prod.id === product.id){
        prod.cantidad++;
    }
});
}else {

    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
    });
}
carritoCounter();
saveLocal();

});
});
const armarCarrito = () => {
    modalContainer.innerHTML= ``;
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement ("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML= `
    <h1 class="modal-header-title">Carrito..</h1>
 `;
 modalContainer.append(modalHeader);

 const modalbutton = document.createElement ("h1");
 modalbutton.innerText = "Salir";
 modalbutton.className = "modal-header-button";

 modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
 })

 modalHeader.append(modalbutton);

 carrito.forEach ((product) => {
    let carritoContent = document.createElement ("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src = "${product.img}">
        <h3>${product.nombre}</h3>
        <p>$${product.precio}</p>
        <span class = "restar"> ➖ </span>
        <p>Cantidad: ${product.cantidad} Kg</p>
        <span class = "sumar"> ➕ </span>
        <p>Total: $${product.cantidad * product.precio} </p>
    `;



    modalContainer.append (carritoContent);

    let restar = carritoContent.querySelector(".restar")
    restar.addEventListener("click",() =>{
        if(product.cantidad !==1){
        product.cantidad--;
        }
        saveLocal();
        armarCarrito();
    });
    let sumar = carritoContent.querySelector(".sumar")
    sumar.addEventListener ("click", ()=>{
        product.cantidad++;
        saveLocal();
        armarCarrito();

    });



    
    let eliminar = document.createElement ("span");
    eliminar.innerText = "Eliminar Producto";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener ("click", eliminarProducto );
});



const total = carrito.reduce ((acc,el) => acc + el.precio*el.cantidad, 0 );
const totalBuying = document.createElement ("div");
totalBuying.className = "total-content";
totalBuying.innerHTML = `Total a pagar: $${total}`;
modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", armarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find ((element) => element.id);
    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId;
    });
carritoCounter();
saveLocal();
armarCarrito();

};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));


}


const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));
carritoCounter();

