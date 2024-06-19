let impacto = 0;

let impactoB = 0;

let impactoC= 0;

let impactoG1 = 0;
let impactoG2 = 0;

let posicion = 0;

let escudoC = false;

let lastExecutionTime = 0;
let executionCount = 0;

var speedMultiplier=1;

var generacion2=1;

let fases = 1;

var generacion=5;
let llenando = true;
let ultimate = false;
let timerId = null;  

function checkCollisionAndChangePage() {
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
    // Crear imagen dinámicamente
    var img = new Image();
    img.src = 'explosion.webp'; // Cambia a la URL de tu imagen
    img.classList.add('img-dinamica');
    
    document.body.appendChild(img); // Añadir la imagen al cuerpo del documento
    
    // Asegurarnos de que la imagen comience pequeña
    img.style.width = '0';
    img.style.height = '0';
    
    // Forzar el reflow antes de aplicar la transición
    img.getBoundingClientRect(); 
    
    // Animación de expansión gradual
    setTimeout(function() {
        img.style.width = '120%';
        img.style.height = '120%';
    }, 0);
    
    // Verificar colisión y cambiar de página si es necesario
    function checkCollision2() {
        var imgRect = img.getBoundingClientRect();
        
        var cazaRect = document.getElementById('caza').getBoundingClientRect(); // Rectángulo de la imagen caza
        
        // Detectar colisión
        if (imgRect.left < cazaRect.right &&
            imgRect.right > cazaRect.left &&
            imgRect.top < cazaRect.bottom &&
            imgRect.bottom > cazaRect.top) {
            const elementosImagen = document.querySelectorAll('.imagen');
            // Iterar sobre la lista de elementos y eliminar cada uno
            elementosImagen.forEach(elemento => {
                elemento.remove();
            });
            // Cambiar de página según la condición de ultimate
            if (ultimate) {
                fases = 4;
                crearEnemigoFinal();
                console.log(fases);
                img.remove();
                puntosU = 2500;

                var musica = document.getElementById('musica');
                musica.pause();
                musica.currentTime = 0; // Reiniciar la música al principio
                musica.remove(); // Eliminar completamente el elemento de música del DOM
        
                var musica2 = document.getElementById('musica2');
                musica2.play();
            } else {
                window.location.href = 'derrota.html'; // Cambia a tu URL de derrota
            }
        }
    }
    
    // Llamar a la función de verificación de colisión después de la animación
    setTimeout(checkCollision2, 2000); // Ajusta el tiempo según la duración de la animación (en milisegundos)
}

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
    if (event.code === 'Space' && !ultimate && puntosU===2500) { // Solo vaciar si ultimate no está activo
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

document.getElementById('buttonSpace').addEventListener('click', function() {
    simularTecla(' ');
});

function simularTecla(tecla) {
    // Crear el evento de teclado para la tecla especificada
    var eventoTecla = new KeyboardEvent('keydown', {
        key: tecla,
        keyCode: tecla.charCodeAt(0),
        code: 'Space',
        which: tecla.charCodeAt(0),
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
    });

    // Despachar el evento en el documento
    document.dispatchEvent(eventoTecla);
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

// //musica
// document.addEventListener('keydown', function(event) {
//     var tecla = event.key;
//     if (tecla === 'a' || tecla === 'A' || tecla === 'd' || tecla === 'D' || tecla === 'Enter') {
//         var musica = document.getElementById('musica');
//         musica.play();
//     }
// });

//nave
document.addEventListener('DOMContentLoaded', function() {
    const caza = document.getElementById('caza');
    let currentPositionY = caza.offsetTop;
    let isMoving = false;

    // Función para manejar el movimiento según las teclas presionadas
    function moveObject(event) {
        // Verificar si ya está en movimiento
        if (isMoving) {
            return;
        }

        isMoving = true;

        const porcentajeDecimal = 6 / 100;
    
        const pantallaAncho = window.innerWidth;
        let pxeles = porcentajeDecimal * pantallaAncho;

        // Tecla W para mover hacia arriba
        if ((event.key === 'w' || event.key === 'W') && posicion==0) {
            currentPositionY -= pxeles;
            posicion = 1;
        }
        // Tecla S para mover hacia abajo
        else if ((event.key === 's' || event.key === 'S') && posicion==1) {
            currentPositionY += pxeles;
            posicion = 0;
        }

        // Actualizar posición del objeto
        caza.style.top = currentPositionY + 'px';

        // Establecer un breve tiempo de espera antes de permitir otro movimiento
        setTimeout(function() {
            isMoving = false;
        }, 300); // 300 milisegundos de espera antes de permitir otro movimiento
    }

    // Escuchar eventos de teclado
    document.addEventListener('keydown', moveObject);
});
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
        if (level!=5 && level!=6 && level!=7){
            var numImagenesAMostrar = Math.floor(Math.random() * generacion) + generacion2;

            for (var i = 0; i < numImagenesAMostrar; i++) {
                if (document.querySelectorAll('.imagen').length >= generacion) {
                    break;
                }
                crearNuevaNaveEnemiga();
            }
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
        var centerY = staticElementTop + staticElementHeight / 4;

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
                        else if (enemigo.classList.contains('efinal') && impactoB!=25){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            impactoB=impactoB+1;

                            puntosUl(400);
                            if (impactoB % 2 === 0 && impactoB <= 10) {
                                crearNuevaNaveEnemiga();
                            }
                            else if (impactoB % 2 === 0 &&  impactoB > 10 && impactoB < 20){
                                crearEnemigoUnico();
                            }
                            else if (impactoB % 2 === 0 &&impactoB >= 20){
                                crearEnemigoUnico2();
                            }

                            if (impactoB==10 || impactoB==20) {
                                // Selección del elemento caza y efinal
                                const caza2 = document.getElementById('caza');
                                const efinal2 = document.querySelector('.efinal');

                                // Obtener el valor 'top' de caza
                                const topCaza = caza2.offsetTop;

                                // Mover efinal instantáneamente al valor 'top' de caza
                                efinal2.style.top = topCaza + 'px';

                                // Después de 3 segundos, volver a la posición original de efinal
                                setTimeout(() => {
                                    efinal2.style.top = "12%"; // Posición original de efinal
                                }, 3000);
                            }
                        }
                        else if (enemigo.classList.contains('efinal2') && impactoC!=50) {
                            const currentTime = Date.now();
                            
                            if (currentTime - lastExecutionTime < 2000) {
                                executionCount++;
                            } else {
                                // Reiniciar el contador si han pasado más de 2 segundos
                                executionCount = 1;
                            }
                            
                            lastExecutionTime = currentTime;
                            
                            if (executionCount >= 3) {
                                // Se ha ejecutado dos veces en menos de dos segundos
                                escudoC = true; // Establecer escudoC a true
                                var elements = document.getElementsByClassName('efinal2');
                        
                                // Iterar sobre la colección de elementos y agregar la clase 'borroso' a cada uno
                                for (var i = 0; i < elements.length; i++) {
                                    elements[i].classList.add('borroso');
                                }
                        
                                setTimeout(() => {
                                    escudoC = false; // Volver a false después de 2 segundos
                                    for (var i = 0; i < elements.length; i++) {
                                        elements[i].classList.remove('borroso');
                                    }
                                }, 4000);
                        
                                // Reiniciar el contador y el tiempo después de cumplir la condición
                                executionCount = 0;
                                lastExecutionTime = 0;
                            }
                            if (escudoC==true){

                            }
                            else{
                                animatedElement.remove(); // Eliminar el misil después de la colisión
                                showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                                cooldown = false; // Resetear el cooldown después de la colisión
                                impactoC=impactoC+1;
                                puntosUl(900);

                                if (impactoC==5 || impactoC==10 || impactoC==15 || impactoC==20 || impactoC==25 || impactoC==30 || impactoC==35 || impactoC==40 || impactoC==45) {
                                    // Selección del elemento caza y efinal
                                    const caza2 = document.getElementById('caza');
                                    const efinal2 = document.querySelector('.efinal2');

                                    // Obtener el valor 'top' de caza
                                    const topCaza = caza2.offsetTop;

                                    // Mover efinal instantáneamente al valor 'top' de caza
                                    efinal2.style.top = topCaza/2 + 'px';

                                    // Después de 3 segundos, volver a la posición original de efinal
                                    setTimeout(() => {
                                        efinal2.style.top = "12%"; // Posición original de efinal
                                    }, 3000);
                                }
                            }
                        }
                        else if (enemigo.classList.contains('unico2') && impacto==9){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            if (level==4){
                                window.location.href = "naves5.html";
                            }
                            else if (level==5 ||level==6 || level==7){
                                enemigo.remove();
                            }
                            else if (level==3){
                                window.location.href = "naves4.html";
                            }
                        }
                        else if (enemigo.classList.contains('efinal') && impactoB==25){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            if (level==5){
                                window.location.href = "naves6.html";
                            }
                            else if (level==7){
                                if (fases==5) {
                                    crearJefazo();
                                }
                                fases=6;
                            }
                            else{
                                enemigo.remove(); // Eliminar el enemigo si colisiona con el misil
                                crearEnemigoFinal2();
                                var musica = document.getElementById('musica');
                                musica.pause();
                                musica.currentTime = 0; // Reiniciar la música al principio
                                musica.remove(); // Eliminar completamente el elemento de música del DOM
                        
                                var musica2 = document.getElementById('musica2');
                                musica2.play();
                                crearEnemigoUnico();
                            }
                        }
                        else if (enemigo.classList.contains('efinal2') && impactoC==50){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            if (level==6){
                                window.location.href = "victoria.html";
                            }
                        }
                        else if (enemigo.classList.contains('efinal3') && fases == 1){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                        }
                        else if (enemigo.classList.contains('efinal3') && fases == 2 && impactoG1 != 10){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            impactoG1 = impactoG1 + 1;
                        }
                        else if (enemigo.classList.contains('efinal3') && fases == 2 && impactoG1 == 10){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            impactoG1 = impactoG1 + 1;
                            enemigo.remove();
                            fases = 3;
                            if (fases === 3) {
                                checkCollisionAndChangePage();
                            }

                        }
                        else if (enemigo.classList.contains('efinal3') && fases == 6 && impactoG2 != 40){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            impactoG1 = impactoG1 + 1;
                            puntosUl(900);
                        }
                        else if (enemigo.classList.contains('efinal3') && fases == 6 && impactoG2 == 40){
                            animatedElement.remove(); // Eliminar el misil después de la colisión
                            showExplosion(enemigoCenterX - 50, enemigoCenterY - 50); // Mostrar explosión centrada
                            cooldown = false; // Resetear el cooldown después de la colisión
                            impactoG1 = impactoG1 + 1;
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


    
// Función para comprobar colisión y redirigir si es necesario
function verificarColision() {
    var elementoFinal = document.querySelector('.efinal');
    // Obtener referencia al elemento con id 'caza'
    var elementoCaza = document.getElementById('caza');
    if (elementoFinal){
        var rect1 = elementoFinal.getBoundingClientRect();
        var rect2 = elementoCaza.getBoundingClientRect();

        if (!(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom)) {
            // Si hay colisión, redirigir a otra página
            if (!ultimate) {
                window.location.href = "derrota.html";
            } else {
                // Lógica adicional si la nave tiene habilidad ultimate activada
            }        
        }
    }
}
// Verificar colisión en intervalos regulares (cada 100 ms en este ejemplo)
setInterval(verificarColision, 100);

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
        const velocidad = 30 * factorEscala; // Ajustamos la velocidad según el factor de escala
    
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

    // Método para disparar proyectiles
    disparar() {
        const dispararProyectiles = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil();
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 2 segundos
                if (document.body.contains(this.nave)) {
                    dispararProyectiles(); // Vuelve a disparar si no está destruida
                }
            }, 1000);
        };

        dispararProyectiles();
    }

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil() {
        if (document.body.contains(this.nave)) {
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

            var intervalId = setInterval(moverProyectil, 1);
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
        if (!document.body.contains(this.nave)) {
            return; // Salir de la función si la nave ha sido eliminada
        }

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
        if (!document.body.contains(this.nave)) {
            return; // Salir de la función si la nave ha sido eliminada
        }

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

class EnemigoFinal {
    constructor() {
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.classList.add('efinal');
        this.nave.src = 'baron.png'; // Cambia esto por la URL de la imagen de tu enemigo final
        document.body.appendChild(this.nave);
        this.mover();
        this.destruida = false;
        this.cooldown = false; // Flag de cooldown
        this.disparar(); // Iniciar disparos al crear la nave
    }

    // Método para mover la nave enemiga
    mover() {
        const ventanaAncho = window.innerWidth;
        const referenciaAncho = 1920; // Ancho de referencia para la resolución Full HD
        const factorEscala = ventanaAncho / referenciaAncho; // Inverso del factor de escala

        let direccion = Math.random() < 0.5 ? -1 : 1;
        const velocidad = 25 * factorEscala; // Velocidad combinada

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

    disparar() {
        const dispararAleatorio = () => {
            if (this.destruida || this.cooldown) return;

            this.cooldown = true;
            const aleatorio = Math.floor(Math.random() * 3) + 1; // Número aleatorio entre 1 y 3
            if (aleatorio === 1) {
                this.dispararEstiloUnico();
            } else if (aleatorio === 2) {
                this.dispararEstiloUnico2();
            } else if (aleatorio === 3) {
                this.dispararEstiloUnico3();
            }
        };

        this.dispararIntervalId = setInterval(dispararAleatorio, 1000); // Intentar disparar cada segundo
    }

    // Método para disparar proyectiles al estilo EnemigoUnico
    dispararEstiloUnico() {
        const cicloDisparo = () => {
            if (this.destruida) return;

            const startDisparar = () => {
                this.proyectilIntervalId = setInterval(() => {
                    if (!this.destruida) {
                        this.lanzarProyectil(5); // Velocidad del proyectil para EstiloUnico
                    }
                }, 200); // Dispara 5 proyectiles por segundo
            };

            startDisparar();

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detener el disparo después de 3 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        cicloDisparo();
    }

    // Método para disparar proyectiles al estilo EnemigoUnico2
    dispararEstiloUnico2() {
        const dispararProyectiles = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil(3); // Velocidad del proyectil para EstiloUnico2
                }
            }, 100);

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 2 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        dispararProyectiles();
    }

    // Nuevo método para disparar proyectiles de una tercera manera
    dispararEstiloUnico3() {
        const dispararProyectilesRapidos = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil(1); // Velocidad del proyectil para EstiloUnico3, el más lento
                }
            }, 333); // Dispara proyectiles más lentos

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 1 segundo
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        dispararProyectilesRapidos();
    }

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil(velocidad) {
        if (!document.body.contains(this.nave)) {
            return; // Salir de la función si la nave ha sido eliminada
        }

        var proyectil = document.createElement('img');
        proyectil.classList.add('proyectil');
        proyectil.src = 'proyectil.png'; // Cambia esto por la URL de tus imágenes de proyectil
        proyectil.style.position = 'absolute';
        proyectil.style.left = (this.nave.offsetLeft + this.nave.clientWidth / 2 - 10) + 'px'; // Centrado horizontalmente
        proyectil.style.top = (this.nave.offsetTop + this.nave.clientHeight) + 'px'; // Desde la parte inferior de la nave
        document.body.appendChild(proyectil);

        function moverProyectil() {
            var topActual = parseFloat(proyectil.style.top);
            proyectil.style.top = (topActual + velocidad * 5) + 'px'; // Velocidad del proyectil multiplicada por la velocidad

            // Eliminar el proyectil si sale de la pantalla
            if (topActual > window.innerHeight) {
                proyectil.remove();
                clearInterval(intervalId);
            }
        }

        var intervalId = setInterval(moverProyectil, 20); // Mover el proyectil cada 20 ms
    }

    // Método para destruir la nave enemiga
    destruir() {
        this.destruida = true;
        clearInterval(this.intervalId); // Detener el movimiento de la nave
        clearInterval(this.dispararIntervalId); // Detener el disparo aleatorio
        clearInterval(this.proyectilIntervalId); // Detener el lanzamiento de proyectiles
        this.nave.remove(); // Eliminar la nave de la pantalla
    }
}

