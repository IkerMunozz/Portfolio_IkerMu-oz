#  Portfolio Personal - Iker Muñoz Herrero

Portfolio profesional de Desarrollador Full Stack especializado en Inteligencia Artificial y Big Data. Diseñado con React y desplegado en Vercel.

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://portfolio-iker-mu-oz.vercel.app)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

##  Demo en Vivo

🔗 **[Ver Portfolio](https://portfolio-iker-mu-oz.vercel.app)**

---

##  Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Autor](#-autor)
- [Licencia](#-licencia)

---

##  Descripción

Portfolio profesional desarrollado con React que muestra mi experiencia como Desarrollador Full Stack con especialización en Inteligencia Artificial y Big Data. El sitio incluye información sobre mi formación, experiencia profesional, proyectos destacados y stack tecnológico.

### Objetivo

Presentar de forma clara y profesional mis habilidades técnicas, proyectos realizados y experiencia en desarrollo web, IA y análisis de datos, facilitando el contacto con reclutadores y empresas del sector tecnológico.

---

##  Características

- ✅ **Diseño Responsive**: Optimizado para móviles, tablets y escritorio
- ✅ **Interfaz Moderna**: Diseño minimalista con gradientes y animaciones suaves
- ✅ **Navegación Fluida**: Scroll suave entre secciones
- ✅ **Proyecto Destacado**: Sección dedicada a Swappy (TFC)
- ✅ **Stack Tecnológico Visual**: Presentación organizada de habilidades
- ✅ **Modo Oscuro**: Paleta de colores optimizada para reducir fatiga visual
- ✅ **Performance Optimizado**: Carga rápida y eficiente
- ✅ **SEO Friendly**: Metadatos optimizados para buscadores

---

##  Tecnologías

### Frontend

- **React** 18.2.0 - Biblioteca de JavaScript para interfaces de usuario
- **Tailwind CSS** 3.4.1 - Framework CSS utility-first
- **Lucide React** - Iconos modernos y ligeros
- **PostCSS & Autoprefixer** - Procesamiento y compatibilidad CSS

### Herramientas de Desarrollo

- **Create React App** - Configuración y build tools
- **Git & GitHub** - Control de versiones
- **Vercel** - Plataforma de despliegue continuo
- **ESLint** - Linter para código JavaScript

---

###  Stack Tecnológico
Presentación visual de habilidades organizadas por categorías:
- Frontend (React, HTML5, CSS3)
- Backend (Java, Spring Boot, Python)
- IA & ML (TensorFlow, PyTorch, YOLOv8)
- Big Data (Hadoop, Cloudera, Grafana)
- Bases de Datos (MySQL, MongoDB)
- DevOps (Docker, Git, Linux)

###  Contacto
Enlaces directos a email, LinkedIn y GitHub.

---

##  Instalación

### Requisitos Previos

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/IkerMunozz/Portfolio_IkerMu-oz.git
cd Portfolio_IkerMu-oz
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar servidor de desarrollo**

```bash
npm start
```

El portfolio estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia servidor de desarrollo

# Producción
npm run build      # Crea build optimizado
npm test           # Ejecuta tests
npm run eject      # Expone configuración (irreversible)
```

---

##  Estructura del Proyecto

```
portfolio-iker/
├── public/
│   ├── index.html          # HTML principal
│   ├── favicon.ico         # Icono del sitio
│   └── manifest.json       # Configuración PWA
├── src/
│   ├── assets/
│   │   └── images/         # Imágenes del portfolio
│   │       ├── foto-perfil.png
│   │       ├── swappy1.png
│   │       ├── swappy2.png
│   │       ├── swappy3.png
│   │       └── swappy4.png
│   ├── components/
│   │   └── Portfolio.jsx   # Componente principal
│   ├── App.js              # Componente raíz
│   ├── index.js            # Punto de entrada
│   └── index.css           # Estilos globales + Tailwind
├── .gitignore
├── package.json
├── tailwind.config.js      # Configuración Tailwind
├── postcss.config.js       # Configuración PostCSS
├── vercel.json            # Configuración Vercel
└── README.md
```

---

##  Despliegue

### Vercel (Recomendado)

1. **Conectar con Vercel**
   - Visita [vercel.com](https://vercel.com)
   - Importa el repositorio de GitHub
   - Configura el proyecto (automático para Create React App)

2. **Deploy automático**
   - Cada push a `main` despliega automáticamente
   - Vista previa para cada Pull Request

### GitHub Pages (Alternativa)

```bash
# Instalar gh-pages
npm install gh-pages --save-dev

# Desplegar
npm run deploy
```

### Netlify

1. Arrastra la carpeta `build/` a [netlify.com](https://netlify.com)
2. O conecta tu repositorio de GitHub

---

##  Autor

**Iker Muñoz Herrero**

Desarrollador Full Stack especializado en Inteligencia Artificial y Big Data. Graduado en Desarrollo de Aplicaciones Web (IES Azarquiel) y actualmente cursando Especialización en IA y Big Data (IES Ribera del Tajo).

###  Enlaces

- **Portfolio**: [https://portfolio-iker-mu-oz.vercel.app](https://portfolio-iker-mu-oz.vercel.app)
- **LinkedIn**: [linkedin.com/in/iker-muñoz-herrero](https://www.linkedin.com/in/iker-muñoz-herrero)
- **GitHub**: [github.com/IkerMunozz](https://github.com/IkerMunozz)
- **Email**: ikermunozherrero@gmail.com

###  Ubicación
Toledo, España

---

##  Proyectos Destacados

### Swappy - Plataforma de Compraventa con IA
Aplicación web de segunda mano con validación automática de imágenes mediante YOLOv8 y geolocalización de oficinas de Correos.

**Tecnologías**: Java, Spring Boot, MySQL, Python, YOLOv8, Thymeleaf, Leaflet, Docker, Railway

**Repositorio**: [github.com/IkerMunozz/TFC](https://github.com/IkerMunozz/TFC)

---

##  Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

##  Contribuciones

Este es un portfolio personal, pero si encuentras algún bug o tienes sugerencias, siéntete libre de:

1. Hacer fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

##  Agradecimientos

- **Iconos**: [Lucide Icons](https://lucide.dev/)
- **Fuentes**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Hosting**: [Vercel](https://vercel.com)
- **Framework**: [React](https://reactjs.org)
- **CSS**: [Tailwind CSS](https://tailwindcss.com)

---

## 📊 Estadísticas del Proyecto

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-cyan)
![Build Status](https://img.shields.io/badge/Build-Passing-success)
![Code Size](https://img.shields.io/github/languages/code-size/IkerMunozz/Portfolio_IkerMu-oz)
![Last Commit](https://img.shields.io/github/last-commit/IkerMunozz/Portfolio_IkerMu-oz)

---

<div align="center">

**Desarrollado por Iker Muñoz Herrero**

[⬆ Volver arriba](#-portfolio-personal---iker-muñoz-herrero)

</div>
