import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Code2, Database, Brain, Server, Globe, ChevronDown, Eye, Settings, X } from 'lucide-react';
import fotoPerfil from '../assets/images/foto-perfil.png';
import deteccion from '../assets/images/deteccion_vehiculos.png';
import swappy1 from '../assets/images/swappy1.png'; 
/*import swappy2 from '../assets/images/swappy2.png'; 
import swappy3 from '../assets/images/swappy3.png'; 
import swappy4 from '../assets/images/swappy4.png';
import deteccion from '../assets/images/deteccion_vehiculos.png';
*/
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const isCyan = project.theme === 'cyan';
  const titleClass = isCyan ? 'text-cyan-400' : 'text-purple-400';
  const gradientClass = isCyan ? 'from-cyan-500 to-teal-500' : 'from-purple-500 to-pink-500';
  //const iconClass = isCyan ? 'text-cyan-400' : 'text-purple-400';

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-2 gap-0">
          <div className="bg-slate-950 p-6 lg:p-8 flex items-center justify-center">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full max-h-[70vh] object-contain rounded-xl border border-slate-700"
            />
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}>
                {project.icon}
              </div>
              <h3 className="text-3xl font-bold">{project.title}</h3>
            </div>

            <p className="text-slate-300 leading-relaxed text-lg">{project.description}</p>

            <div className="space-y-4">
              <h4 className={`text-xl font-semibold ${titleClass}`}>Características Principales</h4>
              <ul className="space-y-3 text-slate-300">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.icon}
                    <span><span className="font-semibold text-white">{feature.title}:</span> {feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className={`text-xl font-semibold ${titleClass}`}>Stack Tecnológico</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm border border-slate-600/50 hover:border-cyan-500/50 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className={`text-xl font-semibold ${titleClass}`}>Resultados</h4>
              <ul className="space-y-2 text-slate-300">
                {project.results.map((result, idx) => (
                  <li key={idx}>{result}</li>
                ))}
              </ul>
            </div>

            {project.repo && (
              <div className="flex gap-4 pt-4">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradientClass} rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  <Github size={20} />
                  Ver Código
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProjectsTab, setActiveProjectsTab] = useState('code');
  const [selectedProject, setSelectedProject] = useState(null);

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
  };

  const projects = [
    {
      id: 'swappy',
      title: 'Swappy',
      short: 'Marketplace con IA y geolocalización.',
      cover: swappy1,
      theme: 'cyan',
      icon: <Code2 size={24} />,
      repo: 'https://github.com/IkerMunozz/TFC',
      description: 'Plataforma web de compraventa de productos de segunda mano que integra Inteligencia Artificial para validación automática de imágenes y geolocalización para optimizar envíos.',
      features: [
        {
          icon: <Brain className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Validación con IA',
          text: 'Sistema automático con YOLOv8 que detecta objetos en imágenes, garantizando la calidad de las publicaciones'
        },
        {
          icon: <MapPin className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Geolocalización',
          text: 'Mapa interactivo con Leaflet que muestra oficinas de Correos cercanas en tiempo real'
        },
        {
          icon: <Globe className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Interfaz Intuitiva',
          text: 'Diseño responsive y experiencia de usuario optimizada para facilitar compras y ventas'
        }
      ],
      stack: ['Java', 'Spring Boot', 'MySQL', 'Python', 'YOLOv8', 'HTML', 'CSS', 'JavaScript', 'Thymeleaf', 'Leaflet', 'Docker', 'Railway'],
      results: [
        '✓ Valoración de usuarios: <span className="font-semibold text-white">4-5/5</span>',
        '✓ Validación exitosa de imágenes con <span className="font-semibold text-white">alta precisión</span>',
        '✓ Despliegue en producción con <span className="font-semibold text-white">Docker y Railway</span>'
      ]
    },
    {
      id: 'yolo',
      title: 'Custom Object Detection (YOLOv8)',
      short: 'Detección personalizada con YOLOv8.',
      cover: deteccion,
      theme: 'purple',
      icon: <Brain size={24} />,
      repo: 'https://github.com/IkerMunozz',
      description: 'Sistema avanzado de visión por computador basado en YOLOv8, enfocado en la detección personalizada de objetos (keys) mediante fine-tuning y arquitectura multi-modelo para preservar detección general COCO.',
      features: [
        {
          icon: <Brain className="text-purple-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Fine-tuning personalizado',
          text: 'Entrenamiento específico de YOLOv8 para añadir una nueva clase (keys) mediante anotación y adaptación de dataset.'
        },
        {
          icon: <Code2 className="text-purple-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Arquitectura multi-modelo',
          text: 'Integración simultánea de dos modelos (YOLOv8 COCO + modelo fine-tuned) para evitar catastrophic forgetting.'
        },
        {
          icon: <Eye className="text-purple-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Detección en tiempo real',
          text: 'Procesamiento de vídeo en vivo con OpenCV, combinando resultados de ambos modelos en una única visualización.'
        },
        {
          icon: <Settings className="text-purple-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Pipeline completo',
          text: 'Preparación de dataset, corrección de etiquetas, configuración multiplataforma y optimización de inferencia.'
        }
      ],
      stack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Computer Vision', 'Deep Learning', 'Object Detection', 'Fine-tuning', 'Dataset Annotation'],
      results: [
        'Detección precisa de objetos personalizados (keys)',
        'Preservación de detección COCO mediante arquitectura multi-modelo',
        'Sistema de detección en tiempo real funcional en CPU',
        'Experiencia práctica en Continual Learning y limitaciones reales de fine-tuning'
      ]
    },
    {
      id: 'traffic',
      title: 'Traffic Flow Analysis & Prediction',
      short: 'Análisis y predicción de tráfico urbano.',
      cover: deteccion,
      theme: 'cyan',
      icon: <Database size={24} />,
      repo: 'https://github.com/IkerMunozz/Modelo_AnalisisTrafico',
      description: 'Sistema de análisis y predicción de tráfico urbano mediante técnicas de Machine Learning y análisis de datos, enfocado en la identificación de patrones temporales y la predicción de congestión a partir de datos reales.',
      features: [
        {
          icon: <Database className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Análisis Exploratorio',
          text: 'Limpieza, transformación y visualización de datos para identificar patrones de tráfico por franja horaria y día de la semana.'
        },
        {
          icon: <Brain className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Modelado Predictivo',
          text: 'Entrenamiento y evaluación de modelos de Machine Learning para estimar niveles de congestión futuros.'
        },
        {
          icon: <Globe className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Visualización de Resultados',
          text: 'Representación gráfica de tendencias y comparación entre valores reales y predichos.'
        },
        {
          icon: <Settings className="text-cyan-400 mt-1 flex-shrink-0" size={20} />,
          title: 'Pipeline Completo',
          text: 'Preprocesamiento, división train/test, entrenamiento, validación y análisis de métricas de rendimiento.'
        }
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Machine Learning', 'Data Analysis', 'Regression', 'Time Series'],
      results: [
        'Identificación clara de patrones de congestión por franja horaria',
        'Modelo predictivo con buena capacidad de generalización',
        'Aplicación práctica de técnicas de regresión y análisis temporal',
        'Experiencia sólida en interpretación de métricas (MAE, RMSE, R²)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">IM</div>
          <div className="hidden md:flex gap-4 lg:gap-8">
            {['Inicio', 'Sobre mí', 'Proyectos', 'Skills', 'Contacto'].map((item, idx) => (
              <button key={item} onClick={() => scrollToSection(['home', 'about', 'projects', 'skills', 'contact'][idx])} className="hover:text-cyan-400 transition-colors duration-300 font-medium text-sm lg:text-base">
                {item}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2 text-cyan-400" onClick={() => scrollToSection('contact')}>
            <Mail size={24} />
          </button>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
              Disponible para oportunidades
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Iker Muñoz
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-300 font-light">
              Desarrollador Web Full Stack
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Especializado en <span className="text-cyan-400 font-semibold">Inteligencia Artificial</span> y <span className="text-cyan-400 font-semibold">Big Data</span>
            </p>
            <div className="flex gap-4 pt-4 flex-wrap">
              <a href="#contact" onClick={() => scrollToSection('contact')} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">Contáctame</a>
              <a href="#projects" onClick={() => scrollToSection('projects')} className="px-8 py-3 border-2 border-cyan-500/30 rounded-lg font-semibold hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">Ver Proyectos</a>
              <a href="/CV_Iker_Muñoz.pdf" download="CV_Iker_Muñoz.pdf" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar CV
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/IkerMunozz" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/iker-muñoz-herrero" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110"><Linkedin size={24} /></a>
              <a href="mailto:ikermunozherrero@gmail.com" className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110"><Mail size={24} /></a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img src={fotoPerfil} alt="Iker Muñoz" className="relative w-80 h-80 object-cover rounded-full border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-cyan-400" />
        </div>
      </section>

      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Sobre mí
            </span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 sm:space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
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
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-400">Formación Actual</h3>
                <div className="space-y-2 sm:space-y-3 text-slate-300">
                  <p className="text-sm sm:text-base"><span className="font-semibold text-white">Especialización en IA y Big Data</span></p>
                  <p className="text-xs sm:text-sm">IES Ribera del Tajo</p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm ml-2">
                    <li>Machine Learning y Deep Learning</li>
                    <li>TensorFlow y PyTorch</li>
                    <li>Big Data con Hadoop y Cloudera</li>
                    <li>MongoDB y Grafana</li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-400">Experiencia</h3>
                <div className="space-y-2 sm:space-y-3 text-slate-300">
                  <p className="text-sm sm:text-base"><span className="font-semibold text-white">Prácticas en HPE CDS</span></p>
                  <p className="text-xs sm:text-sm">Hewlett Packard Enterprise</p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm ml-2">
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

      <section id="projects" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Proyectos Destacados
            </span>
          </h2>
          <p className="text-center text-slate-300 mb-10 max-w-3xl mx-auto">
            Los proyectos se muestran como tarjetas pequeñas con portada, nombre y una breve descripción. Al pulsar una tarjeta se abre una ventana con toda la información.
          </p>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-xl bg-slate-800/70 border border-slate-700 p-1 shadow-lg">
              <button
                onClick={() => setActiveProjectsTab('code')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeProjectsTab === 'code'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Proyectos
              </button>
              <button
                onClick={() => setActiveProjectsTab('vibe')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeProjectsTab === 'vibe'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Vibe coding
              </button>
            </div>
          </div>

          {activeProjectsTab === 'code' ? (
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group text-left bg-slate-800/60 hover:bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{project.short}</p>
                    <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                      Ver detalles <Eye size={16} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-10 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Vibe coding</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Aquí irán tus proyectos creados con vibe coding. Puedes añadir nuevas tarjetas con el mismo estilo.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Stack Tecnológico
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold">Frontend</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>• React & JavaScript</p>
                <p>• HTML5 & CSS3</p>
                <p>• Thymeleaf</p>
                <p>• Leaflet (Mapas)</p>
                <p>• Responsive Design</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold">Backend</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>• Java & Spring Boot</p>
                <p>• JPA & Hibernate</p>
                <p>• API REST</p>
                <p>• Python</p>
                <p>• Arquitectura MVC</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Brain size={24} />
                </div>
                <h3 className="text-xl font-bold">IA & ML</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>• TensorFlow</p>
                <p>• PyTorch</p>
                <p>• YOLOv8</p>
                <p>• Scikit-learn</p>
                <p>• Computer Vision</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-bold">Bases de Datos</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>• MySQL</p>
                <p>• MongoDB</p>
                <p>• SQL & NoSQL</p>
                <p>• Diseño de BD</p>
                <p>• Optimización</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold">Big Data</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>• Hadoop</p>
                <p>• Cloudera</p>
                <p>• Grafana</p>
                <p>• Análisis de Datos</p>
                <p>• Visualización</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold">DevOps & Tools</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>• Docker</p>
                <p>• Git & GitHub</p>
                <p>• Linux</p>
                <p>• Railway</p>
                <p>• CI/CD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              ¿Hablamos?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Estoy abierto a oportunidades junior, prácticas y proyectos en IA, Big Data y desarrollo Full Stack
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:ikermunozherrero@gmail.com" className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Mail size={32} className="mx-auto mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-slate-400">ikermunozherrero@gmail.com</p>
            </a>

            <a href="https://www.linkedin.com/in/iker-muñoz-herrero" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Linkedin size={32} className="mx-auto mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-slate-400">iker-muñoz-herrero</p>
            </a>

            <a href="https://github.com/IkerMunozz" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Github size={32} className="mx-auto mb-4 text-cyan-400" />
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-slate-400">IkerMunozz</p>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400">
            <MapPin size={20} className="text-cyan-400" />
            <span>Toledo, España</span>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2025 Iker Muñoz Herrero. Desarrollado con React</p>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}