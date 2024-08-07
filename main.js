import { hotelData } from './detalleHotel.js';

// Configuración del menú y de ScrollReveal
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

// Configuración de ScrollReveal para las tarjetas de habitación
ScrollReveal().reveal(".room__card", {
    ...scrollRevealOption,
    interval: 500,
});

// Función para el toggle de secciones
window.toggleContent = function() {
    const normalSection = document.getElementById('normalSection');
    const specialSection = document.getElementById('specialSection');
    const switchToggle = document.getElementById('toggleSwitch');

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
function updatePrice() {
    const dateInputs = document.querySelectorAll('.date-input');

    dateInputs.forEach(input => {
        flatpickr(input, {
            mode: "range", // Permite seleccionar un rango de fechas
            dateFormat: "d-M-Y", // Formato: día-mes-año
            onChange: function(selectedDates, dateStr, instance) {
                let totalPrice = 0;
                const priceDetails = [];

                // Asegúrate de que se ha seleccionado un rango válido
                if (selectedDates.length === 2) {
                    const [startDate, endDate] = selectedDates;

                    const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
                    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));

                    // Obtener el nombre del hotel del input
                    const hotelName = instance.element.dataset.hotel;
                    // Obtener el tipo de cliente basado en la selección del usuario
                    const customerType = document.getElementById('customer-type').value;

                    for (let i = 0; i <= diffDays; i++) {
                        const date = new Date(startDate.getTime() + i * oneDay);
                        const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
                        const isWeekend = day === 0 || day === 6;
                        const rateType = isWeekend ? "weekends" : "weekdays";

                        if (hotelData[hotelName]) {
                            const price = hotelData[hotelName].rates[rateType][customerType];
                            totalPrice += price;
                            priceDetails.push({
                                date: date.toLocaleDateString('en-GB'), // Formato: dd/mm/yyyy
                                price: price
                            });
                        }
                    }

                    // Muestra el precio total
                    const priceDisplayId = instance.element.dataset.priceDisplay;
                    const priceDisplay = document.getElementById(priceDisplayId);
                    priceDisplay.textContent = `Precio Total: $${totalPrice}`;

                    // Muestra el desglose de precios por día
                    const breakdownDisplay = document.getElementById('price-breakdown');
                    if (breakdownDisplay) {
                        breakdownDisplay.innerHTML = '<h3>Precio Detallado por Día:</h3>';
                        priceDetails.forEach(detail => {
                            const p = document.createElement('p');
                            p.textContent = `${detail.date}: $${detail.price}`;
                            breakdownDisplay.appendChild(p);
                        });
                    }
                } else {
                    // Maneja el caso donde no se ha seleccionado un rango válido
                    const priceDisplayId = instance.element.dataset.priceDisplay;
                    const priceDisplay = document.getElementById(priceDisplayId);
                    priceDisplay.textContent = 'Seleccione un rango de fechas válido';
                }
            }
        });
    });
}

// Ejecuta la función para configurar los calendarios y actualizar precios
document.addEventListener('DOMContentLoaded', updatePrice);

// Funcionalidad para encontrar el hotel más barato
document.getElementById('find-cheapest').addEventListener('click', function() {
    const arrivalDate = new Date(document.getElementById('arrival').value);
    const departureDate = new Date(document.getElementById('departure').value);
    const customerType = document.getElementById('customer-type').value;

    if (arrivalDate && departureDate && arrivalDate < departureDate) {
        const totalNights = Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
        let cheapestHotel = null;
        let cheapestPrice = Infinity;

        for (const hotel in hotelData) {
            const rates = hotelData[hotel].rates;
            let totalPrice = 0;

            for (let date = new Date(arrivalDate); date < departureDate; date.setDate(date.getDate() + 1)) {
                const day = date.getDay();
                const isWeekend = day === 0 || day === 6;
                const rateType = isWeekend ? "weekends" : "weekdays";
                totalPrice += rates[rateType][customerType];
            }

            if (totalPrice < cheapestPrice) {
                cheapestPrice = totalPrice;
                cheapestHotel = hotel;
            }
        }

        const modal = document.getElementById('cheapest-hotel-modal');
        if (cheapestHotel) {
            document.getElementById('hotel-name').textContent = `Hotel: ${cheapestHotel}`;
            document.getElementById('hotel-rating').textContent = `Rating: ${hotelData[cheapestHotel].rating}`;
            document.getElementById('hotel-price-per-night').textContent = `Price per Night: $${hotelData[cheapestHotel].rates.weekdays[customerType]}`;
            document.getElementById('total-cost').textContent = `Total Cost: $${cheapestPrice}`;
            modal.style.display = 'block'; // Muestra la tarjeta emergente
        } else {
            document.getElementById('hotel-name').textContent = `Hotel: Not found`;
            document.getElementById('hotel-rating').textContent = '';
            document.getElementById('hotel-price-per-night').textContent = '';
            document.getElementById('total-cost').textContent = `Total Cost: $0`;
            modal.style.display = 'block'; // Muestra la tarjeta emergente
        }
    } else {
        alert('Please enter valid dates.');
    }
});

// Cerrar el modal cuando se haga clic en el botón de cierre
document.getElementById('close-modal').addEventListener('click', function() {
    const modal = document.getElementById('cheapest-hotel-modal');
    if (modal) {
        modal.style.display = 'none'; // Oculta el modal
    }
});

// Cerrar el modal cuando se haga clic fuera del contenido del modal
window.onclick = function(event) {
    const modal = document.getElementById('cheapest-hotel-modal');
    if (modal && event.target === modal) {
        modal.style.display = 'none'; // Oculta el modal
    }
};
