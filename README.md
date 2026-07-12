# { Castagno Dev } — Portfolio Personal

> Portfolio personal de **Leonel López**, desarrollador Full-Stack en formación. Construido como proyecto de aprendizaje real, donde cada sección fue una oportunidad para aplicar y profundizar conceptos de React, animaciones y diseño web moderno.

🌐 **[Ver en vivo](https://portfolio-castagno-dev.vercel.app/)**

---

## ✨ Características

- **Hero interactivo** — animación de apertura en tres fases con corchetes GSAP al hacer click
- **Animaciones al scroll** — cada sección entra al viewport con transiciones fluidas usando IntersectionObserver + GSAP
- **Título con SplitText** — letras animadas individualmente con glow pulsante en cyan
- **Tarjetas de proyecto 3D** — efecto tilt que sigue al cursor con perspectiva CSS
- **Panel de detalle expandible** — al hacer click en una tarjeta se despliega la descripción completa
- **Filtros de proyectos** — filtrado por tipo y tecnología de forma encadenada
- **Navbar adaptativa** — se contrae a íconos al hacer scroll, se expande con hover; versión móvil con menú hamburguesa animado
- **Formulario de contacto funcional** — conectado a Resend via serverless function
- **Fondo generativo** — ondas topográficas dibujadas en Canvas 2D, frame a frame
- **Responsive completo** — desde 320px hasta pantallas grandes sin romper ningún layout
- **Página 404 personalizada** — con animación de entrada en el número

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Framework UI | React 19 |
| Build tool | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Animaciones | GSAP 3.15 + SplitText |
| Routing | React Router DOM v7 |
| Email | Resend (serverless) |
| Íconos | react-icons, flag-icons |
| Package manager | pnpm |
| Deploy | Vercel |

---

## 📁 Estructura del proyecto

```
src/
├── assets/          # Imágenes (foto de perfil, SVGs)
├── components/
│   ├── Hero.jsx         # Sección principal con animación de apertura
│   ├── Navbar.jsx       # Barra de navegación adaptativa
│   ├── Footer.jsx       # Pie de página con redes y links
│   └── ScrollToTop.jsx  # Scroll al top automático en navegación
├── data/
│   ├── Skills.jsx       # Array de tecnologías con íconos y estado
│   └── ProjectsData.jsx # Array de proyectos con descripciones e íconos
└── pages/
    ├── Home.jsx
    ├── About.jsx        # Sobre mí + grid de skills animado
    ├── Projects.jsx     # Galería con filtros y tarjetas 3D
    ├── Contact.jsx      # Formulario + info de contacto
    └── NotFound.jsx     # Página 404
api/
└── contact.js           # Serverless function — envío de emails con Resend
```

---

## 🚀 Correr en local

### Prerequisitos

- Node.js ≥ 20
- pnpm instalado globalmente (`npm install -g pnpm`)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/LeonelLopez14/Portfolio.git
cd Portfolio

# Instalar dependencias
pnpm install
```

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
RESEND_API_KEY=tu_api_key_de_resend
```

> Sin esta variable el formulario de contacto no va a funcionar, pero el resto del sitio sí.

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### Build para producción

```bash
pnpm build
pnpm preview   # previsualizar el build localmente
```

---

## 📬 Contacto

- **Email** — castagno.dev@gmail.com
- **LinkedIn** — [Leonel López](https://www.linkedin.com/in/leonel-lopez-5bb549306/)
- **GitHub** — [@LeonelLopez14](https://github.com/LeonelLopez14)
- **Instagram** — [@castagno.dev](https://instagram.com/castagno.dev)

---

<p align="center">Hecho con garra charrúa 🇺🇾</p>
