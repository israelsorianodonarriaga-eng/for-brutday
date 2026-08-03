/* =========================================================================
   CONFIGURACIÓN PRINCIPAL
   Modifica estos valores para personalizar la invitación.
========================================================================= */
const CONFIG = {
    name: "Marco Raziel",                   // Nombre del festejado
    version: "30.0",                    // Edad o Versión
    date: "2026-09-19T20:00:00",        // Fecha del evento (ISO)
    displayDate: "19 Septiembre 2026",   // Fecha a mostrar en UI
    time: "16:00 HRS",
   location: "Gral. Abelardo Rodríguez 301 Interior D", // Texto de ubicación
    mapsUrl: "https://maps.app.goo.gl/PwHiCsQFpyymqFBp9",  // Búsqueda para la URL de Maps
    whatsappNum: "527223957638",        // Tu número con código de país (sin +)
    beneficiario: "Marco Raziel Bartolo Medina", // <--- NUEVA LÍNEA AQUÍ
    whatsappMsg: "Hola. Confirmo mi asistencia a la fiesta de Marco. Nos vemos pronto.",
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
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
});

document.querySelectorAll('button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

/* =========================================================================
   3. SECUENCIA DE ARRANQUE (CARGA AMIGABLE)
========================================================================= */
const bootSequence = [
    `> Preparando la gran sorpresa...`,
    "> Cargando los mejores recuerdos... [OK]",
    "> Sintonizando buena música... [OK]",
    "> Preparando la celebración... [OK]",
    "> ¡Todo listo para festejar juntos!"
];

const terminalText = document.getElementById('terminal-text');
const bootScreen = document.getElementById('boot-screen');
const app = document.getElementById('app');

async function typeTerminal() {
    for (let i = 0; i < bootSequence.length; i++) {
        const line = document.createElement('div');
        terminalText.appendChild(line);
        await typeLine(line, bootSequence[i]);
        await delay(40);
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
        }, 5);
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

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
            }
        },
        "retina_detect": true
    });

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
    init3DPlane();
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
        document.querySelector('.countdown-container').innerHTML = "<h3 style='color: var(--cyan); font-family: var(--font-mono);'>¡Llegó el gran día!</h3>";
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
document.getElementById('map-btn').addEventListener('click', () => {
    window.open(CONFIG.mapsUrl, '_blank');
});

document.getElementById('commit-btn').addEventListener('click', function() {
    const btn = this;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ejecutando Commit...';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';

        Swal.fire({
            title: '¡Asistencia Confirmada!',
            text: 'Te estamos redirigiendo a WhatsApp...',
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
    if (key.length === 1) {
        keyBuffer += key.toLowerCase();
        if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);
        
        if (keyBuffer.includes('sudoparty')) {
            keyBuffer = '';
            Swal.fire({
                title: '¡Acceso Concedido!',
                text: 'Has desbloqueado permisos de Administrador para la barra libre.',
                icon: 'success',
                background: '#0a0e27',
                color: '#00F5FF',
                confirmButtonColor: '#00FF9C'
            });
        }
    }

    konamiBuffer += key;
    if (konamiBuffer.length > konamiCode.length) {
        konamiBuffer = konamiBuffer.slice(-konamiCode.length);
    }
    
    if (konamiBuffer === konamiCode) {
        konamiBuffer = '';
        document.body.style.filter = 'hue-rotate(90deg)';
        Swal.fire({
            title: '¡MODO FIESTA ACTIVADO!',
            text: '+30 Vidas extra añadidas a la diversión.',
            background: '#0a0e27',
            color: '#FF00FF',
            confirmButtonColor: '#FF00FF'
        });
    }
});

window.onload = () => {
    initConfigData();
    window.scrollTo(0, 0);
    typeTerminal();
};

/* =========================================================================
   FUNCIÓN PARA COPIAR DATOS
========================================================================= */
function setupCopyButton(btnId, textId, successMsg) {
    document.getElementById(btnId).addEventListener('click', () => {
        const textToCopy = document.getElementById(textId).innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            Swal.fire({
                title: '¡Copiado!',
                text: successMsg,
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
}

setupCopyButton('copy-name-btn', 'name-text', 'Nombre guardado en el portapapeles');
setupCopyButton('copy-clabe-btn', 'clabe-text', 'Cuenta guardada en el portapapeles');

/* =========================================================================
   ANIMACIÓN 3D (THREE.JS)
========================================================================= */
function init3DPlane() {
    const container = document.getElementById('arrival-3d-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(4, 12, 3);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00FF9C,
        wireframe: true,
        transparent: true,
        opacity: 0.9
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2.2;
    plane.rotation.z = -Math.PI / 6;
    scene.add(plane);

    camera.position.z = 25;
    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.03;
        plane.position.y = Math.sin(time) * 1.5;
        plane.rotation.y = Math.sin(time * 0.5) * 0.3;
        renderer.render(scene, camera);
    }
    
    animate();

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}