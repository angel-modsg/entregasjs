const shopContent = document.getElementById ("shopContent");
const verCarrito = document.getElementById ("verCarrito");
const modalContainer = document.getElementById ("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const respuesta = await fetch ("data.json");
    const data= await respuesta.json();
    data.forEach((product) => {
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
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2200,
            }).showToast();
        
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
    
};
getProducts();



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

