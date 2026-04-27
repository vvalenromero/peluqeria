# Glow Hair Studio - Pagina Web

Pagina web profesional para peluqueria con diseno moderno en tonos pasteles.

---

## Caracteristicas

- **Diseño responsive**: Se ve perfecto en celular, tablet y computadora
- **Paleta de colores pastel**: Rosa, lavanda, beige y tonos suaves
- **Secciones incluidas**:
  - Inicio con presentacion impactante
  - Servicios (8 servicios diferentes)
  - Galeria de trabajos
  - Testimonios de clientes
  - Sistema de reservas online
  - Blog con consejos
  - Contacto y ubicacion

---

## Archivos del proyecto

```
Documents/
├── index.html          # Pagina principal
├── styles.css          # Estilos (colores, diseno)
├── script.js           # Funcionalidades interactivas
├── README.md           # Este archivo
└── GUIA_REDES_SOCIALES.md  # Guia para crear redes
```

---

## Como usar la pagina

### 1. Ver la pagina

Simplemente abri el archivo `index.html` en tu navegador (Chrome, Firefox, Safari, etc.)

### 2. Personalizar los datos

Abri el archivo `index.html` con un editor de texto (Bloco de notas, VS Code, etc.) y busca los textos entre corchetes `[...]` para reemplazarlos:

#### Nombre del negocio (Linea ~19 y ~540)
Busca: `Glow Hair Studio`
Cambia por el nombre que elijas.

#### Telefono (Linea ~348 y ~459)
Busca: `[Tu telefono]`
Cambia por tu numero real.

#### Direccion (Linea ~352 y ~450)
Busca: `[Tu direccion]`
Cambia por tu direccion real.

#### Email (Linea ~358)
Busca: `[tuemail@ejemplo.com]`
Cambia por tu email real.

#### Precios de servicios (Lineas ~120-180)
Busca los precios que dicen `Desde $X.XXX` y cambialos por los tuyos.

---

## Como agregar fotos reales

### Galeria (Linea ~226-260)
Reemplaza los `galeria-placeholder` por imagenes reales:

```html
<!-- En lugar de esto: -->
<div class="galeria-placeholder">
    <i class="fas fa-image"></i>
    <span>Corte moderno</span>
</div>

<!-- Usa esto: -->
<img src="fotos/corte1.jpg" alt="Corte moderno realizado">
```

### Hero (Linea ~73-78)
Reemplaza el `hero-img-placeholder` por una foto de tu salon.

### Blog (Linea ~399-430)
Reemplaza los `blog-placeholder` por imagenes relacionadas.

---

## Como agregar el mapa de Google Maps

1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu direccion
3. Haz clic en "Compartir"
4. Selecciona "Insertar un mapa"
5. Copia el codigo HTML
6. En `index.html` linea ~507, reemplaza el `map-placeholder` por el codigo de Google

---

## Como subir la pagina a internet (opcional)

Para que la pagina este online necesitas:

### Opcion 1: Hosting gratuito
- **GitHub Pages**: Gratis, requiere cuenta de GitHub
- **Netlify**: Gratis, muy facil de usar
- **Vercel**: Gratis, bueno para proyectos simples
- **000webhost**: Gratis con publicidad

### Opcion 2: Hosting pago (recomendado para negocios)
- **Hostinger**: Economico y facil
- **SiteGround**: Buen soporte
- **Bluehost**: Popular para WordPress

### Pasos basicos para subir:
1. Comprar un dominio (ej: tupeluqueria.com)
2. Contratar hosting
3. Subir los archivos index.html, styles.css y script.js
4. Configurar el dominio

---

## Personalizacion avanzada

### Cambiar colores

Abri `styles.css` y modifica las variables al inicio:

```css
:root {
    --color-primary: #D4A5A5;        /* Rosa principal */
    --color-secondary: #C8B5D4;      /* Lavanda */
    --color-accent: #D4C4A5;         /* Beige */
    /* ... */
}
```

### Cambiar fuentes

La pagina usa Google Fonts. Para cambiar:
1. Ve a [Google Fonts](https://fonts.google.com)
2. Elige tus fuentes
3. Copia el link
4. Reemplaza en `index.html` linea ~10-12

---

## Funcionalidades del formulario de reservas

El formulario actualmente:
- Valida que los campos obligatorios esten completos
- Verifica que el telefono tenga suficientes digitos
- Muestra un modal de confirmacion
- **NO envia emails automaticamente**

Para recibir las reservas por email, tenes dos opciones:

### Opcion 1: Formspree (Facil y gratis)
1. Crea cuenta en [Formspree](https://formspree.io)
2. Reemplaza en `index.html` linea ~272:
   ```html
   <form class="reservas-form" id="form-reserva" action="https://formspree.io/f/TU_ID" method="POST">
   ```
3. Las reservas llegaran a tu email

### Opcion 2: EmailJS (Mas avanzado)
Requiere configuracion adicional con JavaScript.

### Opcion 3: WhatsApp (Recomendado)
Ya incluido! El boton "Reservar por WhatsApp" abre directo un chat con tu numero.

---

## Redes Sociales

Mira el archivo `GUIA_REDES_SOCIALES.md` para:
- Crear Instagram, Facebook, TikTok
- Configurar WhatsApp Business
- Registrar en Google My Business
- Consejos de contenido
- Hashtags sugeridos

---

## Estructura de secciones

1. **Header**: Logo y menu de navegacion
2. **Hero**: Presentacion principal
3. **Servicios**: 8 tarjetas de servicios
4. **Galeria**: Grid de fotos
5. **Testimonios**: 3 tarjetas de clientes
6. **Reservas**: Formulario + info de contacto
7. **Blog**: 3 articulos de ejemplo
8. **Contacto**: Info completa + mapa
9. **Footer**: Enlaces y newsletter

---

## Soporte y modificaciones

Para hacer cambios:

### Cambiar textos
- Edita directamente en `index.html`
- Busca el texto y reemplazalo

### Cambiar colores
- Edita `styles.css`, variables al inicio

### Agregar mas servicios
- Copia una `servicio-card` completa
- Pega en `servicios-grid`
- Modifica contenido

### Agregar mas fotos a la galeria
- Copia un `galeria-item`
- Pega dentro de `galeria-grid`

---

## Tips para tu pagina

1. **Fotos de calidad**: Usa buenas fotos de tus trabajos
2. **Actualiza precios**: Mantenlos al dia
3. **Responde rapido**: Si incluis email, revisalo seguido
4. **SEO**: Agrega palabras clave en los textos
5. **Mobile first**: La mayoria vera tu pagina en celular

---

## Licencia

Este proyecto es de uso libre para tu peluqueria.

---