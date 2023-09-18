
const productos = [
    { id: 1, nombre: "Vacio", precio: 3500 },
    { id: 2, nombre: "Tira", precio: 3600 },
    { id: 3, nombre: "Chorizo", precio: 2800 },
    { id: 4, nombre: "Matambre", precio: 3000 },
    { id: 5, nombre: "Molleja", precio: 4000 },
    { id: 6, nombre: "Chinchulines", precio: 2200 },
    { id: 7, nombre: "Morcilla", precio: 2000 },
];
const carritoDeCompras = [];

function mostrarProductos(productos){
    let lista = "";
    alert ("Estos son nuestros productos para tu asado");
    for (const producto of productos){
        lista += `
        ID: ${producto.id}
        NOMBRE: ${producto.nombre}
        PRECIO: ${producto.precio}\n`;
    }
    alert (lista);
}
function agregarAlCarrito(idProducto, cantidad) {
    const productoId = productos.find(producto => producto.id === idProducto);

    if (productoId) {
        const subtotal = productoId.precio * cantidad;
        carritoDeCompras.push({ ...productoId, cantidad, subtotal });
        console.log(`"${productoId.nombre}" (${cantidad} unidades) ha sido agregado al carrito.`);
    } else {
        alert("El ID de producto ingresado no existe. Por favor, corrige el ID.");
    }
}

function continuarComprando() {
    const opcion1 = prompt("¿Deseas continuar comprando? (Sí o No)").toLowerCase();
    return opcion1 === "si";
}

function mostrarCarrito() {
    let mensaje = "Carrito de Compras:\n";
    let total = 0;

    for (const producto of carritoDeCompras) {
        mensaje += `
        ID: ${producto.id}
        NOMBRE: ${producto.nombre}
        CANTIDAD: ${producto.cantidad}
        SUBTOTAL: $${producto.subtotal}\n`;
        total += producto.subtotal;
    }

    mensaje += `\nTOTAL: $${total}`;

    const opcion2 = prompt(`${mensaje}\n\nOpciones:\n1. Finalizar Compra\n2. Vaciar Carrito`);

    switch (opcion2) {
        case "1":
            alert("¡Gracias por tu compra!");
            carritoDeCompras.length = 0; 
            break;
        case "2":
            carritoDeCompras.length = 0; 
            alert("El carrito ha sido vaciado.");
            break;
        default:
            alert("Opción no válida.");
            break;
    }
}

// MUESTRO LA LISTA DE PRODUCTOS DISPONIBLES
mostrarProductos(productos);

// INICIO BUCLE PARA VERIFICAR QUE ID Y CANTIDAD SEAN NUMERO VALIDOS
do {
    const idProductoAgregado = parseInt(prompt("Ingresa el ID del producto que deseas agregar al carrito:"));
    
    let cantidad = 0;
    while (cantidad <= 0) {
        cantidad = parseInt(prompt("Ingresa la cantidad de unidades que deseas comprar:"));
        if (cantidad <= 0) {
            alert("La cantidad debe ser mayor que cero.");
        }
    }

    agregarAlCarrito(idProductoAgregado, cantidad);
} while (continuarComprando());

// MUESTRO EL CARRITO CON OPCIONES DE FINALIZACION Y DE VACIADO
mostrarCarrito();