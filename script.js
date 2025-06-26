// Referencias a elementos
// Seleccion de personaje //
const selectServidor = document.getElementById('servidor');
const selectPersonaje = document.getElementById('personaje');
const btnConfirmar = document.getElementById('btn-confirmar');
const btnCambiar = document.getElementById('btn-cambiar-personaje');
const formSeleccion = document.getElementById('form-seleccion');
const resumenPersonaje = document.getElementById('resumen-personaje');
const textoResumen = document.getElementById('texto-resumen');
// DOM
const listaProductos = document.getElementById("lista-productos");
const filtroTipo = document.getElementById("filtro-tipo");
const ordenPrecio = document.getElementById("orden-precio");

function mostrarLoginModal() {
    document.getElementById('login-modal').classList.remove('oculto');
}

function cerrarLoginModal() {
    document.getElementById('login-modal').classList.add('oculto');
}

function procesarLogin() {
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();

    cerrarLoginModal();

    const nombreUsuarioSpan = document.getElementById('nombre-usuario');
    nombreUsuarioSpan.textContent = usuario;
    nombreUsuarioSpan.classList.remove('oculto');

    return false; // Evita refresh de la página
}

// Confirmar personaje
btnConfirmar.addEventListener('click', () => {
    const servidor = selectServidor.value;
    const personaje = selectPersonaje.value;

    if (!servidor || !personaje) {
        alert("❗ Debes seleccionar un servidor y un personaje.");
        return;
    }

    // Mostrar resumen de personaje y ocultar formulario
    textoResumen.textContent = `${servidor.toUpperCase()} : ${personaje}`;
    formSeleccion.classList.add('oculto');
    resumenPersonaje.classList.remove('oculto');
});

// Cambiar personaje
btnCambiar.addEventListener('click', () => {
    formSeleccion.classList.remove('oculto');
    resumenPersonaje.classList.add('oculto');
    // Reinicia selección "Selecciona un.."
    selectServidor.value = "";
    selectPersonaje.value = "";
});

/* Carrusel de ofertas */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carrusel-pista');
  let scrollAmount = 0;
  const speed = 0.3;

  let animationId;

  function scrollCarrusel() {
    scrollAmount += speed;
    if(scrollAmount >= track.scrollWidth / 2) {
      scrollAmount = 0;
    }
    track.style.transform = `translateX(-${scrollAmount}px)`;
    animationId = requestAnimationFrame(scrollCarrusel);
  }

  scrollCarrusel();

// ||||||| //
//CATALOGO //
const productos = [
  {
    id: 1,
    nombre: "Pack de 1000 monedas",
    descripcion: "Recarga rápida de monedas para usar en el juego.",
    tipo: "moneda",
    precio: 0.99,
    imagen: "assets/img/monedas1000.png"
  },
  {
    id: 2,
    nombre: "Set de Armadura legendaria",
    descripcion: "Mejora tu defensa con esta armadura exclusiva.",
    tipo: "pack",
    precio: 14.99,
    imagen: "assets/img/armadura_legendaria.png"
  },
  {
    id: 3,
    nombre: "Marco exclusivo",
    descripcion: "Dale estilo a tu avatar con este marco especial.",
    tipo: "pack",
    precio: 4.99,
    imagen: "assets/img/marco_exclusivo.png"
  },
  {
    id: 4,
    nombre: "Pack de 5000 monedas",
    descripcion: "Mayor cantidad de monedas para gastar en ítems únicos.",
    tipo: "moneda",
    precio: 4.99,
    imagen: "assets/img/monedas5000.png"
  },
  {
    id: 5,
    nombre: "Título especial",
    descripcion: "Destaca en el juego con un título exclusivo que te brinda estadisticas",
    tipo: "pack",
    precio: 9.99,
    imagen: "assets/img/titulo_especial.png"
  },
  {
    id: 6,
    nombre: "Pack de 15000 monedas",
    descripcion: "Gran cantidad de monedas para mejorar a tu personaje rapidamente",
    tipo: "moneda",
    precio: 14.99,
    imagen: "assets/img/monedas15000.png"
  },
  {
    id: 7,
    nombre: "Combo Armadura y Armas",
    descripcion: "Equipate con un conjunto poderoso de set y armas legendarias!",
    tipo: "pack",
    precio: 24.99,
    imagen: "assets/img/armadura_armas.png"
  },
  {
    id: 8,
    nombre: "Anillos legendarios",
    descripcion: "Mejora tu defensa con joyeria de grado legendario",
    tipo: "pack",
    precio: 4.99,
    imagen: "assets/img/anillos.png"
  },
    {
    id: 9,
    nombre: "Pet Ancestral",
    descripcion: "Viaja con tu mascota que te brinda mayor experiencia para subir de nivel",
    tipo: "pack",
    precio: 4.99,
    imagen: "assets/img/pet.png"
  },
];

// Mostrar productos según filtro y orden
function mostrarProductos() {
  // Filtrar por tipo
  let productosFiltrados = productos.filter(producto => {
    if (filtroTipo.value === "todo") return true;
    return producto.tipo === filtroTipo.value;
  });

  // Ordenar por precio
  productosFiltrados.sort((a, b) => {
    if (ordenPrecio.value === "asc") {
      return a.precio - b.precio;
    } else {
      return b.precio - a.precio;
    }
  });

  // Limpiar la lista
  listaProductos.innerHTML = "";

  // Crear y agregar cada producto al DOM
  productosFiltrados.forEach(producto => {
    const li = document.createElement("li");
    li.className = "producto-item";

    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-nombre">${producto.nombre}</div>
      <div class="producto-descripcion">${producto.descripcion}</div>
      <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
      <button class="boton-comprar" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
        Comprar
      </button>
    `;

    listaProductos.appendChild(li);
  });
}

mostrarProductos();
filtroTipo.addEventListener("change", mostrarProductos);
ordenPrecio.addEventListener("change", mostrarProductos);
});

// |||||||||||||||
// Carrito de compras
let carrito = [];

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const formularioCompra = document.getElementById("formulario-compra");
const formDatosCompra = document.getElementById("form-datos-compra");

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

// Mostrar productos en el carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})"><span class="fas fa-trash-alt"></span></button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio;
  });

  totalCarrito.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Formulario al finalizar compra
finalizarCompraBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("❗ Tu carrito está vacío.");
    return;
  }
  formularioCompra.classList.remove("oculto");
  formularioCompra.scrollIntoView({ behavior: "smooth" });
});

// Procesar formulario
formDatosCompra.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !email) {
    alert("❗ Debes completar los campos obligatorios.");
    return;
  }

  alert(`🎉 ¡Gracias por tu compra, ${nombre}!\n\nTe enviaremos los detalles a ${email}.`);
  carrito = [];
  actualizarCarrito();
  formDatosCompra.reset();
  formularioCompra.classList.add("oculto");
});