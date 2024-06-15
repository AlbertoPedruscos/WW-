let puntosT = 0;

let impacto = 0;


var speedMultiplier=1;

var generacion2=1;

var generacion=5;

let puntosU = 0;
let llenando = true;
let ultimate = false;
let timerId = null;

function puntosUl(puntos) {
    if (llenando && puntosU < 2500) {
        puntosU = Math.min(puntosU + puntos, 2500); // Limitar puntosU a un máximo de 300
        actualizarFill();
    }

    if (puntosU >= 2500 && !ultimate) { // Solo activar el temporizador si ultimate no está activo
        llenando = false;
        actualizarFill();
    }
}

function actualizarFillInverso() {
    const fill = document.getElementById('fill');
    const puntosRestantes = 2500 - puntosU; // Calcular puntos restantes para llenar hasta 300

    // Calcular porcentaje de llenado restante
    const porcentajeRestante = (puntosRestantes / 2500) * 100;

    // Calcular el ancho del fill inverso
    const anchoFillInverso = 100 - porcentajeRestante;

    // Animar el cambio de ancho del fill en 3 segundos
    fill.style.transition = 'width 3s ease';
    fill.style.width = anchoFillInverso + '%';
}

function actualizarFill() {
    const fill = document.getElementById('fill');
    const porcentajeLlenado = (puntosU / 2500) * 100;
    fill.style.width = porcentajeLlenado + '%';
    fill.style.transition = 'width 3s ease';
}

document.addEventListener('keydown', vaciarUlti);

function vaciarUlti(event) {
    if (event.code === 'Space' && !ultimate) { // Solo vaciar si ultimate no está activo
        clearTimeout(timerId); // Detener el temporizador de activación automática del ultimate
        llenando = true;
        puntosU = 0;
        actualizarFillInverso();
        ultimate = true; // Activar ultimate durante el vaciado
        document.getElementById('caza').classList.add('borroso');
        setTimeout(() => {
            ultimate = false; // Desactivar ultimate después del vaciado
            document.getElementById('caza').classList.remove('borroso');
        }, 3000);
    }
}


// Function to update points and display them
function puntos(puntos) {
    puntosT = puntosT + puntos;
    document.getElementById('puntos').innerHTML = "Puntuación: " + puntosT + " puntos";
    
    if (puntosT==3000) {
        var musica = document.getElementById('musica');
        musica.pause();
        musica.currentTime = 0; // Reiniciar la música al principio
        musica.remove(); // Eliminar completamente el elemento de música del DOM

        var musica2 = document.getElementById('musica2');
        musica2.play();
        crearEnemigoUnico();
    }
    else if (puntosT == 5000) {
        var musica2 = document.getElementById('musica2');
        musica2.pause();
        musica2.currentTime = 0; // Reiniciar la música al principio
        musica2.remove(); // Eliminar completamente el elemento de música del DOM
        crearEnemigoUnico2();

        var musica3 = document.getElementById('musica3');
        musica3.play();
    }
}

function ejecutarCada5Segundos() {
    // Aquí va tu condición original
    if (puntosT > 3000) {
        for (let index = 0; index < 1; index++) {
            crearEnemigoUnico();
        }
    }
    // if (puntosT >= 5000) {
    //     for (let index = 0; index < 1; index++) {
    //         crearNuevaNaveEnemiga();
    //     }
    // }
}

// Ejecutar la función inicialmente y luego cada 5 segundos
ejecutarCada5Segundos(); // Ejecutar primero sin esperar los 5 segundos

setInterval(ejecutarCada5Segundos, 5000); 

// Función para simular pulsación de tecla "A"
function simulateKeyPressA() {
    const eventDown = new KeyboardEvent('keydown', {
        key: 'a',
        keyCode: 65,
        which: 65,
        code: 'KeyA'
    });
    const eventUp = new KeyboardEvent('keyup', {
        key: 'a',
        keyCode: 65,
        which: 65,
        code: 'KeyA'
    });
    document.dispatchEvent(eventDown);
    setTimeout(function() {
        document.dispatchEvent(eventUp);
    }, 200); // Simula una pulsación mantenida de 200 milisegundos
}

