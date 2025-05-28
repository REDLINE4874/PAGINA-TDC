document.addEventListener("DOMContentLoaded", function () {
  /***************************************/
  /* 1. MENÚ HAMBURGUESA */
  /***************************************/
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector(".navbar")?.prepend(menuToggle);

  menuToggle.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    navLinks?.classList.toggle("active");
  });

  // Navegación entre secciones
  const links = document.querySelectorAll("[data-target]");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        document.querySelectorAll(".seccion").forEach((section) => {
          section.classList.remove("activa");
        });
        targetSection.classList.add("activa");

        if (window.innerWidth <= 992) {
          document.querySelector(".nav-links")?.classList.remove("active");
        }

        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  /***************************************/
  /* 2. CALCULADORA DE PUNTOS */
  /***************************************/
  const bonificaciones = {
    CLASICA: "5%",
    ORO: "7%",
    PLATINUM: "10%",
  };

  const porcentajes = {
    CLASICA: 0.05,
    ORO: 0.07,
    PLATINUM: 0.1,
  };

  function actualizarBonificacion() {
    const tarjeta = document.getElementById("tarjeta")?.value;
    if (!tarjeta) return;

    document.getElementById("bonificacion").textContent =
      bonificaciones[tarjeta] || "0%";
    calcularPuntos();
  }

  function calcularPuntos() {
    const tarjeta = document.getElementById("tarjeta")?.value;
    const gasto = parseFloat(document.getElementById("gasto")?.value) || 0;

    const porcentaje = porcentajes[tarjeta] || 0;
    const puntos = Math.round(gasto * porcentaje);
    const equivalencia = puntos * 0.1;

    document.getElementById("puntosObtenidos").textContent = puntos;
    document.getElementById(
      "equivalencia"
    ).textContent = `$${equivalencia.toFixed(2)}`;

    if (window.innerWidth <= 768) actualizarBonificacionMobile();
  }

  function actualizarBonificacionMobile() {
    const tarjeta = document.getElementById("tarjeta-mobile")?.value;
    if (!tarjeta) return;

    document.getElementById("bonificacion-mobile").textContent =
      bonificaciones[tarjeta] || "0%";
    calcularPuntosMobile();
  }

  function calcularPuntosMobile() {
    const tarjeta = document.getElementById("tarjeta-mobile")?.value;
    const gasto =
      parseFloat(document.getElementById("gasto-mobile")?.value) || 0;

    const porcentaje = porcentajes[tarjeta] || 0;
    const puntos = Math.round(gasto * porcentaje);
    const equivalencia = puntos * 0.1;

    document.getElementById("puntosObtenidos-mobile").textContent = puntos;
    document.getElementById(
      "equivalencia-mobile"
    ).textContent = `$${equivalencia.toFixed(2)}`;

    if (window.innerWidth > 768) actualizarBonificacion();
  }

  function syncCalculations() {
    const tarjetaValue =
      window.innerWidth <= 768
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
  /* 3. INICIALIZACIÓN DE EVENTOS */
  /***************************************/
  const tarjeta = document.getElementById("tarjeta");
  const gasto = document.getElementById("gasto");
  const tarjetaMobile = document.getElementById("tarjeta-mobile");
  const gastoMobile = document.getElementById("gasto-mobile");

  tarjeta?.addEventListener("change", () => {
    actualizarBonificacion();
    syncCalculations();
  });

  gasto?.addEventListener("input", () => {
    calcularPuntos();
    syncCalculations();
  });

  tarjetaMobile?.addEventListener("change", () => {
    actualizarBonificacionMobile();
    syncCalculations();
  });

  gastoMobile?.addEventListener("input", () => {
    calcularPuntosMobile();
    syncCalculations();
  });

  window.addEventListener("resize", syncCalculations);

  if (tarjeta || tarjetaMobile) {
    syncCalculations();
  }

  /***************************************/
  /* 4. MODALES */
  /***************************************/
  const modalContainer = document.getElementById("modalContainer");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalContent = document.getElementById("modalContent");
  const cerrarBtn = document.querySelector(".cerrar");

  let modalContents = {};

  fetch("modales.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar modales.json");
      }
      return response.json();
    })
    .then((data) => {
      modalContents = data;

      document.querySelectorAll(".boton-modal").forEach((button) => {
        button.addEventListener("click", function () {
          const modalType = this.dataset.modal;
          const modalData = modalContents[modalType];

          if (modalData && modalContent && modalTitulo && modalContainer) {
            modalTitulo.textContent = modalData.titulo;
            modalContent.innerHTML = modalData.contenido;
            modalContainer.style.display = "block";
          } else {
            modalTitulo.textContent = "";
            modalContent.innerHTML = "<p>Contenido no disponible.</p>";
            modalContainer.style.display = "block";
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar modales.json:", error);
    });

  cerrarBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });
});