class EnemigoFinal2 {
    constructor() {
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.classList.add('efinal2');
        this.nave.src = 'proto.png'; // Cambia esto por la URL de la imagen de tu enemigo final
        document.body.appendChild(this.nave);
        this.mover();
        this.destruida = false;
        this.cooldown = false; // Flag de cooldown
        this.disparar(); // Iniciar disparos al crear la nave
    }

    // Método para mover la nave enemiga
    mover() {
        const ventanaAncho = window.innerWidth;
        const referenciaAncho = 1920; // Ancho de referencia para la resolución Full HD
        const factorEscala = ventanaAncho / referenciaAncho; // Inverso del factor de escala

        let direccion = Math.random() < 0.5 ? -1 : 1;
        const velocidad = 35 * factorEscala; // Velocidad combinada

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

    disparar() {
        const dispararAleatorio = () => {
            if (this.destruida || this.cooldown) return;

            this.cooldown = true;
            const aleatorio = Math.floor(Math.random() * 3) + 1; // Número aleatorio entre 1 y 3
            if (aleatorio === 1) {
                this.dispararEstiloUnico();
            } else if (aleatorio === 2) {
                this.dispararEstiloUnico2();
            } else if (aleatorio === 3) {
                this.dispararEstiloUnico3();
            }
        };

        this.dispararIntervalId = setInterval(dispararAleatorio, 1000); // Intentar disparar cada segundo
    }

    // Método para disparar proyectiles al estilo EnemigoUnico
    dispararEstiloUnico() {
        const cicloDisparo = () => {
            if (this.destruida) return;

            const startDisparar = () => {
                this.proyectilIntervalId = setInterval(() => {
                    if (!this.destruida) {
                        this.lanzarProyectil(5); // Velocidad del proyectil para EstiloUnico
                    }
                }, 200); // Dispara 5 proyectiles por segundo
            };

            startDisparar();

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detener el disparo después de 3 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        cicloDisparo();
    }

    // Método para disparar proyectiles al estilo EnemigoUnico2
    dispararEstiloUnico2() {
        const dispararProyectiles = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil(3); // Velocidad del proyectil para EstiloUnico2
                }
            }, 100);

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 2 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        dispararProyectiles();
    }

    // Nuevo método para disparar proyectiles de una tercera manera
    dispararEstiloUnico3() {
        const dispararProyectilesRapidos = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil(1); // Velocidad del proyectil para EstiloUnico3, el más lento
                }
            }, 333); // Dispara proyectiles más lentos

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 1 segundo
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        dispararProyectilesRapidos();
    }

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil(velocidad) {
        if (!document.body.contains(this.nave)) {
            return; // Salir de la función si la nave ha sido eliminada
        }

        var proyectil = document.createElement('img');
        proyectil.classList.add('proyectil');
        proyectil.src = 'proyectil.png'; // Cambia esto por la URL de tus imágenes de proyectil
        proyectil.style.position = 'absolute';
        proyectil.style.left = (this.nave.offsetLeft + this.nave.clientWidth / 2 - 10) + 'px'; // Centrado horizontalmente
        proyectil.style.top = (this.nave.offsetTop + this.nave.clientHeight) + 'px'; // Desde la parte inferior de la nave
        document.body.appendChild(proyectil);

        function moverProyectil() {
            var topActual = parseFloat(proyectil.style.top);
            proyectil.style.top = (topActual + velocidad * 5) + 'px'; // Velocidad del proyectil multiplicada por la velocidad

            // Eliminar el proyectil si sale de la pantalla
            if (topActual > window.innerHeight) {
                proyectil.remove();
                clearInterval(intervalId);
            }
        }

        var intervalId = setInterval(moverProyectil, 20); // Mover el proyectil cada 20 ms
    }

    // Método para destruir la nave enemiga
    destruir() {
        this.destruida = true;
        clearInterval(this.intervalId); // Detener el movimiento de la nave
        clearInterval(this.dispararIntervalId); // Detener el disparo aleatorio
        clearInterval(this.proyectilIntervalId); // Detener el lanzamiento de proyectiles
        this.nave.remove(); // Eliminar la nave de la pantalla
    }
}

