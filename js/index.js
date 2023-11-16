// Definición de productos
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 20 },
    { id: 2, nombre: 'Producto 2', precio: 30 },
    { id: 3, nombre: 'Producto 3', precio: 25 }
  ];

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (carrito, producto) => {
    carrito.push(producto);
    console.log(`Se ha agregado ${producto.nombre} al carrito.`);
  };

 // Función para calcular el total del carrito
  const calcularTotal = (carrito) => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
  };

  // Función para mostrar el carrito
  const mostrarCarrito = (carrito) => {
    console.log('Carrito de Compras:');
    carrito.forEach(producto => {
      console.log(`${producto.nombre} - $${producto.precio}`);
    });
    console.log(`Total: $${calcularTotal(carrito)}`);
  };