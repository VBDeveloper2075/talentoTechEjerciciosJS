window.addEventListener('resize', function() {
  if (window.innerWidth >= 425) {
    document.querySelector('.dropdown-menu').classList.remove('show');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  menuBtn.addEventListener('click', function() {
    dropdownMenu.classList.toggle('show');
  });
});

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
        <p>Precio: $ ${producto.precio}</p>
        <button type="button" class="agregar" data-id="${producto.id}">Agregar al Carrito</button>
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