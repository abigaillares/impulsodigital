
// ==========================================
// IMPULSO DIGITAL - CONFIGURACIÓN
// ==========================================

// IMPORTANTE:
// Reemplazá el número por tu WhatsApp real.
// Formato argentino: 549 + código de área + número.
// No agregues +, espacios ni guiones.

const CONFIG = {
  whatsapp: "549XXXXXXXXXX",

  instagram: "https://www.instagram.com/impulsodigital.ar/"
};


// ==========================================
// MENÚ RESPONSIVE
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function cerrarMenu() {
  navLinks.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

menuToggle.addEventListener("click", () => {
  const abierto = navLinks.classList.toggle("active");

  menuToggle.setAttribute(
    "aria-expanded",
    String(abierto)
  );

  menuToggle.setAttribute(
    "aria-label",
    abierto ? "Cerrar menú" : "Abrir menú"
  );
});

// Cerrar menú al seleccionar una sección

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", cerrarMenu);
});

// Cerrar menú con Escape

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    cerrarMenu();
  }
});


// ==========================================
// ENLACES DE WHATSAPP
// ==========================================

function crearLinkWhatsapp(mensaje) {
  const numero = CONFIG.whatsapp.replace(/\D/g, "");

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

const botonesWhatsapp = document.querySelectorAll(
  ".whatsapp-link"
);

botonesWhatsapp.forEach(boton => {
  const mensaje = boton.dataset.message ||
    "Hola, quiero recibir información sobre Impulso Digital.";

  boton.addEventListener("click", event => {
    event.preventDefault();

    const numero = CONFIG.whatsapp.replace(/\D/g, "");

    // Evita abrir un enlace inválido si aún
    // no configuraste tu número.

    if (!/^\d{10,15}$/.test(numero)) {
      alert(
        "Primero configurá tu número de WhatsApp en script.js."
      );
      return;
    }

    window.open(
      crearLinkWhatsapp(mensaje),
      "_blank",
      "noopener,noreferrer"
    );
  });
});


// ==========================================
// INSTAGRAM
// ==========================================

const instagramLink = document.querySelector("#instagram-link");

if (instagramLink) {
  instagramLink.href = CONFIG.instagram;
}


// ==========================================
// AÑO AUTOMÁTICO EN FOOTER
// ==========================================

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// LOGO: RESPALDO SI NO CARGA LA IMAGEN
// ==========================================

const logo = document.querySelector(".brand img");
const brandFallback = document.querySelector(".brand-fallback");

if (logo && brandFallback) {
  logo.addEventListener("error", () => {
    logo.style.display = "none";
    brandFallback.style.display = "block";
  });
}


// ==========================================
// ANIMACIONES SUAVES AL HACER SCROLL
// ==========================================

const animatedElements = document.querySelectorAll(
  ".feature-card, .course-card, .step-card"
);

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

  animatedElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}
