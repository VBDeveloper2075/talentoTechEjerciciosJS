fetch('./scripts/script.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    mostrarProductos(data); 
  })
  .catch(error => {
    console.error('Hubo un error al obtener los productos:', error);
  });

  const crearHTML = (item) => {
    const html = `
      <article data-id="${item.id}">
        <h3>${item.nombre}</h3> 
        <img src="${item.imagen}" width="200" alt="${item.nombre}"> 
        <p>${item.descripcion}</p> 
        <p>$ ${item.precio}</p>
        <button type="button">Agregar</button> 
      </article>
    `;
    return html;
  };

  const mostrarProductos = (productos) => {
    const contenedor = document.getElementById('contenedor-productos'); 
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