// Función para simular pulsación de tecla "D"
function simulateKeyPressD() {
    const eventDown = new KeyboardEvent('keydown', {
        key: 'd',
        keyCode: 68,
        which: 68,
        code: 'KeyD'
    });
    const eventUp = new KeyboardEvent('keyup', {
        key: 'd',
        keyCode: 68,
        which: 68,
        code: 'KeyD'
    });
    document.dispatchEvent(eventDown);
    setTimeout(function() {
        document.dispatchEvent(eventUp);
    }, 200); // Simula una pulsación mantenida de 200 milisegundos
}

// Obtener referencias a los botones
const buttonL = document.getElementById('buttonL');
const buttonR = document.getElementById('buttonR');

// Agregar eventos de mousedown y mouseup al botón "L"
buttonL.addEventListener('mousedown', function() {
    // Simular pulsación de tecla "A"
    simulateKeyPressA();
});

// Agregar eventos de mousedown y mouseup al botón "R"
buttonR.addEventListener('mousedown', function() {
    // Simular pulsación de tecla "D"
    simulateKeyPressD();
});
document.addEventListener('DOMContentLoaded', function() {
    var buttonD = document.getElementById('buttonD');

    buttonD.addEventListener('click', function() {
        // Simular presionar Enter
        var event = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    });
});

//musica
document.addEventListener('keydown', function(event) {
    var tecla = event.key;
    if (tecla === 'a' || tecla === 'A' || tecla === 'd' || tecla === 'D' || tecla === 'Enter') {
        var musica = document.getElementById('musica');
        musica.play();
    }
});

//nave
document.addEventListener('DOMContentLoaded', function() {
    const naveJugador = document.querySelector('.nave');
    const screenWidth = window.innerWidth;
    const naveWidth = naveJugador.clientWidth;
    let movingLeft = false;
    let movingRight = false;
    let animationFrame;
    let speedMultiplier = 1; // Declaración de speedMultiplier como variable global
    
    function moveNave() {
        const porcentajeDecimal = 4 / 100;
        const porcentajeDecimal2 = 10 / 100;
    
        const pantallaAncho = window.innerWidth;
        let pxeles = porcentajeDecimal * pantallaAncho;
        let pxeles2 = porcentajeDecimal2 * pantallaAncho;
    
        const currentPosition = naveJugador.offsetLeft;
        if (movingLeft && currentPosition - naveWidth - pxeles2 > 0) {
            pxeles *= speedMultiplier; // Multiplicamos pxeles por speedMultiplier
            naveJugador.style.left = currentPosition - pxeles + 'px';
        } else if (movingRight && currentPosition + naveWidth + pxeles2 < screenWidth) {
            pxeles *= speedMultiplier; // Multiplicamos pxeles por speedMultiplier
            naveJugador.style.left = currentPosition + pxeles + 'px';
        }
        animationFrame = requestAnimationFrame(moveNave);
    }
    
    function startMove(direction) {
        if (direction === 'a' || direction === 'q') {
            movingLeft = true;
            speedMultiplier = (direction === 'q') ? 3 : 1; // Establece el multiplicador de velocidad
        } else if (direction === 'd' || direction === 'e') {
            movingRight = true;
            speedMultiplier = (direction === 'e') ? 3 : 1; // Establece el multiplicador de velocidad
        }
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(moveNave);
        }
    }
    
    function stopMove(direction) {
        if (direction === 'a' || direction === 'q') {
            movingLeft = false;
        } else if (direction === 'd' || direction === 'e') {
            movingRight = false;
        }
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        if (key === 'a' || key === 'd' || key === 'q' || key === 'e') {
            event.preventDefault();
            startMove(key);
        }
    });
    
    document.addEventListener('keyup', function(event) {
        const key = event.key.toLowerCase();
        if (key === 'a' || key === 'd' || key === 'q' || key === 'e') {
            stopMove(key);
        }
    });

    // Función para mostrar imágenes de enemigos
    function mostrarImagenes() {
        var numImagenesAMostrar = Math.floor(Math.random() * generacion) + generacion2;

        for (var i = 0; i < numImagenesAMostrar; i++) {
            if (document.querySelectorAll('.imagen').length >= generacion) {
                break;
            }
            crearNuevaNaveEnemiga();
        }
    }

    // Mostrar imágenes cada 10 segundos
    setInterval(mostrarImagenes, 10000);

    // Mostrar imágenes al cargar la página
    mostrarImagenes();

    // Evento para detectar colisión con la nave del jugador
    function detectarColision() {
        var naveRect = naveJugador.getBoundingClientRect();
        var colisionDetectada = Array.from(document.querySelectorAll('.proyectil')).some(proyectil => {
            var proyectilRect = proyectil.getBoundingClientRect();
            return colision(proyectilRect, naveRect);
        });
    
        if (colisionDetectada) {
            if (!ultimate) {
                window.location.href = "derrota.html";
            } else {
                // Lógica adicional si la nave tiene habilidad ultimate activada
            }
        }
    }
    
    function colision(rect1, rect2) {
        return rect1.left < rect2.right &&
               rect1.right > rect2.left &&
               rect1.top < rect2.bottom &&
               rect1.bottom > rect2.top;
    }
    

    setInterval(detectarColision, 20); // Verificar colisión cada 20 ms
});


