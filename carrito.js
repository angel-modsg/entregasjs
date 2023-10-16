const armarCarrito = ("click", () => {
    modalContainer.innerHTML= ``;
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement ("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML= `
    <h1 class="modal-header-title">Éste es tu carrito de compras<h1>
 `;
 modalContainer.append(modalHeader);

const modalbutton = document.createElement ("h1");
modalbutton.innerText = "❌";
modalbutton.className = "modal-header-button";
modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";

 });
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
    eliminar.addEventListener ("click", (eliminarProducto) );
    eliminar.addEventListener ("click", () => {
         Swal.fire({
                icon: 'error',
                title: `Eliminaste ${product.cantidad} kg. de ${product.nombre}`
             })
    });   
});
const total = carrito.reduce ((acc,el) => acc + el.precio*el.cantidad, 0 );
const totalBuying = document.createElement ("div");
totalBuying.className = "total-content";
totalBuying.innerHTML= `
    <h1 class= modal-header-title!> Total a pagar: $${total}</h1>
 `;
 let pagartodo = document.createElement ("span");
 pagartodo.innerText = "Finalizar compra";
 pagartodo.className = "total-content-button";
 pagartodo.addEventListener ("click", () => {
    Swal.fire('Tu número de orden es 01-132435 para que abones')

 })

modalContainer.append(totalBuying);
modalContainer.append(pagartodo);







});