import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Code2, Database, Brain, Server, Globe, ChevronDown, Eye, Settings, X, MessageSquare  } from 'lucide-react';
import Chatbot from './Chatbot';
import GlowCard from './ui/GlowCard';
import fotoPerfil from '../assets/images/foto-perfil.png';
import swappy1 from '../assets/images/swappy1.png';
import swappy2 from '../assets/images/swappy2.png';
import swappy3 from '../assets/images/swappy3.png';
import swappy4 from '../assets/images/swappy4.png';
import imagenZalando from '../assets/images/imagen_zalando.png';
import analiticaZalando from '../assets/images/analitica_zalando.png';
import historialZalando from '../assets/images/historial_zalando.png';
import inventarioZalando from '../assets/images/inventario_zalando.png';
import portada_yolov8 from '../assets/images/portada_yolov8.webp';
import portada_analisistrafico from '../assets/images/portada_analisistrafico.png';
import deteccion from '../assets/images/deteccion_vehiculos.png';
import portada_chatbotwhatsapp from '../assets/images/portada_chatbotwhatsapp.png';
import captura1_panel from '../assets/images/Captura1_panel.png';
import captura2_panel from '../assets/images/Captura2_panel.png';
import captura3_panel from '../assets/images/Captura3_panel.png';
import flujoChatbot from '../assets/images/Flujo_ChatBotWhatsapp.png';
import flujoResenas from '../assets/images/Flujo_Reseñas.png';
export default function Portfolio() {
  //const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    //setActiveSection(id);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const allProjects = [
    {
      id: 'swappy',
      title: 'Swappy',
      shortDescription: 'Plataforma de compraventa con IA para validación automática de imágenes',
      coverImage: swappy1,
      icon: Code2,
      fullDescription: 'Plataforma web de compraventa de productos de segunda mano que integra Inteligencia Artificial para validación automática de imágenes y geolocalización para optimizar envíos.',
      features: [
        { icon: Brain, text: 'Validación con IA: Sistema automático con YOLOv8 que detecta objetos en imágenes, garantizando la calidad de las publicaciones' },
        { icon: MapPin, text: 'Geolocalización: Mapa interactivo con Leaflet que muestra oficinas de Correos cercanas en tiempo real' },
        { icon: Globe, text: 'Interfaz Intuitiva: Diseño responsive y experiencia de usuario optimizada para facilitar compras y ventas' }
      ],
      stack: ['Java', 'Spring Boot', 'MySQL', 'Python', 'YOLOv8', 'HTML', 'CSS', 'JavaScript', 'Thymeleaf', 'Leaflet', 'Docker', 'Railway'],
      results: [
        'Valoración de usuarios: 4-5/5',
        'Validación exitosa de imágenes con alta precisión',
        'Despliegue en producción con Docker y Railway'
      ],
      githubUrl: 'https://github.com/IkerMunozz/TFC',
      images: [swappy1, swappy2, swappy3, swappy4]
    },
    {
      id: 'yolo-custom',
      title: 'Custom Object Detection (YOLOv8)',
      shortDescription: 'Sistema avanzado de visión por computador con fine-tuning personalizado',
      coverImage: portada_yolov8,
      icon: Brain,
      fullDescription: 'Sistema avanzado de visión por computador basado en YOLOv8, enfocado en la detección personalizada de objetos mediante fine-tuning y arquitectura multi-modelo.',
      features: [
        { icon: Brain, text: 'Fine-tuning personalizado: Entrenamiento específico de YOLOv8 para añadir una nueva clase mediante anotación y adaptación de dataset' },
        { icon: Code2, text: 'Arquitectura multi-modelo: Integración simultánea de dos modelos para evitar catastrophic forgetting' },
        { icon: Eye, text: 'Detección en tiempo real: Procesamiento de vídeo en vivo con OpenCV, combinando resultados de ambos modelos' },
        { icon: Settings, text: 'Pipeline completo: Preparación de dataset, corrección de etiquetas y optimización de inferencia' }
      ],
      stack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Computer Vision', 'Deep Learning', 'Object Detection', 'Fine-tuning', 'Dataset Annotation'],
      results: [
        'Detección precisa de objetos personalizados',
        'Preservación de detección COCO mediante arquitectura multi-modelo',
        'Sistema de detección en tiempo real funcional en CPU',
        'Experiencia práctica en Continual Learning'
      ],
      githubUrl: 'https://github.com/IkerMunozz',
      images: ['/videos/VideoDemostracion.mp4']
    },
    {
      id: 'traffic-analysis',
      title: 'Traffic Flow Analysis & Prediction',
      shortDescription: 'Sistema de análisis y predicción de tráfico urbano con Machine Learning',
      coverImage: portada_analisistrafico,
      icon: Database,
      fullDescription: 'Sistema de análisis y predicción de tráfico urbano mediante técnicas de Machine Learning y análisis de datos, enfocado en la identificación de patrones temporales.',
      features: [
        { icon: Database, text: 'Análisis Exploratorio: Limpieza, transformación y visualización de datos para identificar patrones de tráfico' },
        { icon: Brain, text: 'Modelado Predictivo: Entrenamiento y evaluación de modelos de Machine Learning para estimar niveles de congestión' },
        { icon: Globe, text: 'Visualización de Resultados: Representación gráfica de tendencias y comparación entre valores reales y predichos' },
        { icon: Settings, text: 'Pipeline Completo: Preprocesamiento, división train/test, entrenamiento, validación y análisis de métricas' }
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Machine Learning', 'Data Analysis', 'Regression', 'Time Series'],
      results: [
        'Identificación clara de patrones de congestión por franja horaria',
        'Modelo predictivo con buena capacidad de generalización',
        'Aplicación práctica de técnicas de regresión y análisis temporal',
        'Experiencia sólida en interpretación de métricas (MAE, RMSE, R²)'
      ],
      githubUrl: 'https://github.com/IkerMunozz/Modelo_AnalisisTrafico',
      images: [deteccion, '/videos/Video_deteccion.mp4']
    },
    {
      id: 'hotel-chatbot',
      title: 'Hotel Chatbot & Automation',
      shortDescription: 'Sistema de atención al cliente automatizado con WhatsApp y panel de control real-time',
      coverImage: portada_chatbotwhatsapp,
      icon: MessageSquare,
      fullDescription: 'Ecosistema de automatización para gestión hotelera que combina un chatbot inteligente en WhatsApp con un panel de administración centralizado. Optimiza la atención al cliente mediante IA y permite la intervención humana estratégica.',
      features: [
        { icon: Brain, text: 'Chatbot Inteligente: Respuesta automática a consultas frecuentes, gestión de reservas y recomendaciones turísticas personalizadas' },
        { icon: Settings, text: 'Automatización con n8n: Workflows complejos para el flujo de mensajes, integración de APIs y lógica de negocio' },
        { icon: Globe, text: 'Panel de Control: Interfaz en tiempo real para monitorizar chats y permitir que recepción tome el control manualmente' },
        { icon: Mail, text: 'Sistema de Alertas: Notificaciones automáticas por correo electrónico ante quejas o solicitudes de intervención humana' }
      ],
      stack: ['n8n', 'Node.js', 'React', 'WhatsApp Business API', 'PostgreSQL', 'Tailwind CSS', 'SMTP/Email API'],
      results: [
        'Reducción del 70% en carga de consultas básicas en recepción',
        'Tiempo de respuesta inmediato 24/7 para clientes',
        'Mejora en la satisfacción del cliente mediante atención híbrida (IA + Humano)',
        'Sistema de escalado eficiente para incidencias críticas'
      ],
      githubUrl: 'https://github.com/IkerMunozz/PanelControl_CasonadelaReyna',
      images: [captura1_panel, captura2_panel, captura3_panel, flujoChatbot]
    },
    {
      id: 'google-reviews-automation',
      title: 'AI Google Reviews Automation',
      shortDescription: 'Sistema autónomo de gestión de reseñas con Gemini 2.5 Flash y n8n',
      coverImage: flujoResenas,
      icon: MessageSquare,
      fullDescription: 'Sistema de automatización inteligente para la gestión de reseñas en Google My Business. El sistema detecta nuevas reseñas, analiza el sentimiento y el idioma, y genera respuestas personalizadas manteniendo el estilo histórico de la marca.',
      features: [
        { icon: Brain, text: 'Personalización con IA: Uso de Gemini 2.5 Flash con contexto de las últimas 20 respuestas para mantener un tono coherente' },
        { icon: Globe, text: 'Soporte Multidioma: Detección y respuesta automática en el idioma del cliente (Inglés, Francés, Alemán, etc.)' },
        { icon: Database, text: 'Control de Historial: Integración con Google Sheets para evitar duplicidades y mantener un registro de interacciones' },
        { icon: Settings, text: 'Lógica Segmentada: Flujos diferenciados según la puntuación (1-5 ★) para una gestión de reputación óptima' }
      ],
      stack: ['n8n', 'Google My Business API', 'Google Sheets', 'Gemini 2.5 Flash', 'JavaScript'],
      results: [
        '100% de reseñas respondidas en menos de 60 minutos',
        'Respuestas personalizadas y multidioma sin intervención humana',
        'Mejora significativa en la reputación online y SEO local',
        'Consistencia de marca asegurada mediante context-learning'
      ],
      githubUrl: 'https://github.com/IkerMunozz',
      images: [flujoResenas]
    },
    {
      id: 'zalando',
      title: 'Zalando Size Exchange Automator',
      shortDescription: 'Automatización de cambios de talla en e-commerce con IA integrada',
      coverImage: imagenZalando,
      icon: Brain,
      fullDescription: 'Plataforma full-stack que automatiza el proceso de cambios de talla en e-commerce mediante Inteligencia Artificial. Integra un chatbot inteligente con Gemini, validación en tiempo real y automatización de logística.',
      features: [
        { icon: Brain, text: 'Chatbot Inteligente: Integración con Google Gemini para detectar intenciones y extraer datos de pedidos automáticamente' },
        { icon: Database, text: 'Validación en Tiempo Real: Verificación de stock, plazos de devolución y estado de pedidos con manejo de excepciones' },
        { icon: Settings, text: 'Automatización Logística: Generación automática de etiquetas de devolución (RMA) y creación de nuevos pedidos' },
        { icon: Globe, text: 'Panel de Control: Monitorización en vivo de inventario, logs del sistema e indicadores de excepción' },
        { icon: Code2, text: 'API REST: Endpoints bien estructurados para gestión de inventario, logs y procesamiento de solicitudes' }
      ],
      stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Google Gemini SDK', 'Framer Motion', 'API REST'],
      results: [
        'IA aplicada a logística: Chatbot inteligente con comprensión de contexto empresarial',
        'Automatización de procesos: Reducción de carga operativa mediante APIs y workflows inteligentes',
        'Manejo robusto de excepciones: Validaciones complejas (stock, plazos, duplicidades)',
        'Full-stack profesional: Arquitectura escalable ready para producción'
      ],
      githubUrl: 'https://github.com/ikerfedeto/Soporte_zalando',
      images: [imagenZalando, analiticaZalando, historialZalando, inventarioZalando]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            IM
          </div>
          <div className="hidden md:flex gap-4 lg:gap-8">
            {['Inicio', 'Sobre mí', 'Proyectos', 'Skills', 'Contacto'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(['home', 'about', 'projects', 'skills', 'contact'][idx])}
                className="hover:text-cyan-400 transition-colors duration-300 font-medium text-sm lg:text-base"
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            className="md:hidden p-2 text-cyan-400"
            onClick={() => scrollToSection('contact')}
          >
            <Mail size={24} />
          </button>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium mb-2 sm:mb-4">
              Disponible para oportunidades
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Iker Muñoz
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-light">
              Desarrollador Web Full Stack
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
              Especializado en <span className="text-cyan-400 font-semibold">Inteligencia Artificial</span> y <span className="text-cyan-400 font-semibold">Big Data</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
              <a href="#contact" onClick={() => scrollToSection('contact')} className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-center">
                Contáctame
              </a>
              <a href="#projects" onClick={() => scrollToSection('projects')} className="px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-cyan-500/30 rounded-lg font-semibold text-sm sm:text-base hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 text-center">
                Ver Proyectos
              </a>
              <a
              href="/CV_Iker_Munoz.pdf"
              download="CV_Iker_Munoz.pdf"
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar CV
            </a>
            </div>

            <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a href="https://github.com/IkerMunozz" target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                <Github size={20} className="sm:hidden" />
                <Github size={24} className="hidden sm:block" />
              </a>
              <a href="https://www.linkedin.com/in/iker-mu%C3%B1oz-herrero" target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                <Linkedin size={20} className="sm:hidden" />
                <Linkedin size={24} className="hidden sm:block" />
              </a>
              <a href="mailto:ikermunozherrero@gmail.com" className="p-2.5 sm:p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                <Mail size={20} className="sm:hidden" />
                <Mail size={24} className="hidden sm:block" />
              </a>
            </div>
          </div>
          <div className="flex justify-center order-first md:order-last">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src={fotoPerfil}
                alt="Iker Muñoz"
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} className="text-cyan-400 sm:hidden" />
          <ChevronDown size={32} className="text-cyan-400 hidden sm:block" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Sobre mí
            </span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              <p>
                Soy Desarrollador de Aplicaciones Web Full Stack con formación técnica en desarrollo backend y frontend, actualmente especializado en <span className="text-cyan-400 font-semibold">Inteligencia Artificial</span> y <span className="text-cyan-400 font-semibold">Big Data</span>, con experiencia práctica en entornos empresariales.
              </p>
              <p>
                He finalizado el <span className="font-semibold text-white">Grado Superior en Desarrollo de Aplicaciones Web</span> en el IES Azarquiel, donde adquirí una base sólida trabajando con tecnologías como Java, Spring Boot, JPA, MySQL, HTML, CSS, JavaScript y React.
              </p>
              <p>
                Durante mis prácticas en <span className="font-semibold text-white">HPE CDS (Hewlett Packard Enterprise)</span>, participé en proyectos reales implementando modelos de IA para detección de personas, fuego y vehículos, y desarrollando sistemas predictivos con Machine Learning.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 text-cyan-400">Formación Actual</h3>
                <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-slate-300">
                  <p className="text-sm sm:text-base"><span className="font-semibold text-white">Especialización en IA y Big Data</span></p>
                  <p className="text-xs sm:text-sm">IES Ribera del Tajo</p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm ml-1 sm:ml-2">
                    <li>Machine Learning y Deep Learning</li>
                    <li>TensorFlow y PyTorch</li>
                    <li>Big Data con Hadoop y Cloudera</li>
                    <li>MongoDB y Grafana</li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 text-cyan-400">Experiencia</h3>
                <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-slate-300">
                  <p className="text-sm sm:text-base"><span className="font-semibold text-white">Prácticas en HPE CDS</span></p>
                  <p className="text-xs sm:text-sm">Hewlett Packard Enterprise</p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm ml-1 sm:ml-2">
                    <li>Desarrollo de modelos de IA para detección</li>
                    <li>Sistemas predictivos con ML</li>
                    <li>Despliegues en entornos productivos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Proyectos Destacados
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/20 cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <project.icon size={16} className="sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{project.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Stack Tecnológico
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <GlowCard glowColor="blue" customSize className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Code2 size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">Frontend</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <p>• React & JavaScript</p>
                <p>• HTML5 & CSS3</p>
                <p>• Thymeleaf</p>
                <p>• Leaflet (Mapas)</p>
                <p>• Responsive Design</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Server size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">Backend</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <p>• Java & Spring Boot</p>
                <p>• JPA & Hibernate</p>
                <p>• API REST</p>
                <p>• Python</p>
                <p>• Arquitectura MVC</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Brain size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">IA & ML</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <p>• TensorFlow</p>
                <p>• PyTorch</p>
                <p>• YOLOv8</p>
                <p>• Scikit-learn</p>
                <p>• Computer Vision</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Database size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">Bases de Datos</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <p>• MySQL</p>
                <p>• MongoDB</p>
                <p>• SQL & NoSQL</p>
                <p>• Diseño de BD</p>
                <p>• Optimización</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Server size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">Big Data</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <p>• Hadoop</p>
                <p>• Cloudera</p>
                <p>• Grafana</p>
                <p>• Análisis de Datos</p>
                <p>• Visualización</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Globe size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">DevOps & Tools</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <p>• Docker</p>
                <p>• Git & GitHub</p>
                <p>• Linux</p>
                <p>• Railway</p>
                <p>• CI/CD</p>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              ¿Hablamos?
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12 px-4">
            Estoy abierto a oportunidades junior, prácticas y proyectos en IA, Big Data y desarrollo Full Stack
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <a href="mailto:ikermunozherrero@gmail.com" className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Mail size={28} className="sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Email</h3>
              <p className="text-xs sm:text-sm text-slate-400 break-all">ikermunozherrero@gmail.com</p>
            </a>

            <a href="https://www.linkedin.com/in/iker-mu%C3%B1oz-herrero" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Linkedin size={28} className="sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">LinkedIn</h3>
              <p className="text-xs sm:text-sm text-slate-400">iker-muñoz-herrero</p>
            </a>

            <a href="https://github.com/IkerMunozz" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Github size={28} className="sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">GitHub</h3>
              <p className="text-xs sm:text-sm text-slate-400">IkerMunozz</p>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm sm:text-base">
            <MapPin size={20} className="text-cyan-400" />
            <span>Toledo, España</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2025 Iker Muñoz Herrero. Desarrollado con React</p>
        </div>
      </footer>

      <Chatbot />

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeProjectModal}>
          <div className="bg-slate-800/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 group"
                title="Cerrar"
              >
                <X size={22} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Modal Content */}
              <div className="flex flex-col lg:grid lg:grid-cols-2">
                {/* Left Side - Project Details */}
                <div className="p-6 lg:p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <selectedProject.icon size={24} className="lg:w-7 lg:h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold">{selectedProject.title}</h2>
                      <p className="text-cyan-400 font-semibold text-sm lg:text-base mt-1">Proyecto Destacado</p>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-base lg:text-lg">
                    {selectedProject.fullDescription}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-cyan-400">Características Principales</h4>
                    <ul className="space-y-3 text-slate-300">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <feature.icon className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                          <span className="text-sm lg:text-base">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold text-cyan-400">Stack Tecnológico</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm border border-slate-600/50 hover:border-cyan-500/50 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold text-cyan-400">Resultados</h4>
                    <ul className="space-y-2 text-slate-300 text-sm lg:text-base">
                      {selectedProject.results.map((result, index) => (
                        <li key={index}>• {result}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.githubUrl && (
                    <div className="pt-4">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                      >
                        <Github size={20} />
                        Ver Código
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Side - Images */}
                <div className="bg-slate-900 p-6 flex flex-col gap-4">
                  {selectedProject.images.map((media, index) => (
                    media.includes('.mp4') || media.includes('video') ? (
                      <video
                        key={index}
                        controls
                        autoPlay
                        loop
                        muted
                        className="w-full rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <source src={media} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    ) : (
                      <img
                        key={index}
                        src={media}
                        alt={`${selectedProject.title} - Imagen ${index + 1}`}
                        className="rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 w-full"
                      />
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}