class Jefazo {
    constructor() {
        this.nave = document.createElement('img');
        this.nave.classList.add('imagen');
        this.nave.classList.add('efinal3');
        this.nave.src = 'proto.png'; // Cambia esto por la URL de la imagen de tu enemigo final
        document.body.appendChild(this.nave);
        this.mover();
        this.destruida = false;
        this.cooldown = false; // Flag de cooldown
        this.disparar(); // Iniciar disparos al crear la nave
    }

    mover() {
        const ventanaAncho = window.innerWidth;
        const referenciaAncho = 1920; // Ancho de referencia para la resolución Full HD
        const factorEscala = ventanaAncho / referenciaAncho; // Inverso del factor de escala

        let direccion = Math.random() < 0.5 ? -1 : 1;
        let velocidad;

        // Ajustar la velocidad de movimiento según la variable externa fases
        switch (fases) {
            default:
                velocidad = 35 * factorEscala;
        }

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

    disparar() {
        const dispararAleatorio = () => {
            if (this.destruida || this.cooldown) return;

            // Ajustar el estilo de disparo según la variable externa fases
            switch (fases) {
                case 1:
                    // No atacar en fases 1
                    break;
                case 2:
                    this.cooldown = true;
                    this.dispararEstiloUnico();
                    break;
                case 3:
                    // No atacar en fases 3
                    break;
                case 4:
                    // No atacar en fases 4
                    break;
                case 5:
                    this.cooldown = true;
                    this.dispararEstiloUnico3();
                    break;
                default:
                    break;
            }
        };

        this.dispararIntervalId = setInterval(dispararAleatorio, 1000); // Intentar disparar cada segundo
    }

    // Método para disparar proyectiles al estilo EnemigoUnico
    dispararEstiloUnico() {
        const cicloDisparo = () => {
            if (this.destruida) return;

            const startDisparar = () => {
                this.proyectilIntervalId = setInterval(() => {
                    if (!this.destruida) {
                        this.lanzarProyectil(5); // Velocidad del proyectil para EstiloUnico
                    }
                }, 500); // Dispara 5 proyectiles por segundo
            };

            startDisparar();

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detener el disparo después de 3 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        cicloDisparo();
    }

    // Método para disparar proyectiles al estilo EnemigoUnico2
    dispararEstiloUnico2() {
        const dispararProyectiles = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil(3); // Velocidad del proyectil para EstiloUnico2
                }
            }, 100);

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 2 segundos
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        dispararProyectiles();
    }

    // Nuevo método para disparar proyectiles de una tercera manera
    dispararEstiloUnico3() {
        const dispararProyectilesRapidos = () => {
            if (this.destruida) return;

            this.proyectilIntervalId = setInterval(() => {
                if (document.body.contains(this.nave)) {
                    this.lanzarProyectil(1); // Velocidad del proyectil para EstiloUnico3, el más lento
                }
            }, 333); // Dispara proyectiles más lentos

            setTimeout(() => {
                clearInterval(this.proyectilIntervalId); // Detiene el disparo después de 1 segundo
                if (!this.destruida) {
                    setTimeout(() => {
                        this.cooldown = false; // Reiniciar el cooldown después de 2 segundos
                    }, 2000);
                }
            }, 3000);
        };

        dispararProyectilesRapidos();
    }

    // Método para lanzar proyectiles desde la nave enemiga
    lanzarProyectil(velocidad) {
        if (!document.body.contains(this.nave)) {
            return; // Salir de la función si la nave ha sido eliminada
        }

        var proyectil = document.createElement('img');
        proyectil.classList.add('proyectil');
        proyectil.src = 'proyectil.png'; // Cambia esto por la URL de tus imágenes de proyectil
        proyectil.style.position = 'absolute';
        proyectil.style.left = (this.nave.offsetLeft + this.nave.clientWidth / 2 - 10) + 'px'; // Centrado horizontalmente
        proyectil.style.top = (this.nave.offsetTop + this.nave.clientHeight) + 'px'; // Desde la parte inferior de la nave
        document.body.appendChild(proyectil);

        function moverProyectil() {
            var topActual = parseFloat(proyectil.style.top);
            proyectil.style.top = (topActual + velocidad * 5) + 'px'; // Velocidad del proyectil multiplicada por la velocidad

            // Eliminar el proyectil si sale de la pantalla
            if (topActual > window.innerHeight) {
                proyectil.remove();
                clearInterval(intervalId);
            }
        }

        var intervalId = setInterval(moverProyectil, 20); // Mover el proyectil cada 20 ms
    }

    // Método para destruir la nave enemiga
    destruir() {
        this.destruida = true;
        clearInterval(this.intervalId); // Detener el movimiento de la nave
        clearInterval(this.dispararIntervalId); // Detener el disparo aleatorio
        clearInterval(this.proyectilIntervalId); // Detener el lanzamiento de proyectiles
        this.nave.remove(); // Eliminar la nave de la pantalla
    }
}

