// Definición de productos
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 20, stock: 10 },
    { id: 2, nombre: 'Producto 2', precio: 30, stock: 15 },
    { id: 3, nombre: 'Producto 3', precio: 25, stock: 8 }
  ];

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (carrito, producto) => {
    if (producto.stock > 0) {
      carrito.push(producto);
      producto.stock--;
      console.log(`Se ha agregado ${producto.nombre} al carrito.`);
    } else {
      console.log(`El producto ${producto.nombre} está agotado.`);
    }
  };

  // Función para calcular el total del carrito
  const calcularTotalCarrito = (carrito) => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
  };

  // Función para calcular el total del stock de la lista de productos
  const calcularTotalStock = (productos) => {
    return productos.reduce((total, producto) => total + producto.stock, 0);
  };

  // Función para mostrar el carrito
  const mostrarCarrito = (carrito) => {
    console.log('Carrito de Compras:');
    carrito.forEach(producto => {
      console.log(`${producto.nombre} - $${producto.precio}`);
    });
    console.log(`Total del carrito: $${calcularTotalCarrito(carrito)}`);
  };

  // Función para mostrar el total del stock de la lista de productos
  const mostrarTotalStock = (productos) => {
    console.log(`Total del stock: ${calcularTotalStock(productos)}`);
  };

  // Mostrar stock inicial
  console.log('Stock Inicial:');
  productos.forEach(producto => {
    console.log(`${producto.nombre} - Stock: ${producto.stock}`);
  });

  // Preguntar al usuario qué producto agregar al carrito
  const productoSeleccionadoId = prompt('Ingrese el ID del producto que desea agregar al carrito:');
  const productoSeleccionado = productos.find(producto => producto.id == productoSeleccionadoId);

  // Verificar si el producto existe
  if (productoSeleccionado) {
    agregarAlCarrito(carritoDeCompras, productoSeleccionado);
  } else {
    console.log('Producto no encontrado.');
  }

  // Mostrar carrito y stock después de agregar el producto
  mostrarCarrito(carritoDeCompras);
  mostrarTotalStock(productos);

