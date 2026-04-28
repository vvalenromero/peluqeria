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
// ============================================
// FORMULARIO DE TESTIMONIOS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initTestimonioForm();
});

function initTestimonioForm() {
    const form = document.getElementById('form-testimonio');
    const textarea = document.getElementById('testimonio-comentario');
    const charCount = document.getElementById('char-count');
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('testimonio-calificacion');
    
    if (!form) return;
    
    // Contador de caracteres
    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = 500;
                charCount.style.color = '#ff6b6b';
            } else if (length > 450) {
                charCount.style.color = '#ffa726';
            } else {
                charCount.style.color = '';
            }
        });
    }
    
    // Estrellas de calificación
    if (stars.length && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                ratingInput.value = value;
                
                // Remover todas las clases active
                stars.forEach(s => s.classList.remove('active'));
                
                // Agregar clase active hasta la estrella seleccionada
                for (let i = 0; i < value; i++) {
                    stars[i].classList.add('active');
                }
            });
            
            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                
                // Remover todas las clases active
                stars.forEach(s => s.classList.remove('hover'));
                
                // Agregar clase hover hasta la estrella seleccionada
                for (let i = 0; i < value; i++) {
                    stars[i].classList.add('hover');
                }
            });
        });
        
        // Remover hover al salir del contenedor
        const ratingContainer = document.querySelector('.rating-stars');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', function() {
                stars.forEach(s => s.classList.remove('hover'));
            });
        }
    }
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarTestimonioForm(this)) {
            const testimonioData = {
                nombre: this.querySelector('#testimonio-nombre').value,
                email: this.querySelector('#testimonio-email').value,
                servicio: this.querySelector('#testimonio-servicio').options[this.querySelector('#testimonio-servicio').selectedIndex].text,
                calificacion: parseInt(this.querySelector('#testimonio-calificacion').value),
                comentario: this.querySelector('#testimonio-comentario').value
            };
            
            // Guardar en localStorage (para demostración)
            guardarTestimonioEnLocal(testimonioData);
            
            mostrarConfirmacionTestimonio();
            this.reset();
            
            // Resetear estrellas
            if (stars.length) {
                stars.forEach(s => s.classList.remove('active'));
            }
            if (ratingInput) {
                ratingInput.value = '';
            }
            
            // Resetear contador
            if (charCount) {
                charCount.textContent = '0';
                charCount.style.color = '';
            }
        }
    });
}

function validarTestimonioForm(form) {
    let esValido = true;
    const camposRequeridos = form.querySelectorAll('[required]');
    
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            esValido = false;
            campo.style.borderColor = '#ff6b6b';
            
            setTimeout(() => {
                campo.style.borderColor = '';
            }, 3000);
        }
    });
    
    // Validar calificación
    const calificacion = form.querySelector('#testimonio-calificacion');
    if (calificacion && !calificacion.value) {
        esValido = false;
        alert('Por favor, seleccioná una calificación con las estrellas');
        return false;
    }
    
    // Validar comentario mínimo
    const comentario = form.querySelector('#testimonio-comentario');
    if (comentario && comentario.value.trim().length < 10) {
        esValido = false;
        alert('Por favor, escribí un comentario más detallado (mínimo 10 caracteres)');
        comentario.focus();
        return false;
    }
    
    return esValido;
}

function mostrarConfirmacionTestimonio() {
    const modal = document.getElementById('modal-confirmacion');
    if (modal) {
        modal.querySelector('h3').textContent = '¡Testimonio enviado!';
        modal.querySelector('p').textContent = 'Gracias por compartir tu experiencia. Revisaremos tu comentario y lo publicaremos en 24-48 horas.';
        modal.classList.add('active');
        
        setTimeout(() => {
            modal.classList.remove('active');
        }, 5000);
    } else {
        alert('¡Testimonio enviado! Gracias por compartir tu experiencia.');
    }
}

// Cargar testimonios guardados en localStorage
function cargarTestimoniosGuardados() {
    const testimoniosGuardados = localStorage.getItem('testimonios_glow_hair');
    const contenedor = document.getElementById('testimonios-lista');
    
    if (!testimoniosGuardados || !contenedor) return;
    
    const testimonios = JSON.parse(testimoniosGuardados);
    
    if (testimonios.length > 0) {
        contenedor.innerHTML = '';
        
        testimonios.forEach(testimonio => {
            const testimonioHTML = crearTestimonioHTML(testimonio);
            contenedor.appendChild(testimonioHTML);
        });
    }
}

function crearTestimonioHTML(testimonio) {
    const div = document.createElement('div');
    div.className = 'testimonio-real';
    
    // Crear estrellas
    let estrellasHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= testimonio.calificacion) {
            estrellasHTML += '★';
        } else {
            estrellasHTML += '☆';
        }
    }
    
    const fecha = new Date(testimonio.fecha).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    
    div.innerHTML = `
        <div class="stars">${estrellasHTML}</div>
        <div class="testimonio-content">"${testimonio.comentario}"</div>
        <div class="testimonio-footer">
            <div class="author">${testimonio.nombre}</div>
            <div class="service">${testimonio.servicio}</div>
            <div class="date">${fecha}</div>
        </div>
    `;
    
    return div;
}

// Guardar testimonio en localStorage (para demostración)
function guardarTestimonioEnLocal(testimonio) {
    const testimoniosGuardados = localStorage.getItem('testimonios_glow_hair');
    let testimonios = [];
    
    if (testimoniosGuardados) {
        testimonios = JSON.parse(testimoniosGuardados);
    }
    
    testimonio.fecha = new Date().toISOString();
    testimonios.push(testimonio);
    
    localStorage.setItem('testimonios_glow_hair', JSON.stringify(testimonios));
    cargarTestimoniosGuardados();
}

window.addEventListener('load', function() {
    // Agregar clase loaded al body para animaciones de entrada
    document.body.classList.add('loaded');
    
    // Cargar testimonios guardados
    cargarTestimoniosGuardados();
});
/ / 
 
 V e r s i o n : 
 
 2 0 2 6 0 4 2 8 - 0 1 3 6 3 9 
 
 