if (level==5 || level==6){
    window.addEventListener('load', crearEnemigoFinal);
}

if (level === 7 && fases === 1) {
    window.addEventListener('load', crearJefazo);

    let tiempoTotal = 30000; // Tiempo total en milisegundos (30 segundos)
    let tiempoIntervalo = 5000; // Intervalo de tiempo entre cada ejecución (5 segundos)
    let ejecucionesTotales = tiempoTotal / tiempoIntervalo; // Total de ejecuciones

    let contadores = 0; // Contador para llevar el control de las ejecuciones

    // Función para ejecutar crearEnemigoUnico() cada 5 segundos
    let intervalo = setInterval(() => {
        // Intervalo que llama a crearEnemigoUnico cada 5 segundos
        for (let index = 0; index < 3; index++) {
            crearEnemigoUnico();
        }
        
        contadores++;

        // Si se han alcanzado las 4 ejecuciones (4 veces cada 5 segundos = 20 segundos)
        if (contadores >= ejecucionesTotales * 4 / 6) {
            fases = 2; // Cambiar fases a 2 después de los 20 segundos (2/3 de 30 segundos)
            console.log(fases);
        }

        // Si ha pasado el tiempo total, detener el intervalo
        if (contadores >= ejecucionesTotales) {
            clearInterval(intervalo);
        }
    }, tiempoIntervalo);
}


// Función para crear el enemigo único
function crearEnemigoFinal() {
    var enemigoFinal = new EnemigoFinal();
    return enemigoFinal;
}

function crearEnemigoFinal2() {
    var enemigoFinal2 = new EnemigoFinal2();
    return enemigoFinal2;
}

function crearJefazo() {
    var jefazo = new Jefazo();
    return jefazo;
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

console.log(fases);