//misil
document.addEventListener("DOMContentLoaded", function() {
    var staticElement = document.getElementById("caza");
    var cooldown = false;

    function createAndAnimateImage() {
        if (cooldown) return;

        // Obtener la posición del elemento estático dinámicamente
        var staticElementRect = staticElement.getBoundingClientRect();
        var staticElementTop = staticElementRect.top;
        var staticElementLeft = staticElementRect.left;
        var staticElementWidth = staticElementRect.width;
        var staticElementHeight = staticElementRect.height;

        // Calcular el centro del elemento estático
        var centerX = staticElementLeft + staticElementWidth / 2;
        var centerY = staticElementTop + staticElementHeight / 2;

        cooldown = true;

        // Crear el elemento img
        var animatedElement = document.createElement("img");
        animatedElement.src = "misil.png"; // Reemplaza con la ruta de tu imagen
        animatedElement.className = "animated-element";
        animatedElement.style.top = (centerY - 25) + 'px'; // Ajustar según el tamaño de la imagen
        animatedElement.style.left = (centerX - 25) + 'px'; // Ajustar según el tamaño de la imagen
        document.body.appendChild(animatedElement);

        // Animar el elemento desde su posición inicial hacia arriba
        var endPosition = -100; // Termina fuera de la pantalla
        var duration = 2000; // Duración de la animación en milisegundos (2 segundos)

        function checkCollision(element1, element2, threshold = 10) {
            var rect1 = element1.getBoundingClientRect();
            var rect2 = element2.getBoundingClientRect();

            return !(rect1.right < rect2.left + threshold ||
                     rect1.left > rect2.right - threshold ||
                     rect1.bottom < rect2.top + threshold ||
                     rect1.top > rect2.bottom - threshold);
        }

        function showExplosion(x, y) {
            // Función para reproducir el audio
            function reproducirAudio() {
                var audioElement = document.getElementById("miAudio");

                // Verificar si el elemento de audio ya existe
                if (!audioElement) {
                    console.error('Elemento de audio no encontrado');
                    return;
                }

                // Clonar el elemento de audio para crear una nueva instancia
                var newAudioElement = audioElement.cloneNode(true);

                // Establecer el tiempo de inicio en 0 para reiniciar la reproducción
                newAudioElement.currentTime = 0;

                // Reproducir el audio clonado
                newAudioElement.play();
            }

            // Llamar a la función cada vez que se desee reproducir el audio acumulado
            reproducirAudio();

            puntos(100);
            puntosUl(100);


            var explosion = document.createElement("img");
            explosion.src = "explosion.webp"; // Reemplaza con la ruta de tu imagen de explosión
            explosion.className = "explosion";
            explosion.style.top = y + 'px';
            explosion.style.left = x + 'px';
            document.body.appendChild(explosion);

            setTimeout(function() {
                explosion.remove();
            }, 1000); // Eliminar la explosión después de 1 segundo
        }

        function animate() {
            var start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = timestamp - start;
                var currentPosition = (centerY - 25) - ((centerY - 25) - endPosition) * (progress / duration);
                animatedElement.style.top = currentPosition + 'px';

                // Verificar colisión con enemigos
                var enemigos = document.querySelectorAll('.imagen');
                enemigos.forEach(function(enemigo) {
                    if (checkCollision(animatedElement, enemigo)) {
                        var enemigoRect = enemigo.getBoundingClientRect();
                        var enemigoCenterX = enemigoRect.left + enemigoRect.width / 2;
                        var enemigoCenterY = enemigoRect.top + enemigoRect.height / 2;

                        if (enemigo.classList.contains('unico2') && impacto!=9){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            impacto=impacto+1;
                        }
                        else if (enemigo.classList.contains('unico2') && impacto==9){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            window.location.href = "victoria.html";
                        }
                        else{
                            enemigo.remove(); // Eliminar el enemigo si colisiona con el misil
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                        }
                    }
                });

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    animatedElement.style.top = endPosition + 'px'; // Asegurar la posición final
                    animatedElement.remove(); // Eliminar el elemento cuando termina la animación
                    cooldown = false; // Resetear el cooldown después de 2 segundos
                }
            }
            window.requestAnimationFrame(step);
        }

        animate();
    }

    // Evento para detectar la tecla Enter
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            createAndAnimateImage();
        }
    });
});

class EnemigoUnico2 {
    constructor() {
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.classList.add('unico2');
        this.nave.src = 'naci.png'; // Cambia esto por la URL de la imagen de tu enemigo único 2
        document.body.appendChild(this.nave);
        this.mover();
        this.intervalId = null;
        this.proyectilIntervalId = null;
        this.destruida = false;
        this.golpesRecibidos = 0; // Contador de golpes recibidos
        this.collisionCooldown = false; // Flag para manejar el cooldown de colisión
        this.disparar(); // Iniciar disparos al crear la nave
    }

    // Método para mover la nave enemiga
    mover() {
        const ventanaAncho = window.innerWidth;
        const referenciaAncho = 1920; // Ancho de referencia para la resolución Full HD
        const factorEscala = ventanaAncho / referenciaAncho; // Inverso del factor de escala
    
        let direccion = Math.random() < 0.5 ? -1 : 1;
        const velocidad = 14 * factorEscala; // Ajustamos la velocidad según el factor de escala
    
        let left = Math.random() * (ventanaAncho - 100);
    
        if (left < 0) {
            left = 0;
        } else if (left > ventanaAncho - 100) {
            left = ventanaAncho - 100;
        }
    
        this.nave.style.left = left + 'px';
        this.nave.style.display = 'block';
    
        // Lanzar un proyectil cada 2 segundos desde esta nave
        this.proyectilIntervalId = setInterval(() => {
            if (!this.destruida) {
                this.lanzarProyectil();
            }
        }, 2000);
    
        // Mover la nave de manera aleatoria
        this.intervalId = setInterval(() => {
            const leftActual = parseFloat(this.nave.style.left);
            if (leftActual <= 0 || leftActual >= ventanaAncho - 100) {
                direccion *= -1;
            }
            this.nave.style.left = (leftActual + velocidad * direccion) + 'px';
        }, 50);
    }

