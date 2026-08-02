/* =========================================================================
   CONFIGURACIÓN PRINCIPAL
   Modifica estos valores para personalizar la invitación.
========================================================================= */
const CONFIG = {
    name: "Marco Raziel",                   // Nombre del festejado
    version: "30.0",                    // Edad o Versión
    date: "2026-09-19T20:00:00",        // Fecha del evento (ISO)
    displayDate: "19 Septiembre 2026",   // Fecha a mostrar en UI
    time: "19:00 HRS",
   location: "Gral. Abelardo Rodríguez", // Texto de ubicación
    mapsUrl: "https://maps.app.goo.gl/PwHiCsQFpyymqFBp9",  // Búsqueda para la URL de Maps
    whatsappNum: "527223957638",        // Tu número con código de país (sin +)
    whatsappMsg: "Hola. Confirmo mi asistencia a la fiesta de Maco. Nos vemos pronto.",
    giftText: "No te estreses con el regalo, si gustas puedes hacer un depósito al cumpleañero:",
    clabe: "638180010120572570" // Reemplaza con la cuenta real
};

/* =========================================================================
   1. INICIALIZACIÓN DE DATOS DINÁMICOS
========================================================================= */
function initConfigData() {
    document.querySelectorAll('[data-config]').forEach(el => {
        const key = el.getAttribute('data-config');
        if (CONFIG[key]) {
            el.textContent = CONFIG[key];
        }
    });
}

/* =========================================================================
   2. CURSOR PERSONALIZADO
========================================================================= */
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    // Usamos requestAnimationFrame para mayor fluidez
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
});

// Efecto hover sobre botones y enlaces
document.querySelectorAll('button, .card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

/* =========================================================================
   3. SECUENCIA DE ARRANQUE (TERMINAL) - 2 SEGUNDOS EXACTOS
========================================================================= */
const bootSequence = [
    `> iniciando cumple_v${CONFIG.version}.exe`,
    "> Cargando módulos principales... [OK]",
    "> Compilando recuerdos... [OK]",
    "> Estableciendo conexión segura... [OK]",
    "> Inicializando protocolos de fiesta...",
    "> Cargando pastel.js... [ÉXITO]",
    "> Obteniendo lista de amigos... [LISTO]"
];

const terminalText = document.getElementById('terminal-text');
const bootScreen = document.getElementById('boot-screen');
const app = document.getElementById('app');

async function typeTerminal() {
    // Escribimos el texto rápidamente para que encaje en el tiempo
    for (let i = 0; i < bootSequence.length; i++) {
        const line = document.createElement('div');
        terminalText.appendChild(line);
        await typeLine(line, bootSequence[i]);
        await delay(50); // Pausa súper corta entre líneas
    }
}

function typeLine(element, text) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, 5); // Velocidad de tipeo muy rápida
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// Control estricto de tiempo: Ocultar la pantalla a los 2 segundos exactos
setTimeout(() => {
    gsap.to(bootScreen, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            bootScreen.classList.add('hidden');
            app.classList.remove('hidden');
            initExperience();
        }
    });
}, 2000);

/* =========================================================================
   4. INICIO DE LA EXPERIENCIA (PARTÍCULAS Y ANIMACIONES)
========================================================================= */
function initExperience() {
    // Iniciar Particles.js (Estilo Nodos Cibernéticos)
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00F5FF", "#8A2BE2"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00FF9C", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    // Animar elementos al entrar usando GSAP e Intersection Observer
    const sections = document.querySelectorAll('.gsap-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

/* =========================================================================
   5. LÓGICA DE LA CUENTA REGRESIVA
========================================================================= */
const eventDate = new Date(CONFIG.date).getTime();

const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown-container').innerHTML = "<h3 style='color: var(--cyan); font-family: var(--font-mono);'>SISTEMA DESPLEGADO (¡Es hoy!)</h3>";
        return;
    }

    document.getElementById('days').textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

/* =========================================================================
   6. INTERACCIONES (MAPS, WHATSAPP, MÚSICA)
========================================================================= */

// Botón de Google Maps
document.getElementById('map-btn').addEventListener('click', () => {
    window.open(CONFIG.mapsUrl, '_blank');
});

// Botón de Confirmación (WhatsApp)
document.getElementById('commit-btn').addEventListener('click', function() {
    const btn = this;
    const originalText = btn.innerHTML;
    
    // Cambiar estado del botón
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ejecutando Commit...';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        // Restaurar botón
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';

        // Alerta de éxito elegante
        Swal.fire({
            title: '¡Commit Exitoso!',
            text: 'Redirigiendo a entorno seguro (WhatsApp)...',
            icon: 'success',
            background: '#0a0e27',
            color: '#00FF9C',
            confirmButtonColor: '#8A2BE2',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            const waUrl = `https://wa.me/${CONFIG.whatsappNum}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`;
            window.open(waUrl, '_blank');
        });
    }, 1500);
});

