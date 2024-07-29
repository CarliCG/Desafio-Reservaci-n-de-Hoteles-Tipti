# Proyecto Booking Hotelero

Este proyecto es una aplicación web para una cadena hotelera en Miami que ofrece servicios de reservación de habitaciones en línea. La cadena tiene tres hoteles: Lakewood, Bridgewood y Ridgewood. Cada hotel tiene tarifas diferentes para días de semana y fines de semana (sábado y domingo), así como tarifas especiales para clientes con recompensas como parte del programa de lealtad. Además, cada hotel tiene una calificación asignada.

## Hoteles y Tarifas

### Lakewood
- **Calificación:** 3 estrellas
- **Tarifas:**
  - **Días de semana:**
    - Cliente regular: $110
    - Cliente con recompensas: $80
  - **Fines de semana:**
    - Cliente regular: $90
    - Cliente con recompensas: $80

### Bridgewood
- **Calificación:** 4 estrellas
- **Tarifas:**
  - **Días de semana:**
    - Cliente regular: $160
    - Cliente con recompensas: $110
  - **Fines de semana:**
    - Cliente regular: $60
    - Cliente con recompensas: $50

### Ridgewood
- **Calificación:** 5 estrellas
- **Tarifas:**
  - **Días de semana:**
    - Cliente regular: $220
    - Cliente con recompensas: $100
  - **Fines de semana:**
    - Cliente regular: $150
    - Cliente con recompensas: $40

## Funcionalidades

### Barra de Booking
- **Selector de Cliente:** Permite elegir si el cliente es regular o con recompensas.
- **Selector de Fechas:** Permite seleccionar las fechas de check-in y check-out.
- **Cálculo del Precio:** Botón que calcula el costo total basado en el número de noches y el tipo de cliente.

### Ventana del Hotel Más Económico
- **Mostrar Hotel Más Económico:** Muestra una tarjeta con el nombre del hotel más barato entre las fechas seleccionadas y el tipo de cliente.
- **Detalle del Precio:** Muestra el valor por noche y el costo total.

### Hoteles y Tarifas
Sección "Discover Our Hotels" donde se ven los hoteles de la cadena hotelera y su calificación. (Recomendación: mejorar el diseño responsivo y agregar información específica al hacer clic en la tarjeta del hotel).

### Habitaciones Según el Hotel
Sección con un toggle que permite alternar entre precios normales (cliente REGULAR) y precios de membresía (cliente con recompensas). Cuando una sección está disponible, la otra no está disponible.

En estas tarjetas también se puede escoger la fecha de estadía para calcular el total. (Recomendación: agregar la opción de validar si el cliente es REGULAR o de RECOMPENSA para poder realizar la compra).

## Cómo Acceder a la Página

Para iniciar el proyecto, abre una terminal y ejecuta el siguiente comando:
npm start

Despliegue en vercel : desafio-reservaci-n-de-hoteles-tipti.vercel.app
