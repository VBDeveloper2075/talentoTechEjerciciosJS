// Contador del Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = []; // Array de productos global

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito){
        const total = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        contadorCarrito.textContent = total;
    }
}
actualizarContadorCarrito();

// Gestion de Productos
const productosContainer = document.getElementById("productosContainer");

// function para cargar los productos desde el archivo json
async function cargarProductos() {
    try {
        const respuesta = await fetch("./scripts/script.json");
        if (!respuesta.ok) {
            throw new Error("Error al cargar los productos");
        }
        productos = await respuesta.json(); // Asignar productos al ámbito global
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error:", error);
        productosContainer.innerHTML = "<p>Error al cargar productos.</p>";
    }
}

// Función para mostrar los productos en el HTML
function mostrarProductos(productos) {

    productos.forEach(producto => {
        productosContainer.innerHTML += `
          <div class="persona" data-id="${producto.id}">
            <img src="css/assets/${producto.imagen}" alt="${producto.nombre}"> 
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button class="agregar" data-id="${producto.id}">Agregar al Carrito</button>
          </div>
        `;
    });
}

// Escucho todos los eventos click en el documento
document.addEventListener("click", (event) => {
    // Si el elemento donde se hizo click contiene la clase 'agregar'
    if (event.target.classList.contains("agregar")) {
        // Busco el contenedor más cercano que sea un 'div' con la clase 'persona'
        const id = event.target.closest(".persona").dataset.id;

        // Busco el elemento 'producto' dentro del array productos que tenga el 'id'
        const elemento = productos.find((producto) => producto.id == id);
        console.log(elemento);

        // Uso destructuring para crear las constantes con los valores del Objeto
        const { productoId, nombre, precio } = elemento;

        // Llamo a la función agregarAlCarrito con los parámetros correctos
        agregarAlCarrito(productoId, nombre, precio);
    }
});

// Function para agregar producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = carrito.find(producto => producto.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({id, nombre, precio, cantidad: 1});
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`${nombre} agregado al carrito`);
}

agregarAlCarrito();