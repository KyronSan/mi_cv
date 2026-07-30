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
window.addEventListener("scroll", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        ajustarSeccion();
    }, 5000);
});

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