// Control de Música
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.style.color = "var(--cyan)";
        musicBtn.style.borderColor = "var(--cyan)";
        musicBtn.style.boxShadow = "0 0 15px rgba(0, 245, 255, 0.2)";
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.style.color = "var(--green)";
        musicBtn.style.borderColor = "var(--green)";
        musicBtn.style.boxShadow = "0 0 25px var(--green)";
    }
    isPlaying = !isPlaying;
});

/* =========================================================================
   7. EASTER EGGS (HUEVOS DE PASCUA)
========================================================================= */
let keyBuffer = '';
const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
let konamiBuffer = '';

document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    // Lógica para palabras secretas
    if (key.length === 1) { // Solo letras
        keyBuffer += key.toLowerCase();
        // Limitar tamaño del buffer para no gastar memoria
        if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);
        
        if (keyBuffer.includes('sudoparty')) {
            keyBuffer = ''; // reiniciar
            Swal.fire({
                title: 'Acceso Concedido',
                text: 'Has desbloqueado permisos de Administrador para la barra libre.',
                icon: 'success',
                background: '#0a0e27',
                color: '#00F5FF',
                confirmButtonColor: '#00FF9C'
            });
        }
        
        if (keyBuffer.includes('help')) {
            keyBuffer = ''; // reiniciar
            Swal.fire({
                title: 'Comandos de Terminal',
                html: '<ul><li style="text-align:left; color:#00FF9C">sudo party - Acceso Root</li><li style="text-align:left; color:#00F5FF">cake - Desplegar pastel virtual</li><li style="text-align:left; color:#8A2BE2">Código Konami - Desbloquea lógica secreta</li></ul>',
                background: '#0a0e27',
                color: '#fff',
                confirmButtonColor: '#8A2BE2'
            });
        }
        
        if (keyBuffer.includes('cake')) {
            keyBuffer = ''; // reiniciar
            Swal.fire({
                title: 'Desplegando Pastel...',
                text: '🎂 🍰 🧁',
                background: '#0a0e27',
                color: '#00FF9C',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    // Lógica para el Código Konami
    konamiBuffer += key;
    if (konamiBuffer.length > konamiCode.length) {
        konamiBuffer = konamiBuffer.slice(-konamiCode.length);
    }
    
    if (konamiBuffer === konamiCode) {
        konamiBuffer = '';
        document.body.style.filter = 'hue-rotate(90deg)'; // Efecto psicodélico suave
        Swal.fire({
            title: 'MODO DIOS ACTIVADO',
            text: '+30 Vidas extra añadidas a la base de datos.',
            imageUrl: 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif', // GIF Gamer
            imageWidth: 200,
            background: '#0a0e27',
            color: '#FF00FF',
            confirmButtonColor: '#FF00FF'
        });
    }
});

/* =========================================================================
   INICIAR SCRIPT AL CARGAR
========================================================================= */
window.onload = () => {
    initConfigData();
    // Prevenir el scroll durante la pantalla de inicio
    window.scrollTo(0, 0);
    // Iniciar escritura rápida de terminal
    typeTerminal();
};

// Botón de Copiar CLABE
document.getElementById('copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(CONFIG.clabe).then(() => {
        // Alerta tipo Toast (pequeña y elegante en la esquina)
        Swal.fire({
            title: '¡Copiado!',
            text: 'Cuenta guardada en el portapapeles',
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2500,
            background: '#0a0e27',
            color: '#00FF9C'
        });
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
});