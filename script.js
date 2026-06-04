document.addEventListener("DOMContentLoaded", function() {
    
    // Hace que los elementos aparezcan de forma suave
    const elementosFade = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    elementosFade.forEach(elemento => {
        observer.observe(elemento);
    });

    // Hace que al pulsar en el menú te lleve a la sección patinando y no de golpe
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
    // =========================================
    // CONTROL DEL MENÚ HAMBURGUESA Y TELÉFONO
    // =========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const btnTelefono = document.getElementById('btn-telefono');
    const modalTelefono = document.getElementById('modal-telefono');
    const cerrarModal = document.getElementById('cerrar-modal');

    // Al pulsar la hamburguesa, el menú entra o sale
    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });
    }

    // Si pulsamos un enlace del menú, se cierra solo
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('activo');
        });
    });

    // Al pulsar el teléfono de arriba a la derecha, abre la ventana
    if(btnTelefono) {
        btnTelefono.addEventListener('click', () => {
            modalTelefono.classList.add('activo');
        });
    }

    // Al pulsar la 'X', se cierra la ventana del teléfono
    if(cerrarModal) {
        cerrarModal.addEventListener('click', () => {
            modalTelefono.classList.remove('activo');
        });
    }

    // Si tocamos fuera de la caja, también se cierra
    window.addEventListener('click', (e) => {
        if (e.target === modalTelefono) {
            modalTelefono.classList.remove('activo');
        }
    });

});