    // Método para disparar proyectiles
    disparar() {
        const dispararProyectiles = () => {
            this.proyectilIntervalId = setInterval(() => {
                if (!this.destruida) {
                    this.lanzarProyectil();
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 2 segundos
                if (!this.destruida) {
                    dispararProyectiles(); // Vuelve a disparar si no está destruida
                }
            }, 2000);
        };

        dispararProyectiles();
    }

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil() {
        if (!this.destruida) {
            var proyectil = document.createElement('img');
            proyectil.classList.add('proyectil');
            proyectil.src = 'proyectil.png'; // Cambia esto por la URL de tus imágenes de proyectil
            proyectil.style.position = 'absolute';
            proyectil.style.left = (this.nave.offsetLeft + this.nave.clientWidth / 2 - 10) + 'px'; // Centrado horizontalmente
            proyectil.style.top = (this.nave.offsetTop + this.nave.clientHeight) + 'px'; // Desde la parte inferior de la nave
            document.body.appendChild(proyectil);

            function moverProyectil() {
                var topActual = parseFloat(proyectil.style.top);
                proyectil.style.top = (topActual + 5) + 'px'; // Velocidad del proyectil

                // Eliminar el proyectil si sale de la pantalla
                if (topActual > window.innerHeight) {
                    proyectil.remove();
                    clearInterval(intervalId);
                }
            }

            var intervalId = setInterval(moverProyectil, 1); // Mover el proyectil cada 20 ms
        }
    }

    // Método para destruir la nave enemiga
    destruir() {
        this.destruida = true;
        clearInterval(this.intervalId); // Detener el movimiento de la nave
        clearInterval(this.proyectilIntervalId); // Detener el lanzamiento de proyectiles
        this.nave.remove(); // Eliminar la nave de la pantalla
    }
}

// Clase para representar una nave enemiga única
class EnemigoUnico {
    constructor() {
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.src = 'nave.png'; // Cambia esto por la URL de la imagen de tu enemigo único
        document.body.appendChild(this.nave);
        this.mover();
        this.destruida = false;
        this.disparar(); // Iniciar disparos al crear la nave
    }

    // Método para mover la nave enemiga
    mover() {
        const ventanaAncho = window.innerWidth;
        const referenciaAncho = 1920; // Ancho de referencia para la resolución Full HD
        const factorEscala = ventanaAncho / referenciaAncho; // Inverso del factor de escala

        let direccion = Math.random() < 0.5 ? -1 : 1;
        const velocidad = 6 * factorEscala; // Ajustamos la velocidad según el factor de escala

        let left = Math.random() * (ventanaAncho - 100);

        if (left < 0) {
            left = 0;
        } else if (left > ventanaAncho - 100) {
            left = ventanaAncho - 100;
        }

        this.nave.style.left = left + 'px';
        this.nave.style.display = 'block';

        // Mover la nave de manera aleatoria
        this.intervalId = setInterval(() => {
            const leftActual = parseFloat(this.nave.style.left);
            if (leftActual <= 0 || leftActual >= ventanaAncho - 100) {
                direccion *= -1;
            }
            this.nave.style.left = (leftActual + velocidad * direccion) + 'px';
        }, 50);
    }

    // Método para disparar proyectiles con cooldown
    disparar() {
        const cicloDisparo = () => {
            if (this.destruida) return;

            // Disparar proyectiles durante 3 segundos
            const startDisparar = () => {
                this.proyectilIntervalId = setInterval(() => {
                    if (!this.destruida) {
                        this.lanzarProyectil();
                    }
                }, 200); // Dispara 5 proyectiles por segundo
            };

            startDisparar();

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detener el disparo después de 3 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        cicloDisparo(); // Volver a disparar después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        cicloDisparo();
    }

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil() {
        if (!this.destruida) {
            var proyectil = document.createElement('img');
            proyectil.classList.add('proyectil');
            proyectil.src = 'proyectil.png'; // Cambia esto por la URL de tus imágenes de proyectil
            proyectil.style.position = 'absolute';
            proyectil.style.left = (this.nave.offsetLeft + this.nave.clientWidth / 2 - 10) + 'px'; // Centrado horizontalmente
            proyectil.style.top = (this.nave.offsetTop + this.nave.clientHeight) + 'px'; // Desde la parte inferior de la nave
            document.body.appendChild(proyectil);

            function moverProyectil() {
                var topActual = parseFloat(proyectil.style.top);
                proyectil.style.top = (topActual + 5) + 'px'; // Velocidad del proyectil

                // Eliminar el proyectil si sale de la pantalla
                if (topActual > window.innerHeight) {
                    proyectil.remove();
                    clearInterval(intervalId);
                }
            }

            var intervalId = setInterval(moverProyectil, 20); // Mover el proyectil cada 20 ms
        }
    }

    // Método para destruir la nave enemiga
    destruir() {
        this.destruida = true;
        clearInterval(this.intervalId); // Detener el movimiento de la nave
        clearInterval(this.proyectilIntervalId); // Detener el lanzamiento de proyectiles
        this.nave.remove(); // Eliminar la nave de la pantalla
    }
}

class NaveEnemiga {
    constructor() {
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.src = 'nave.webp'; // Cambia esto por la URL de tus imágenes de nave enemiga
        document.body.appendChild(this.nave);
        this.mover();
        this.intervalId = null;
        this.proyectilIntervalId = null;
        this.destruida = false;
    }

