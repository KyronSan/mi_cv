console.log("Portafolio iniciado");

window.addEventListener("scroll", () => {

    const posicion = window.scrollY;

    console.log(posicion);

});

const enlaces = document.querySelectorAll(".sidebar nav a");
const secciones = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let posicionActual = window.scrollY;

    secciones.forEach((seccion) => {

        const inicio = seccion.offsetTop - 150;
        const fin = inicio + seccion.offsetHeight;

        if (posicionActual >= inicio && posicionActual < fin) {

            enlaces.forEach((enlace) => {
                enlace.classList.remove("activo");
            });

            const enlaceActivo = document.querySelector(
                `.sidebar nav a[href="#${seccion.id}"]`
            );

            enlaceActivo.classList.add("activo");
        }

    });

});

window.dispatchEvent(new Event("scroll"));

let temporizador = null;

if (window.innerWidth <= 768) {
    // MÓVIL
    window.addEventListener("scroll", () => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            ajustarSeccion();
        }, 15000);
    });
} else {

    // PC
    window.addEventListener("scroll", () => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            ajustarSeccion();
        }, 5000);
    });
}

const DURACION = 800; // milisegundos
enlaces.forEach((enlace) => {

    enlace.addEventListener("click", (evento) => {
        evento.preventDefault();
        const destino = document.querySelector(
            enlace.getAttribute("href")
        );
        desplazar(destino.offsetTop, DURACION);
    });
});

function desplazar(destino, duracion) {

    const inicio = window.scrollY;
    const distancia = destino - inicio;
    let tiempoInicial = null;

    function animacion(tiempoActual) {
        if (tiempoInicial === null) {
            tiempoInicial = tiempoActual;
        }

        const tiempoTranscurrido = tiempoActual - tiempoInicial;
        let progreso = tiempoTranscurrido / duracion;
        if (progreso > 1) {
            progreso = 1;
        }

        const suavizado =
            1 - Math.pow(1 - progreso, 3.7);
        window.scrollTo(
            0,
            inicio + distancia * suavizado
        );

        if (progreso < 1) {
            requestAnimationFrame(animacion);
        }
    }
    requestAnimationFrame(animacion);
}

function ajustarSeccion() {
    const posicionActual = window.scrollY;

    let seccionMasCercana = null;
    let distanciaMinima = Infinity;
    secciones.forEach((seccion) => {

        const distancia = Math.abs(
            seccion.offsetTop - posicionActual
        );

        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            seccionMasCercana = seccion;
        }
    });

    if (seccionMasCercana !== null) {
        desplazar(
            seccionMasCercana.offsetTop,
            600
        );
    }
}

/* ===== GALERÍA DE PROYECTOS ===== */
const proyectos=document.querySelectorAll(".proyecto");
const visor=document.getElementById("visor-imagen");
const imagenGrande=document.getElementById("imagen-grande");
const botonCerrar=document.querySelector(".cerrar-imagen");
const flechaIzquierda=document.querySelector(".izquierda");
const flechaDerecha=document.querySelector(".derecha");
const contador=document.getElementById("contador-imagen");
const descripcion=document.getElementById("descripcion-imagen");

let galeriaActual=[];
let indiceActual=0;
let descripcionesActuales=[];

function actualizarImagen(){
    imagenGrande.src=galeriaActual[indiceActual];
    contador.textContent=
    `${indiceActual+1}/${galeriaActual.length}`;
    descripcion.textContent=
    descripcionesActuales[indiceActual];
}

proyectos.forEach(proyecto=>{
    proyecto.addEventListener("click",()=>{
        galeriaActual=
        proyecto.dataset.imagenes
        .split(",")
        .map(img=>img.trim());
        descripcionesActuales=
        proyecto.dataset.descripciones
        .split("|")
        .map(texto=>texto.trim());
        indiceActual=0;
        actualizarImagen();
        visor.classList.add("activo");
    });
});

flechaDerecha.addEventListener("click",e=>{
    e.stopPropagation();
    indiceActual++;
    if(indiceActual>=galeriaActual.length) indiceActual=0;
    actualizarImagen();
});

flechaIzquierda.addEventListener("click",e=>{
    e.stopPropagation();
    indiceActual--;
    if(indiceActual<0) indiceActual=galeriaActual.length-1;
    actualizarImagen();
});

botonCerrar.addEventListener("click",()=>{
    visor.classList.remove("activo");
});

visor.addEventListener("click",e=>{
    if(e.target===visor) visor.classList.remove("activo");
});

document.addEventListener("keydown",e=>{
    if(!visor.classList.contains("activo")) return;
    if(e.key==="ArrowRight") flechaDerecha.click();
    if(e.key==="ArrowLeft") flechaIzquierda.click();
    if(e.key==="Escape") visor.classList.remove("activo");
});