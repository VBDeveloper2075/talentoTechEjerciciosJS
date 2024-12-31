let producto= fetch('./scripts/script.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    mostrarProductos(data); 
  })
  .catch(error => {
    console.error('Hubo un error al obtener los productos:', error);
  });

  const crearHTML = (producto) => {
    const html = `
      <article data-id="${producto.id}">
        <h3>${producto.nombre}</h3> 
        <img src="${producto.imagen}" width="200" alt="${producto.nombre}"> 
        <p>${producto.descripcion}</p> 
        <p>$ ${producto.precio}</p>
        <button type="button" class="agregar" onclick="mostrarCarrito()">Agregar</button>
      </article>
    `;
    return html;
  };

  const mostrarProductos = (productos) => {
    const contenedor = document.getElementById('productosContainer'); 
    if (contenedor) {
      contenedor.innerHTML = ''; 
      productos.forEach((producto) => {
        const productoHTML = crearHTML(producto);
        contenedor.innerHTML += productoHTML;
      });
    }
  };

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const contadorCarrito = document.getElementById("contador-carrito");
  if (contadorCarrito) {
    const total = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.textContent = total;
  }
}

// Inicializar el carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarContadorCarrito();