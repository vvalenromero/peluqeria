// Glow Hair Studio - JavaScript
// Script principal para la pagina de la peluqueria

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavbar();
    initSmoothScroll();
    initBookingForm();
    initMobileMenu();
    initScrollAnimations();
});

// ============================================
// NAVBAR - Efecto de scroll
// ============================================
function initNavbar() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Cambiar estilo del navbar al hacer scroll
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(212, 165, 165, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(212, 165, 165, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ============================================
// MENU MOVIL
// ============================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animacion del hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menu al hacer click en un link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ============================================
// SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// FORMULARIO DE RESERVAS
// ============================================
function initBookingForm() {
    const form = document.getElementById('form-reserva');
    const modal = document.getElementById('modal-confirmacion');
    const btnCerrar = document.querySelector('.btn-cerrar-modal');
    
    if (form) {
        // Establecer fecha minima como hoy
        const fechaInput = document.getElementById('fecha');
        const today = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', today);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar el formulario
            if (validarFormulario(form)) {
                // Simular envio
                mostrarConfirmacion();
                form.reset();
            }
        });
    }
    
    if (btnCerrar && modal) {
        btnCerrar.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        // Cerrar modal al hacer click fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}

// Validar formulario
function validarFormulario(form) {
    let esValido = true;
    const camposRequeridos = form.querySelectorAll('[required]');
    
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            esValido = false;
            campo.style.borderColor = '#ff6b6b';
            
            // Quitar error despues de 3 segundos
            setTimeout(() => {
                campo.style.borderColor = '';
            }, 3000);
        }
    });
    
    // Validar telefono (solo numeros)
    const telefono = form.querySelector('#telefono');
    if (telefono && telefono.value) {
        const telefonoLimpio = telefono.value.replace(/\D/g, '');
        if (telefonoLimpio.length < 8) {
            esValido = false;
            alert('Por favor, ingresa un numero de telefono valido');
            telefono.focus();
        }
    }
    
    return esValido;
}

// Mostrar confirmacion
function mostrarConfirmacion() {
    const modal = document.getElementById('modal-confirmacion');
    if (modal) {
        modal.classList.add('active');
        
        // Cerrar automaticamente despues de 5 segundos
        setTimeout(() => {
            modal.classList.remove('active');
        }, 5000);
    }
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementosAnimar = document.querySelectorAll(
        '.servicio-card, .testimonio-card, .blog-card, .galeria-item'
    );
    
    elementosAnimar.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Agregar clase de animacion
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}

// ============================================
// UTILIDADES
// ============================================

// Formatear precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(precio);
}

// Obtener fecha actual formateada
function obtenerFechaActual() {
    const fecha = new Date();
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return fecha.toLocaleDateString('es-ES', opciones);
}

// Copiar al portapapeles
async function copiarAlPortapapeles(texto) {
    try {
        await navigator.clipboard.writeText(texto);
        return true;
    } catch (err) {
        console.error('Error al copiar:', err);
        return false;
    }
}

// ============================================
// NEWSLETTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simular suscripcion
                alert('Gracias por suscribirte! Recibiras nuestras novedades en: ' + email);
                this.reset();
            }
        });
    }
});

// ============================================
// PRELOADER (opcional)
// ============================================
window.addEventListener('load', function() {
    // Agregar clase loaded al body para animaciones de entrada
    document.body.classList.add('loaded');
});
/ /  
 V e r s i o n :  
 2 0 2 6 0 4 2 8 - 0 1 3 6 3 9  
 