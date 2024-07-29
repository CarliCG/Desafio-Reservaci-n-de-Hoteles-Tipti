import { hotelData } from './detalleHotel.js';

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

// room container
ScrollReveal().reveal(".room__card", {
    ...scrollRevealOption,
    interval: 500,
});

// Define the toggleContent function in the global scope
window.toggleContent = function() {
    var normalSection = document.getElementById('normalSection');
    var specialSection = document.getElementById('specialSection');
    var switchToggle = document.getElementById('toggleSwitch');

    if (switchToggle.checked) {
        normalSection.style.opacity = '0.2';
        normalSection.style.pointerEvents = 'none'; // Desactiva la interacción
        specialSection.style.opacity = '1';
        specialSection.style.pointerEvents = 'auto'; // Activa la interacción
    } else {
        normalSection.style.opacity = '1';
        normalSection.style.pointerEvents = 'auto'; // Activa la interacción
        specialSection.style.opacity = '0.2';
        specialSection.style.pointerEvents = 'none'; // Desactiva la interacción
    }
};

// Ejecuta la función al cargar la página para establecer el estado inicial
window.onload = function() {
    toggleContent();
};

// Funcionalidad del calendario de las tarjetas de habitaciones
// Funcionalidad del calendario de las tarjetas de habitaciones
function updatePrice() {
  const dateInputs = document.querySelectorAll('.date-input');
  
  dateInputs.forEach(input => {
      input.addEventListener('change', (event) => {
          const selectedDate = new Date(event.target.value);
          const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
          const isWeekend = day === 0 || day === 6;
          const rateType = isWeekend ? "weekends" : "weekdays";
          const hotelName = event.target.dataset.hotel;
          const priceDisplayId = event.target.dataset.priceDisplay;
          const priceDisplay = document.getElementById(priceDisplayId);
          
          if (hotelData[hotelName]) {
              const customerType = "Rewards"; // Usar "Rewards" para la sección especial
              const price = hotelData[hotelName].rates[rateType][customerType];
              priceDisplay.textContent = `Precio: $${price}`;
          } else {
              priceDisplay.textContent = 'Datos no encontrados';
          }
      });
  });
}

document.addEventListener('DOMContentLoaded', updatePrice);
