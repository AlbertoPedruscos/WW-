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
//nave
document.addEventListener('DOMContentLoaded', function() {
    const nave = document.querySelector('.nave');
    const screenWidth = window.innerWidth;
    const naveWidth = nave.clientWidth;
    let movingLeft = false;
    let movingRight = false;
    let animationFrame;

    function moveNave() {
        var porcentajeDecimal = 20 / 100;
        var porcentajeDecimal2 = 4 / 100;

        // Obtener el ancho del contenedor
        var pantallaAncho = window.innerWidth;
        var pantallaAncho2 = window.innerWidth;
    
        // Calcular los píxeles
        var pxeles = porcentajeDecimal * pantallaAncho;
        var pxeles2 = porcentajeDecimal2 * pantallaAncho2;


        const currentPosition = nave.offsetLeft;
        if (movingLeft && currentPosition - naveWidth - pxeles2 > 0) {
            nave.style.left = currentPosition - pxeles + 'px';
        } else if (movingRight && currentPosition + naveWidth + pxeles2 < screenWidth) {
            nave.style.left = currentPosition + pxeles + 'px';
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
});


//musica
document.addEventListener('keydown', function(event) {
    var tecla = event.key;
    if (tecla === 'a' || tecla === 'A' || tecla === 'd' || tecla === 'D' || tecla === 'Enter') {
        var musica = document.getElementById('musica');
        musica.play();
    }
});


//enemigos
document.addEventListener('DOMContentLoaded', function() {
    function crearNuevaImagen() {
        var imagen = document.createElement('img');
        imagen.classList.add('imagen');
        imagen.src = 'nave.webp'; // Cambia esto por la URL de tus imágenes
        document.body.appendChild(imagen);
        moverImagen(imagen);
    }

    function moverImagen(imagen) {
        var ventanaAncho = window.innerWidth;
        var ventanaAlto = window.innerHeight;

        var direccion = Math.random() < 0.5 ? -1 : 1; // Dirección inicial aleatoria (-1 para izquierda, 1 para derecha)
        var velocidad = Math.random() * 5 + 3; // Velocidad aleatoria entre 3 y 8 pixels por frame
        var left = Math.random() * (ventanaAncho - 100); // Posición inicial aleatoria en la ventana

        // Asegurarnos de que la posición inicial esté dentro de la ventana
        if (left < 0) {
            left = 0;
        } else if (left > ventanaAncho - 100) {
            left = ventanaAncho - 100;
        }

        imagen.style.left = left + 'px';
        imagen.style.display = 'block';

        function mover() {
            var leftActual = parseFloat(imagen.style.left);
            if (leftActual <= 0 || leftActual >= ventanaAncho - 100) {
                // Cambiar la dirección si la imagen está a punto de salir de la ventana
                direccion *= -1; // Invertir la dirección
            }
            imagen.style.left = (leftActual + velocidad * direccion) + 'px';
        }

        setInterval(mover, 50); // Mover la imagen cada 50 ms (20 cuadros por segundo)
    }

    function mostrarImagenes() {
        var imagenes = document.querySelectorAll('.imagen');
        var numImagenes = imagenes.length;
        var numImagenesAMostrar = Math.floor(Math.random() * (5 - numImagenes)) + 1;

        // Mostrar nuevas imágenes
        for (var i = 0; i < numImagenesAMostrar; i++) {
            if (numImagenes + i >= 5) {
                break; // Detener el bucle si ya hay 5 imágenes en la página
            }
            crearNuevaImagen();
        }
    }

    // Mostrar imágenes cada 10 segundos
    setInterval(mostrarImagenes, 10000);

    // Mostrar imágenes al cargar la página
    mostrarImagenes();
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