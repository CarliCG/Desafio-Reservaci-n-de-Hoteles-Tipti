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


// Funcion del toggle
function toggleContent() {
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
}
// Ejecuta la función al cargar la página para establecer el estado inicial
window.onload = function() {
  toggleContent();
};
//Funcionalidad del calendario de las tarjetas de habitaciones
function updatePrice(event) {
  const dateInput = event.target;
  const selectedDate = new Date(dateInput.value);
  const dayOfWeek = selectedDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  
  let price;
  
  if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Sábado o Domingo
      price = "$80";
  } else {
      // Lunes a Viernes
      price = "$100";
  }
  
  const priceDisplayId = dateInput.getAttribute('data-price-display');
  const priceDisplay = document.getElementById(priceDisplayId);
  priceDisplay.textContent = `Precio: ${price} por noche.`;
}

// Añadir el evento a todos los inputs de fecha
document.querySelectorAll('.date-input').forEach(input => {
  input.addEventListener('change', updatePrice);
});
