document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('[data-target]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Oculta todas las secciones
                document.querySelectorAll('.seccion').forEach(section => {
                    section.classList.remove('activa');
                });
                
                // Muestra la sección objetivo
                targetSection.classList.add('activa');
                
                // Desplazamiento suave opcional
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Mostrar la primera sección al cargar la página (opcional)
    document.querySelector('.seccion')?.classList.add('activa');
});