document.addEventListener('DOMContentLoaded', async function () {
  // Carrito de compras
  let carritoDeCompras = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

  // Función para cargar productos de forma asíncrona usando fetch
  async function cargarProductos() {
    try {
      const response = await fetch('productos.json'); // Ruta al archivo JSON 
      const productos = await response.json();
      return productos;
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      return [];
    }
  }

  // Lista de productos cargados de forma asíncrona
  const productos = await cargarProductos();

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

    // evento botón de agregar al carrito
    agregarCarritoButton.addEventListener('click', () => agregarAlCarrito(producto.id));

    listaProductos.appendChild(listItem);
  });

  // Agregar evento para el botón de confirmar pedido
  document.getElementById('confirmarPedido').addEventListener('click', async () => {
    await confirmarPedido();
    // Limpia el carrito después de confirmar el pedido
    carritoDeCompras = [];
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
    actualizarCarrito();
  });

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
      itemCarrito.textContent = `${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`;
      listaCarrito.appendChild(itemCarrito);

      totalProductos += producto.cantidad;
      totalPrecio += producto.precio * producto.cantidad;
    });

    const cantidadTotal = `Cantidad total de productos en el carrito: ${totalProductos}`;
    const precioTotal = `Precio total del carrito: $${totalPrecio.toFixed(2)}`;

    cantidadTotalElement.textContent = cantidadTotal;
    precioTotalElement.textContent = precioTotal;
  };

});