    mover() {
        const ventanaAncho = window.innerWidth;
        const referenciaAncho = 1920; // Ancho de referencia para la resolución Full HD
        const factorEscala = ventanaAncho / referenciaAncho; // Inverso del factor de escala
    
        let direccion = Math.random() < 0.5 ? -1 : 1;
        const velocidad = (Math.random() * 6 + 6) * factorEscala; // Ajustamos la velocidad según el factor de escala
    
        let left = Math.random() * (ventanaAncho - 100);
    
        if (left < 0) {
            left = 0;
        } else if (left > ventanaAncho - 100) {
            left = ventanaAncho - 100;
        }
    
        this.nave.style.left = left + 'px';
        this.nave.style.display = 'block';
    
        // Lanzar un proyectil cada 2 segundos desde esta nave
        this.proyectilIntervalId = setInterval(() => {
            if (!this.destruida) {
                this.lanzarProyectil();
            }
        }, 2000);
    
        // Mover la nave de manera aleatoria
        this.intervalId = setInterval(() => {
            const leftActual = parseFloat(this.nave.style.left);
            if (leftActual <= 0 || leftActual >= ventanaAncho - 100) {
                direccion *= -1;
            }
            this.nave.style.left = (leftActual + velocidad * direccion) + 'px';
        }, 50);
    }
    

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil() {
        if (!this.destruida) {
            var proyectil = document.createElement('img');
            proyectil.classList.add('proyectil');
            proyectil.src = 'proyectil.png'; // Cambia esto por la URL de tus imágenes de proyectil
            proyectil.style.position = 'absolute';
            proyectil.style.left = (this.nave.offsetLeft + this.nave.clientWidth / 2 - 10) + 'px'; // Centrado horizontalmente
            proyectil.style.top = (this.nave.offsetTop + this.nave.clientHeight) + 'px'; // Desde la parte inferior de la nave
            document.body.appendChild(proyectil);

            function moverProyectil() {
                var topActual = parseFloat(proyectil.style.top);
                proyectil.style.top = (topActual + 5) + 'px'; // Velocidad del proyectil

                // Eliminar el proyectil si sale de la pantalla
                if (topActual > window.innerHeight) {
                    proyectil.remove();
                    clearInterval(intervalId);
                }
            }

            var intervalId = setInterval(moverProyectil, 20); // Mover el proyectil cada 20 ms
        }
    }

    // Método para destruir la nave enemiga
    destruir() {
        this.destruida = true;
        clearInterval(this.intervalId); // Detener el movimiento de la nave
        clearInterval(this.proyectilIntervalId); // Detener el lanzamiento de proyectiles
        this.nave.remove(); // Eliminar la nave de la pantalla
        setTimeout(() => {
            this.respawn(); // Respawnear la nave después de cierto tiempo
        }, 5000); // Respawnear después de 5 segundos (ajustar según sea necesario)
    }

    // Método para respawnear la nave enemiga
    respawn() {
        this.destruida = false;
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.src = 'nave.webp'; // Cambia esto por la URL de tus imágenes de nave enemiga
        document.body.appendChild(this.nave);
        this.mover();
    }
}

// Función para crear el enemigo único
function crearEnemigoUnico() {
    var enemigoUnico = new EnemigoUnico();
    return enemigoUnico;
}

function crearEnemigoUnico2() {
    var enemigoUnico2 = new EnemigoUnico2();
    return enemigoUnico2;
}

// Función para crear una nueva nave enemiga
function crearNuevaNaveEnemiga() {
    var naveEnemiga = new NaveEnemiga();
    return naveEnemiga;
}
