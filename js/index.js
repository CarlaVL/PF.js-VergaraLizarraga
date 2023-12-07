document.addEventListener('DOMContentLoaded', async function () {
  // Lista de productos cargados de forma asíncrona
  const productos = await cargarProductos();

  // Carrito de compras
  let carritoDeCompras = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

  // Función para cargar productos de forma asíncrona
  async function cargarProductos() {
    // Simulación de una carga asíncrona (puedes reemplazar esto con una llamada a una API)
    return new Promise((resolve) => {
      setTimeout(() => {
        const productos = [
    { id: 'Banana', nombre: 'Banana', precio: 50, imagen:'https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_1280.jpg' },
    { id: 'Manzana', nombre: 'Manzana', precio: 30, imagen: 'https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg' },
    { id: 'Pera', nombre: 'Pera', precio: 80, imagen: 'https://cdn.pixabay.com/photo/2010/12/13/10/06/food-2280_1280.jpg' },
    { id: 'Uvas', nombre: 'Uvas', precio: 150, imagen: 'https://cdn.pixabay.com/photo/2017/03/17/12/53/grapes-2151467_1280.jpg' },
    { id: 'Naranja', nombre: 'Naranja', precio: 120, imagen:'https://cdn.pixabay.com/photo/2014/08/26/15/25/oranges-428072_1280.jpg' },
    { id: 'Kiwi', nombre: 'Kiwi', precio: 200, imagen: 'https://cdn.pixabay.com/photo/2014/07/23/11/51/kiwifruit-400143_1280.jpg'},
    { id: 'Frutilla', nombre: 'Frutilla', precio: 90, imagen: 'https://cdn.pixabay.com/photo/2014/02/23/11/11/strawberries-272812_1280.jpg' }
  ];
  resolve(productos);
}, 1000); // Simula una demora de 1 segundo
});
}
// Función para agregar un producto al carrito
const agregarAlCarrito = (id) => {
  const cantidadInput = document.getElementById(`cantidad${id}`);
  const cantidad = parseInt(cantidadInput.value, 10);

  // Validar que la cantidad sea un número positivo
  if (!isNaN(cantidad) && cantidad > 0) {
    const productoExistente = carritoDeCompras.find(producto => producto.id === id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, actualizar cantidad
      productoExistente.cantidad += cantidad;
    } else {
      // Si no está en el carrito, lo añadimos con su cantidad
      const producto = productos.find(p => p.id === id);
      carritoDeCompras.push({ id, nombre: producto.nombre, precio: producto.precio, cantidad, imagen: producto.imagen });
    }

    // Actualizar localStorage
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));

    actualizarCarrito();
  } else {
    alert('Ingrese una cantidad válida (mayor a 0).');
  }
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (id) => {
  carritoDeCompras = carritoDeCompras.filter(producto => producto.id !== id);
  localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
  actualizarCarrito();
};

// Función para actualizar el carrito en el DOM
const actualizarCarrito = () => {
  const listaCarrito = document.getElementById('listaCarrito');
  const cantidadTotalElement = document.getElementById('cantidadTotal');
  const precioTotalElement = document.getElementById('precioTotal');

  // Limpiar contenido del carrito
  listaCarrito.innerHTML = '';

  let totalProductos = 0;
  let totalPrecio = 0;

  carritoDeCompras.forEach(producto => {
    const itemCarrito = document.createElement('li');

    // Agregar imagen, nombre, precio y cantidad del producto
    const imagenProducto = document.createElement('img');
    imagenProducto.src = producto.imagen;
    imagenProducto.alt = producto.nombre;
    imagenProducto.style.width = '50px';
    imagenProducto.style.height = '50px';
    imagenProducto.style.borderRadius = '50%';
    imagenProducto.style.marginRight = '10px';
    itemCarrito.appendChild(imagenProducto);

    const nombrePrecio = document.createElement('div');
    nombrePrecio.textContent = `${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`;
    itemCarrito.appendChild(nombrePrecio);

    // Agregar botón para eliminar producto
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar del carrito';
    botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto.id));
    itemCarrito.appendChild(botonEliminar);

    listaCarrito.appendChild(itemCarrito);

    totalProductos += producto.cantidad;
    totalPrecio += producto.precio * producto.cantidad;
  });

  const cantidadTotal = `Cantidad total de productos en el carrito: ${totalProductos}`;
  const precioTotal = `Precio total del carrito: $${totalPrecio.toFixed(2)}`;

  cantidadTotalElement.textContent = cantidadTotal;
  precioTotalElement.textContent = precioTotal;
};

// Función para confirmar el pedido con SweetAlert y promesas
const confirmarPedido = () => {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¿Confirmar pedido?',
      text: 'Estás a punto de confirmar tu pedido. ¿Deseas continuar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecuta la lógica para confirmar el pedido
        Swal.fire('¡Pedido confirmado!', 'Gracias por tu compra.', 'success');
        resolve();
      }
    });
  });
};

// eventos con addEventListener para cada producto
const listaProductos = document.getElementById('listaProductos');
productos.forEach(producto => {
  const listItem = document.createElement('li');

  // Agregar imagen, nombre y precio del producto
  const imagenProducto = document.createElement('img');
  imagenProducto.src = producto.imagen;
  imagenProducto.alt = producto.nombre;
  imagenProducto.style.width = '50px';
  imagenProducto.style.height = '50px';
  imagenProducto.style.borderRadius = '50%';
  imagenProducto.style.marginRight = '10px';
  listItem.appendChild(imagenProducto);

  const nombrePrecio = document.createElement('div');
  nombrePrecio.textContent = `${producto.nombre} - $${producto.precio}`;
  listItem.appendChild(nombrePrecio);

  // Agregar input y botón al carrito
  const cantidadInput = document.createElement('input');
  cantidadInput.type = 'number';
  cantidadInput.id = `cantidad${producto.id}`;
  cantidadInput.placeholder = 'Cantidad';

  const agregarCarritoButton = document.createElement('button');
  agregarCarritoButton.id = producto.id;
  agregarCarritoButton.textContent = 'Agregar al carrito';
  listItem.appendChild(cantidadInput);
  listItem.appendChild(agregarCarritoButton);

  listaProductos.appendChild(listItem);

  // evento botón de agregar al carrito
  agregarCarritoButton.addEventListener('click', () => agregarAlCarrito(producto.id));
});

// Agregar evento para el botón de confirmar pedido
document.getElementById('confirmarPedido').addEventListener('click', async () => {
  await confirmarPedido();
  // Limpia el carrito después de confirmar el pedido
  carritoDeCompras = [];
  localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
  actualizarCarrito();
});

});