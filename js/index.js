document.addEventListener('DOMContentLoaded', function () {
  // Lista de productos
  const productos = [
    { id: 'Banana', nombre: 'Banana', precio: 50, imagen:'https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_1280.jpg' },
    { id: 'Manzana', nombre: 'Manzana', precio: 30, imagen: 'https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg' },
    { id: 'Pera', nombre: 'Pera', precio: 80, imagen: 'https://cdn.pixabay.com/photo/2010/12/13/10/06/food-2280_1280.jpg' },
    { id: 'Uvas', nombre: 'Uvas', precio: 150, imagen: 'https://cdn.pixabay.com/photo/2017/03/17/12/53/grapes-2151467_1280.jpg' },
    { id: 'Naranja', nombre: 'Naranja', precio: 120, imagen:'https://cdn.pixabay.com/photo/2014/08/26/15/25/oranges-428072_1280.jpg' },
    { id: 'Kiwi', nombre: 'Kiwi', precio: 200, imagen: 'https://cdn.pixabay.com/photo/2014/07/23/11/51/kiwifruit-400143_1280.jpg'},
    { id: 'Frutilla', nombre: 'Frutilla', precio: 90, imagen: 'https://cdn.pixabay.com/photo/2014/02/23/11/11/strawberries-272812_1280.jpg' }
  ];
 // Carrito de compras
 let carritoDeCompras = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

 // Función para agregar un producto al carrito
 const agregarAlCarrito = (id) => {
   const cantidadInput = document.getElementById(`cantidad${id}`);
   const cantidad = parseInt(cantidadInput.value, 10);

   // Validar número positivo
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

 // Función actualizar carrito DOM
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
     const imagen = document.createElement('img');
     imagen.src = producto.imagen;
     imagen.style.width = '50px';
     imagen.style.height = '50px';
     imagen.style.borderRadius = '50%';
     imagen.style.marginRight = '10px';
     itemCarrito.appendChild(imagen);

     itemCarrito.innerHTML += `${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`;
     listaCarrito.appendChild(itemCarrito);

     totalProductos += producto.cantidad;
     totalPrecio += producto.precio * producto.cantidad;
   });

   const cantidadTotal = `Cantidad total de productos en el carrito: ${totalProductos}`;
   const precioTotal = `Precio total del carrito: $${totalPrecio.toFixed(2)}`;

   cantidadTotalElement.textContent = cantidadTotal;
   precioTotalElement.textContent = precioTotal;
 };

 const confirmarPedido = () => {
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

      // Limpia el carrito después de confirmar el pedido
      carritoDeCompras = [];
      localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
      actualizarCarrito();
    }
  });
};

 // eventos con addEventListener para cada producto
 const listaProductos = document.getElementById('listaProductos');
 productos.forEach(producto => {
   const listItem = document.createElement('li');
   listItem.innerHTML = `
     <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
     ${producto.nombre} - $${producto.precio}
     <input type="number" id="cantidad${producto.id}" placeholder="Cantidad">
     <button id="${producto.id}">Agregar al carrito</button>
     <button id="${producto.id}" class="eliminarProducto">Eliminar del carrito</button>
   </li>`;
   listaProductos.appendChild(listItem);

   // evento botón de agregar al carrito
   document.getElementById(producto.id).addEventListener('click', () => agregarAlCarrito(producto.id));
 });

 // Agregar evento para el botón de confirmar pedido
 document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);

 // Agregar evento para los botones de eliminar producto
 document.querySelectorAll('.eliminarProducto').forEach(button => {
   button.addEventListener('click', (event) => eliminarDelCarrito(event.target.id));
 });

 function eliminarDelCarrito(id) {
   carritoDeCompras = carritoDeCompras.filter(producto => producto.id !== id);
   localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
   actualizarCarrito();
 }
});