const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);
const $id = el => document.getElementById(el);

const btnCarrito = $id('carrito');
const $imagenprincipal = $id('imagen-principal');
const $contador = $id('contador');
const $btnPlus = $id('plus');
const $btnMinus = $id('minus');
const $enviarDatos = $id('enviarDatos');
const $next = $id('next');
const $previus = $id('previus');

const $collectionImg = $$('.main article nav a');
const $collectionImgPrincipales = $$('.main article #imagen-principal img:not(a img)');

const $modalCarrito = $('.carrito-card');
const $articleCard = $('.article-card');

let currentIndex = 0;
const updateImage = (index) =>{
    const $img = $collectionImgPrincipales[index];
    $img.scrollIntoView({behavior: 'smooth'})

    $collectionImg.forEach((thumbnail, idx) => {
        if (idx === index) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    })
}

updateImage(currentIndex);

$next.addEventListener('click', function(e){
    e.preventDefault();
    currentIndex = (currentIndex + 1) % $collectionImgPrincipales.length;
    updateImage(currentIndex)
})

$previus.addEventListener('click', function(e){
    e.preventDefault();
    currentIndex = (currentIndex - 1 + $collectionImgPrincipales.length) % $collectionImgPrincipales.length;
    updateImage(currentIndex);
})

// Abrir Carrito
const carritOpen = ()=> {
    $modalCarrito.classList.toggle('open-menu');
}
btnCarrito.addEventListener('click', carritOpen);

// Funcion para dibujar el objecto 
const dibujarCard = (object) => {
    const {name,cantidad,img,price} = object;
    const carritoCantidad = btnCarrito.querySelector('span');
    const total = parseFloat(price * cantidad); 
    $articleCard.innerHTML = 
    `
        <section>
          <figure>
            <img 
                src="${img}" 
                alt=""
            >
          </figure>
          <div>
            <h5>${name}</h5>
            <div>
              <span>$${price}.00 x ${cantidad}</span>
              <span>$${total}.00</span> 
            </div>
          </div>
          <a href="#" id="delete">
            <img src="./images/icon-delete.svg" alt="">
          </a>
        </section>
        <button>Checkout</button>
    ` 
    carritoCantidad.textContent = cantidad;

    // Este es le btn para eliminar el elemento del carrito
    const $delete = document.getElementById('delete');
    $delete.addEventListener('click', function(){
        $articleCard.innerHTML = 
    `
        <span>Your cart is empty</span>    
    `
        carritoCantidad.textContent =""
    })

    const $buttonCheckout = $articleCard.querySelector('button');
    $buttonCheckout.addEventListener('click', function(){
        $articleCard.innerHTML = 
    `
        <span>Your cart is empty</span>    
    `
        carritoCantidad.textContent =""
    })
}   

// Btn para disminuir la cantidad y desabilitar el botón si la cantidad es menor a uno
$btnMinus.addEventListener('click', function(e){
    e.preventDefault();
    if(parseInt($contador.textContent) <= 1){
        $enviarDatos.disabled = true
    } 
    if(parseInt($contador.textContent) === 0){
        return
    }else{
        $contador.textContent--;
    }

});

// Btn para aumentar la cantidad y habilitar el botón cuando la cantidad sea mayor a cero 
$btnPlus.addEventListener('click', function(e){
    e.preventDefault();
    $contador.textContent++;
    $enviarDatos.disabled = false

})

// Carrito de compra, armar y enviar un objecto con los datos necesarios
$enviarDatos.addEventListener('click', function(e){
    e.preventDefault();
    const tituloArticulo = document.getElementById('titulo-articulo');
    const srcImagenPrincipal = $imagenprincipal.querySelector('img:not(a img)').src;
    const price = parseInt(document.getElementById('price').textContent.replace("$",""));
    const articuloCompra = {
        name: tituloArticulo.textContent,
        cantidad: parseInt($contador.textContent),
        img: srcImagenPrincipal,
        price
    }
    dibujarCard(articuloCompra)
    $contador.textContent = 0;
    this.disabled = true;
})

// Renderizar las imagenes
$collectionImg.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = index;
        updateImage(currentIndex);
    });
});

// Menu desplegable
const menuDesplegable = $('.menu-desplegable');
const body = $('body');
const shadow = $('.shadow');

// Btn para abrir el menú y mostrar la sombra
const menuOpen = document.getElementById('menu-open');
menuOpen.addEventListener('click', function(){
    shadow.classList.add('shadow-active');
    menuDesplegable.classList.add('menu-open');
    body.style.overflowY = 'hidden'
})

// Btn para cerrar el menú y ocultar la sombra
const menuClose = document.getElementById('menu-close');
menuClose.addEventListener('click', function(){
    shadow.classList.remove('shadow-active');
    menuDesplegable.classList.remove('menu-open');
    body.style.overflowY = 'scroll'
})



        