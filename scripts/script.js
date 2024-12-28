window.addEventListener('resize', function() {
  if (window.innerWidth >= 425) {
      document.querySelector('.dropdown-menu').classList.remove('show');
  }
});

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