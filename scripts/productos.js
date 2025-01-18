// Contador del Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito){
   const total = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.textContent = total;
    }
}
actualizarContadorCarrito();
// Gestion de Productos
const productosContainer = document.getElementById("productos-container");
// function para cargar los productos desde el archivo json
async function cargarProductos() {
    try {
      const respuesta = await fetch("./scripts/script.json");
      if (!respuesta.ok) {
        throw new Error("Error al cargar los productos");
      }
      const productos = await respuesta.json();
      mostrarProductos(productos);
    } catch (error) {
      console.error("Error:", error);
      productosContainer.innerHTML = "<p>Error al cargar productos.</p>";
    }
  }
// Function para mostrar los productos en el html
function mostrarProductos(productos) {
    if (productos.length === 0) {
        productosContainer.innerHTML = "<p>No hay productos disponibles</p>";
        return;
    }
    productosContainer.innerHTML ="";

    // productos.forEach(producto => {
    //     productosContainer.innerHTML += `
    //       <div class="persona" data-id="${producto.id}">
    //         <img src="css/assets/${producto.imagen}" alt="${producto.nombre}"> 
    //         <h3>${producto.nombre}</h3>
    //         <p>${producto.descripcion}</p>
    //         <p>Precio: ${producto.precio}</p>
    //         <button class="agregar" data-id="${producto.id}">Agregar al Carrito</button>
    //       </div>
    //     `;
    //   });
  }
// Escucho todos los eventos click el documento
document.addEventListener("click", (event) => {
  // Si el elemento donde se hizo click contiene la clase 'agregar'
  if (event.target.classList.contains("agregar")) {
    // Busco el contenedor mas cercano que se un 'article'
    // Obtengo el id del atributo data-id
    const id = event.target.closest("article").dataset.id;

    // Busco el elemento 'producto' dentro del array producto que tenga el 'id'
    const elemento = productos.find((producto) => producto.id == id);
    console.log(elemento);

    // Uso destructuring para creo las constante con los valores del Objeto
    const { nombre, precio } = elemento;

    // Creo el objeto producto para insertar en el carrito
    const producto = {
      id: id,
      nombre: nombre,
      precio: precio,
      cantidad: 1,
    };

    carrito.push(producto);

    // Guardo en el localStorage el array carrito en formato JSON
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});

// Function para agregar producto al carrito (solo una definición)
function agregarAlCarrito(id,nombre,precio) {
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

cargarProductos();

// Agregar evento click a los botones "Agregar al Carrito"
productosContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('agregar')) {
      const id = parseInt(event.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      agregarAlCarrito(producto.id, producto.nombre, producto.precio);
    }
  });