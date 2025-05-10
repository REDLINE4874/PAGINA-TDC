// Menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').prepend(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    // Tu código existente para las secciones...
    const links = document.querySelectorAll('[data-target]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                document.querySelectorAll('.seccion').forEach(section => {
                    section.classList.remove('activa');
                });
                targetSection.classList.add('activa');
                
                // Cierra el menú en móviles después de seleccionar
                if (window.innerWidth <= 992) {
                    document.querySelector('.nav-links').classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
