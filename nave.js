let puntosT = 0;

// Function to update points and display them
function puntos(puntos) {
    puntosT = puntosT + puntos;
    document.getElementById('puntos').innerHTML = "Puntuación: " + puntosT + " puntos";
}

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

    function moveNave() {
        const porcentajeDecimal = 10 / 100;
        const porcentajeDecimal2 = 10 / 100;

        const pantallaAncho = window.innerWidth;
        const pxeles = porcentajeDecimal * pantallaAncho;
        const pxeles2 = porcentajeDecimal2 * pantallaAncho;

        const currentPosition = naveJugador.offsetLeft;
        if (movingLeft && currentPosition - naveWidth - pxeles2 > 0) {
            naveJugador.style.left = currentPosition - pxeles + 'px';
        } else if (movingRight && currentPosition + naveWidth + pxeles2 < screenWidth) {
            naveJugador.style.left = currentPosition + pxeles + 'px';
        }
        animationFrame = requestAnimationFrame(moveNave);
    }

    function startMove(direction) {
        if (direction === 'left') {
            movingLeft = true;
        } else if (direction === 'right') {
            movingRight = true;
        }
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(moveNave);
        }
    }

    function stopMove(direction) {
        if (direction === 'left') {
            movingLeft = false;
        } else if (direction === 'right') {
            movingRight = false;
        }
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key === 'a' || key === 'd') {
            event.preventDefault();
            startMove(key === 'a' ? 'left' : 'right');
        }
    });

    document.addEventListener('keyup', function(event) {
        const key = event.key;
        if (key === 'a' || key === 'd') {
            stopMove(key === 'a' ? 'left' : 'right');
        }
    });

    // Clase para representar una nave enemiga
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

        // Método para mover la nave enemiga
        mover() {
            const ventanaAncho = window.innerWidth;
            let direccion = Math.random() < 0.5 ? -1 : 1;
            const velocidad = Math.random() * 5 + 3;
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

    // Función para crear una nueva nave enemiga
    function crearNuevaNaveEnemiga() {
        var naveEnemiga = new NaveEnemiga();
        return naveEnemiga;
    }

    // Función para mostrar imágenes de enemigos
    function mostrarImagenes() {
        var numImagenesAMostrar = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < numImagenesAMostrar; i++) {
            if (document.querySelectorAll('.imagen').length >= 5) {
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
        var proyectiles = document.querySelectorAll('.proyectil');
        proyectiles.forEach(function(proyectil) {
            var proyectilRect = proyectil.getBoundingClientRect();
            var naveRect = naveJugador.getBoundingClientRect();

            if (
                proyectilRect.left < naveRect.right &&
                proyectilRect.right > naveRect.left &&
                proyectilRect.top < naveRect.bottom &&
                proyectilRect.bottom > naveRect.top
            ) {

                window.location.href = "derrota.html";

            }
        });
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

                        enemigo.remove(); // Eliminar el enemigo si colisiona con el misil
                        animatedElement.remove(); // Eliminar el misil después de la colisión
                        showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                        cooldown = false; // Resetear el cooldown después de la colisión
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