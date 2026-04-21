// ============================================
// UTILIDADES Y CONFIGURACIÓN
// ============================================

const config = {
    animationDuration: 300,
    scrollSmooth: true
};

// ============================================
// NAVEGACIÓN Y SECCIONES
// ============================================

function showSection(sectionId) {
    // Ocultar todas las secciones con animación
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.classList.remove('active');
        }, config.animationDuration);
    });
    
    // Mostrar la sección seleccionada
    setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.opacity = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, config.animationDuration);
    
    // Actualizar nav activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
}

// Manejar clicks en navegación
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
            
            // Efecto visual al hacer clic
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // ============================================
    // VALIDACIÓN DE FORMULARIOS
    // ============================================

    // Formulario de Admisión
    const admissionForm = document.querySelector('.admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', handleAdmissionSubmit);
    }

    // Formulario de Contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // ============================================
    // EFECTOS EN CARDS
    // ============================================

    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach((card, index) => {
        // Animación de entrada
        card.style.animation = `slideInUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.1}s`;

        // Efecto al pasar el ratón
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 35px rgba(30, 58, 138, 0.25)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        });
    });

    // ============================================
    // EFECTOS EN ABOUT CARDS
    // ============================================

    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.15}s`;

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 35px rgba(30, 58, 138, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        });
    });

    // ============================================
    // EFECTOS EN BOTONES
    // ============================================

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Limpiar ripples anteriores
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(ripple);
        });

        // Efecto hover mejorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // INPUTS CON EFECTO FOCUS
    // ============================================

    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.borderColor = '#3b82f6';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            if (!this.value) {
                this.style.borderColor = '#e2e8f0';
            }
        });

        // Validación en tiempo real
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                validateEmail(this);
            });
        }

        if (input.type === 'tel') {
            input.addEventListener('input', function() {
                validatePhone(this);
            });
        }
    });

    // ============================================
    // ANIMACIÓN DE SCROLL
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section:not(.active)').forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // CONTADOR ANIMADO (si lo necesitas)
    // ============================================

    setupCounters();

    // ============================================
    // EFECTOS DE CARGA
    // ============================================

    setupLoadingEffects();
});

// ============================================
// VALIDACIÓN DE FORMULARIOS
// ============================================

function handleAdmissionSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validaciones básicas
    const nombre = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const carrera = form.querySelector('select').value;

    if (!nombre || !email || !carrera) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    if (!validateEmailFormat(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }

    // Simular envío
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        showNotification('¡Solicitud de admisión enviada correctamente!', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nombre = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const asunto = form.querySelectorAll('input[type="text"]')[1].value.trim();
    const mensaje = form.querySelector('textarea').value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    if (!validateEmailFormat(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }

    if (mensaje.length < 10) {
        showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
        return;
    }

    // Simular envío
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

function validateEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateEmail(input) {
    if (input.value && !validateEmailFormat(input.value)) {
        input.style.borderColor = '#ef4444';
    } else {
        input.style.borderColor = '#10b981';
    }
}

function validatePhone(input) {
    const value = input.value.replace(/\D/g, '');
    if (value.length >= 7 && value.length <= 15) {
        input.style.borderColor = '#10b981';
    } else if (input.value) {
        input.style.borderColor = '#ef4444';
    }
}

// ============================================
// NOTIFICACIONES
// ============================================

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.4s ease;
        backdrop-filter: blur(10px);
        ${type === 'success' ? 'background: linear-gradient(135deg, #10b981 0%, #059669 100%);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);' : ''}
        color: white;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(notification);

    // Auto-remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// ============================================
// CONTADOR ANIMADO
// ============================================

function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target) || 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ============================================
// EFECTOS DE CARGA
// ============================================

function setupLoadingEffects() {
    // Agregar efecto de carga al inicio
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// MODO OSCURO / CLARO (BONUS)
// ============================================

function setupThemeToggle() {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// ============================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ============================================

setupThemeToggle();

// Agregar estilos de animación CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }

    .notification-success {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .notification-error {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .notification-info {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    /* Smooth transition para todos los elementos */
    * {
        transition: all 0.3s ease;
    }

    body.loading {
        opacity: 0.7;
    }

    /* Focus outline mejorado */
    *:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;

document.head.appendChild(style);
