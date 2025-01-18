document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.querySelector('.items');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<tr><td colspan="4">El carrito está vacío.</td></tr>';
    } else {
      carrito.forEach((producto) => {
        const productoHTML = `
          <tr data-id="${producto.id}">
            <td class="nombre">${producto.nombre}</td>
            <td class="cantidad">${producto.cantidad}</td>
            <td class="precio">$ ${producto.precio}</td>
            <td><button class="eliminar" data-id="${producto.id}">Eliminar</button></td>
          </tr>
        `;
        carritoContainer.innerHTML += productoHTML;
      });

      // Agregar evento de clic a los botones "Eliminar"
      const botonesEliminar = document.querySelectorAll('.eliminar');
      botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
          const productoId = event.target.getAttribute('data-id');
          eliminarDelCarrito(productoId);
        });
      });
    }
  });

  const eliminarDelCarrito = (productoId) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
  };