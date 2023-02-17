const stockProductos = [
    {
        id: 1,
        nombre: "Monitor Dell",
        cantidad: 1,
        desc: "Dell P2722H - Monitor LED - 27in",
        precio: 200,
        img: "img/dell.jpg",
    },
    {
        id: 2,
        nombre: "TV Samsung",
        cantidad: 1,
        desc: "55in TV Smart 4K ULTRA HD serie AU7000",
        precio: 1500,
        img: "img/samsung.jpg",
    },
    {
        id: 3,
        nombre: "Dell OptiPlex 7080",
        cantidad: 1,
        desc: "Micro - Core i5 10500T/2.3 GHz/HDD 1 TB",
        precio: 900,
        img: "img/optiplex.jpg",
    },
    {
        id: 4,
        nombre: "HP ProDesk",
        cantidad: 1,
        desc: "ProDesk 400 G7-SFF - Core i5 10500/3.1 GHz",
        precio: 850,
        img: "img/prodesk.jpg",
    },
    {
        id: 5,
        nombre: "Proyector ViewSonic",
        cantidad: 1,
        desc: "ViewSonic M1 Mini Plus - DLP - LED - 120 lúmenes",
        precio: 1500,
        img: "img/viewsonic.jpg",
    },
    {
        id: 6,
        nombre: "Ipad Apple",
        cantidad: 1,
        desc: "Tableta 10.2-inch Wi-Fi - 8ª generación - 32 GB",
        precio: 2100,
        img: "img/ipad.jpg",
    },
    {
        id: 7,
        nombre: "Lenovo Tab M10",
        cantidad: 1,
        desc: "Tableta M10 HD (2nd Gen) ZA6W - Android 10",
        precio: 400,
        img: "img/lenovo.jpg",
    },
    {
        id: 8,
        nombre: "Dell Inspiron 3501",
        cantidad: 1,
        desc: "Intel Core i5 - Win 10 - 8 GB RAM - 256 GB SSD",
        precio: 1100,
        img: "img/dellportatil.jpg",
    },
    {
        id: 9,
        nombre: "Apple MacBook Pro",
        cantidad: 1,
        desc: "Intel Core i7 2.6 GHz - 16 GB RAM - 512 GB SSD",
        precio: 2900,
        img: "img/macbook.jpg",
    },
    {
        id: 10,
        nombre: "Teclado HyperX",
        cantidad: 1,
        desc: "Alloy Origins - retroiluminación - USB",
        precio: 100,
        img: "img/teclado.jpg",
    },
]; 

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#procesarCompra");

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito()
})

stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src="${img}" class="card-img-top mt-2" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripcion: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
    <button onclick="agregarProducto(${id})" class="btn btn-primary">Agregar al Carrito</a>
  </div>
</div>
    `
})

procesarCompra.addEventListener("click" , () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "¡El carrito está vacio!",
      text: "Compra algo para continuar con la compra",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  }
      else {
        location.href = "index.html"
    }
  })

vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });



function agregarProducto(id){

    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }

    mostrarCarrito()
}

const mostrarCarrito = () => {
    const modalBody = document.querySelector(` .modal .modal-body`)
    
    modalBody.innerHTML = ""
    carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        `
    })

    if (carrito.length === 0) {
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">Agrega un articulo</p>
        `;
      } else {
        console.log("Hay productos");
      }

    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.textContent = carrito.reduce( (acc, prod) => acc + prod.cantidad * prod.precio, 0 );
      }

    guardarStorage();
}

function eliminarProducto(id) {
    const productId = id;
    carrito = carrito.filter((product) => product.id !== productId);
    mostrarCarrito();
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
