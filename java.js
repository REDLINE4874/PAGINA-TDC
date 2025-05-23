document.addEventListener('DOMContentLoaded', function() {
    /***************************************/
    /* 1. CÓDIGO DEL MENÚ HAMBURGUESA */
    /***************************************/
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').prepend(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    // Navegación entre secciones
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
    
    /***************************************/
    /* 2. CÓDIGO DE LA CALCULADORA DE PUNTOS */
    /***************************************/
    
    // Funciones para versión escritorio
    function actualizarBonificacion() {
        const tarjeta = document.getElementById("tarjeta")?.value;
        if (!tarjeta) return;
        
        const bonificaciones = {
            "CLASICA": "5%",
            "ORO": "7%",
            "PLATINUM": "10%"
        };
        
        const bonificacion = bonificaciones[tarjeta] || "0%";
        document.getElementById("bonificacion").textContent = bonificacion;
        calcularPuntos();
    }
    
    function calcularPuntos() {
        const tarjeta = document.getElementById("tarjeta")?.value;
        const gasto = parseFloat(document.getElementById("gasto")?.value) || 0;
        
        const porcentajes = {
            "CLASICA": 0.05,
            "ORO": 0.07,
            "PLATINUM": 0.10
        };
        
        const porcentaje = porcentajes[tarjeta] || 0;
        const puntos = Math.round(gasto * porcentaje);
        const equivalencia = puntos * 0.10;
        
        if (document.getElementById("puntosObtenidos")) {
            document.getElementById("puntosObtenidos").textContent = puntos;
        }
        if (document.getElementById("equivalencia")) {
            document.getElementById("equivalencia").textContent = `$${equivalencia.toFixed(2)}`;
        }
        
        // Sincronizar con versión móvil si existe
        if (window.innerWidth <= 768) {
            actualizarBonificacionMobile();
        }
    }
    
    // Funciones para versión móvil
    function actualizarBonificacionMobile() {
        const tarjeta = document.getElementById("tarjeta-mobile")?.value;
        if (!tarjeta) return;
        
        const bonificaciones = {
            "CLASICA": "5%",
            "ORO": "7%",
            "PLATINUM": "10%"
        };
        
        const bonificacion = bonificaciones[tarjeta] || "0%";
        document.getElementById("bonificacion-mobile").textContent = bonificacion;
        calcularPuntosMobile();
    }
    
    function calcularPuntosMobile() {
        const tarjeta = document.getElementById("tarjeta-mobile")?.value;
        const gasto = parseFloat(document.getElementById("gasto-mobile")?.value) || 0;
        
        const porcentajes = {
            "CLASICA": 0.05,
            "ORO": 0.07,
            "PLATINUM": 0.10
        };
        
        const porcentaje = porcentajes[tarjeta] || 0;
        const puntos = Math.round(gasto * porcentaje);
        const equivalencia = puntos * 0.10;
        
        if (document.getElementById("puntosObtenidos-mobile")) {
            document.getElementById("puntosObtenidos-mobile").textContent = puntos;
        }
        if (document.getElementById("equivalencia-mobile")) {
            document.getElementById("equivalencia-mobile").textContent = `$${equivalencia.toFixed(2)}`;
        }
        
        // Sincronizar con versión escritorio si existe
        if (window.innerWidth > 768) {
            actualizarBonificacion();
        }
    }
    
    // Sincronización entre versiones
    function syncCalculations() {
        const tarjetaValue = window.innerWidth <= 768 
            ? document.getElementById("tarjeta-mobile")?.value
            : document.getElementById("tarjeta")?.value;
        
        if (tarjetaValue) {
            if (window.innerWidth <= 768) {
                document.getElementById("tarjeta").value = tarjetaValue;
                actualizarBonificacion();
            } else {
                document.getElementById("tarjeta-mobile").value = tarjetaValue;
                actualizarBonificacionMobile();
            }
        }
    }
    
    /***************************************/
    /* INICIALIZACIÓN DE EVENTOS */
    /***************************************/
    
    // Eventos para versión escritorio
    if (document.getElementById("tarjeta")) {
        document.getElementById("tarjeta").addEventListener("change", function() {
            actualizarBonificacion();
            syncCalculations();
        });
    }
    
    if (document.getElementById("gasto")) {
        document.getElementById("gasto").addEventListener("input", function() {
            calcularPuntos();
            syncCalculations();
        });
    }
    
    // Eventos para versión móvil
    if (document.getElementById("tarjeta-mobile")) {
        document.getElementById("tarjeta-mobile").addEventListener("change", function() {
            actualizarBonificacionMobile();
            syncCalculations();
        });
    }
    
    if (document.getElementById("gasto-mobile")) {
        document.getElementById("gasto-mobile").addEventListener("input", function() {
            calcularPuntosMobile();
            syncCalculations();
        });
    }
    
    // Sincronizar al cambiar tamaño de pantalla
    window.addEventListener('resize', syncCalculations);
    
    // Inicializar calculadora
    if (document.getElementById("tarjeta") || document.getElementById("tarjeta-mobile")) {
        syncCalculations();
    }
});