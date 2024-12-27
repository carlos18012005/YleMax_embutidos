// Función para redirigir al producto haciendo scroll hacia el producto
function irAProducto(productoId) {
    // Usamos `querySelector` para obtener el primer elemento que coincida con la clase
    const producto = document.querySelector(`.producto-${productoId}`);

    // Si el producto existe, hacemos scroll hacia él
    if (producto) {
        producto.scrollIntoView({
            behavior: 'smooth',  // Desplazamiento suave
            block: 'start'       // Alinear al inicio del elemento
        });
    }
}


let carrito = [];

// Lista de productos (puedes personalizarlos o agregar más)
let productos = [
    { id: 1, nombre: "Salami 2 Lb", precio: 160.00 },
    { id: 2, nombre: "Salami 3.5 Lb", precio: 300.00 },
    { id: 3, nombre: "Salami de res 2 Lb", precio: 300.00 },
    { id: 4, nombre: "Jamoneta 2 Lb", precio: 275.00 },
    { id: 5, nombre: "Jamonada 2 Lb", precio: 175.00 },
    { id: 6, nombre: "Salami grano de toro", precio: 215.00 },
    { id: 7, nombre: "Salchichas 8/1", precio: 125.00 },
    { id: 8, nombre: "Longaniza Ranchera 1 Lb", precio: 115.00 },
    { id: 9, nombre: "Longaniza Casera 1 Lb", precio: 150.00 },
    { id: 10, nombre: "Jamón de 5 libras", precio: 495.00 }
];

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    // Encontrar el producto correspondiente por su ID
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        carrito.push(producto);  // Agregar el producto al carrito
        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        // Mostrar el carrito actualizado
        mostrarCarrito();
    }
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    listaCarrito.innerHTML = "";  // Limpiar la lista antes de agregar los productos

    // Calcular el total
    let total = 0;

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(li);
        total += producto.precio;  // Acumulamos el precio
    });

    // Mostrar el total en el carrito
    totalCarrito.textContent = total.toFixed(2);
}

// Función para cargar el carrito desde localStorage cuando la página se carga
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];  // Vaciar el carrito
    localStorage.removeItem('carrito');  // Eliminar el carrito del localStorage
    mostrarCarrito();  // Actualizar la vista del carrito
}

// Función para simular la compra (vacía el carrito después de la compra)
function comprarCarrito() {
    if (carrito.length > 0) {
        alert("¡Gracias por tu compra!");
        vaciarCarrito();  // Vaciar el carrito después de la compra
    } else {
        alert("El carrito está vacío.");
    }
}

// Cargar el carrito al cargar la página
window.onload = cargarCarrito;

// Función para alternar entre modo claro y modo oscuro
function cambiarModo() {
    const body = document.body;
    const boton = document.getElementById('toggleButton');

    // Si el cuerpo tiene la clase "modo-oscuro", cambiar a modo claro
    if (body.classList.contains('modo-oscuro')) {
        body.classList.remove('modo-oscuro');
        boton.textContent = "Cambiar a Modo Oscuro";  // Actualizar el texto del botón
    } else {
        body.classList.add('modo-oscuro');
        boton.textContent = "Cambiar a Modo Claro";  // Actualizar el texto del botón
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(productId) {
    const producto = productos[productId - 1]; // Obtener el producto de la lista de productos
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener el carrito del localStorage

    // Comprobar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si el producto ya existe, incrementar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no existe, agregarlo al carrito
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito(); // Actualizar el carrito en la interfaz
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    
    listaCarrito.innerHTML = "";  // Limpiar la lista del carrito
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total.toFixed(2);  // Mostrar el total
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();  // Actualizar el carrito en la interfaz
}

// Función para comprar los productos en el carrito
function comprarCarrito() {
    // Muestra un mensaje de confirmación
    const confirmar = confirm("¿Deseas confirmar tu compra?");

    if (confirmar) {
        // Redirige a la página del formulario
        window.location.href = "formulario.html"; // Cambia "formulario.html" por la URL o ruta de tu formulario
    } else {
        alert("La compra ha sido cancelada.");
    }
}



