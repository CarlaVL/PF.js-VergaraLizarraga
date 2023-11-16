// Definición de productos
const productos = [
    { id: "Banana", nombre: 'Banana', precio: 50, stock: 10 },
    { id: "Manzana", nombre: 'Manzana', precio: 30, stock: 15 },
    { id: "Pera", nombre: 'Pera', precio: 80, stock: 10 },
    { id: "Uvas", nombre: 'Uvas', precio: 150, stock: 7 },
    { id: "Naranja", nombre: 'Naranja', precio: 120, stock: 36 },
    { id: "Kiwi", nombre: 'Kiwi', precio: 200, stock: 4 },
    { id: "Frutilla", nombre: 'Frutilla', precio: 90, stock: 23 },
  ];

  // Carrito de compras
  const carritoDeCompras = [];

  // Función para agregar una cantidad específica de un producto al carrito
  const agregarCantidadAlCarrito = (carrito, producto, cantidad) => {
    if (producto.stock >= cantidad) {
      for (let i = 0; i < cantidad; i++) {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
        producto.stock--;
      }
      console.log(`Se han agregado ${cantidad} unidades de ${producto.nombre} al carrito.`);
    } else {
      console.log(`No hay suficiente stock disponible para agregar ${cantidad} unidades de ${producto.nombre}.`);
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

  // Bucle para agregar productos al carrito
  let agregarMasProductos = true;
  while (agregarMasProductos) {
    // Preguntar al usuario qué producto agregar al carrito
    const productoSeleccionadoId = prompt('Ingrese el ID del producto que desea agregar al carrito (o escriba "salir" para terminar):');

    // Verificar si el usuario desea salir del bucle
    if (productoSeleccionadoId.toLowerCase() === 'salir') {
      agregarMasProductos = false;
    } else {
      // Buscar el producto seleccionado
      const productoSeleccionado = productos.find(producto => producto.id == productoSeleccionadoId);

      // Verificar si el producto existe
      if (productoSeleccionado) {
        // Preguntar al usuario cuántas unidades agregar al carrito
        const cantidadSeleccionada = parseInt(prompt(`Ingrese la cantidad de ${productoSeleccionado.nombre} que desea agregar al carrito:`), 10);

        // Verificar si la cantidad ingresada es válida
        if (!isNaN(cantidadSeleccionada) && cantidadSeleccionada > 0) {
          agregarCantidadAlCarrito(carritoDeCompras, productoSeleccionado, cantidadSeleccionada);
          // Mostrar carrito y stock después de agregar cada producto
          mostrarCarrito(carritoDeCompras);
          mostrarTotalStock(productos);
        } else {
          console.log('La cantidad ingresada no es válida.');
        }
      } else {
        console.log('Producto no encontrado.');
      }
    }
  }

  // Mostrar carrito y stock después de salir del bucle
  console.log('Carrito final:');
  mostrarCarrito(carritoDeCompras);
  mostrarTotalStock(productos);
