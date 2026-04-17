import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Code2, Database, Brain, Server, Globe, ChevronDown, Eye, Settings  } from 'lucide-react';
import Chatbot from './Chatbot';
import fotoPerfil from '../assets/images/foto-perfil.png';
import swappy1 from '../assets/images/swappy1.png';
import swappy2 from '../assets/images/swappy2.png';
import swappy3 from '../assets/images/swappy3.png';
import swappy4 from '../assets/images/swappy4.png';
import deteccion from '../assets/images/deteccion_vehiculos.png';
import imagenZalando from '../assets/images/imagen_zalando.png';
import analiticaZalando from '../assets/images/analitica_zalando.png';
import historialZalando from '../assets/images/historial_zalando.png';
import inventarioZalando from '../assets/images/inventario_zalando.png';
export default function Portfolio() {
  //const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('proyectos');

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
              href="/CV_Iker_Muñoz.pdf"
              download="CV_Iker_Muñoz.pdf"
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

          {/* Tabs Menu */}
          <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
            <div className="inline-flex bg-slate-800/60 backdrop-blur-sm rounded-xl p-1 sm:p-1.5 border border-slate-700/50">
              <button
                onClick={() => setActiveTab('proyectos')}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'proyectos'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Proyectos
              </button>
              <button
                onClick={() => setActiveTab('vibecoding')}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'vibecoding'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vibe Coding
              </button>
            </div>
          </div>

          {activeTab === 'proyectos' && (
          <div className="space-y-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl mb-8 sm:mb-16">
            <div className="flex flex-col md:grid md:grid-cols-2">
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Code2 size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Swappy</h3>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                  Plataforma web de compraventa de productos de segunda mano que integra <span className="text-cyan-400 font-semibold">Inteligencia Artificial</span> para validación automática de imágenes y geolocalización para optimizar envíos.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Características Principales</h4>
                  <ul className="space-y-2 sm:space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <Brain className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base"><span className="font-semibold text-white">Validación con IA:</span> Sistema automático con YOLOv8 que detecta objetos en imágenes, garantizando la calidad de las publicaciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base"><span className="font-semibold text-white">Geolocalización:</span> Mapa interactivo con Leaflet que muestra oficinas de Correos cercanas en tiempo real</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base"><span className="font-semibold text-white">Interfaz Intuitiva:</span> Diseño responsive y experiencia de usuario optimizada para facilitar compras y ventas</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Stack Tecnológico</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {['Java', 'Spring Boot', 'MySQL', 'Python', 'YOLOv8', 'HTML', 'CSS', 'JavaScript', 'Thymeleaf', 'Leaflet', 'Docker', 'Railway'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-700/50 rounded-lg text-xs sm:text-sm border border-slate-600/50 hover:border-cyan-500/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Resultados</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                    <li>✓ Valoración de usuarios: <span className="font-semibold text-white">4-5/5</span></li>
                    <li>✓ Validación exitosa de imágenes con <span className="font-semibold text-white">alta precisión</span></li>
                    <li>✓ Despliegue en producción con <span className="font-semibold text-white">Docker y Railway</span></li>
                  </ul>
                </div>

                <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <a href="https://github.com/IkerMunozz/TFC" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                    <Github size={18} />
                    Ver Código
                  </a>
                </div>
              </div>

              <div className="bg-slate-900 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                <img src={swappy1} alt="Swappy - Inicio" className="rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 w-full" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <img src={swappy2} alt="Swappy - Perfil" className="w-full rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300" />
                  <img src={swappy3} alt="Swappy - Publicar" className="w-full rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300" />
                </div>
                <img src={swappy4} alt="Swappy - Mapa" className="rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 w-full" />
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-2xl mb-8 sm:mb-16">
            <div className="flex flex-col md:grid md:grid-cols-2">

              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Brain size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Custom Object Detection (YOLOv8)</h3>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                  Sistema avanzado de <span className="text-purple-400 font-semibold">visión por computador</span> basado en YOLOv8, enfocado en la detección personalizada de objetos (<span className="font-semibold text-white">keys</span>) mediante fine-tuning y arquitectura multi-modelo para preservar detección general COCO.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-purple-400">Características Principales</h4>
                  <ul className="space-y-2 sm:space-y-3 text-slate-300">

                    <li className="flex items-start gap-3">
                      <Brain className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base">
                        <span className="font-semibold text-white">Fine-tuning personalizado:</span> Entrenamiento específico de YOLOv8 para añadir una nueva clase (<span className="text-white">keys</span>) mediante anotación y adaptación de dataset.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <Code2 className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base">
                        <span className="font-semibold text-white">Arquitectura multi-modelo:</span> Integración simultánea de dos modelos (YOLOv8 COCO + modelo fine-tuned) para evitar <span className="italic">catastrophic forgetting</span>.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <Eye className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base">
                        <span className="font-semibold text-white">Detección en tiempo real:</span> Procesamiento de vídeo en vivo con OpenCV, combinando resultados de ambos modelos en una única visualización.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <Settings className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm sm:text-base">
                        <span className="font-semibold text-white">Pipeline completo:</span> Preparación de dataset, corrección de etiquetas, configuración multiplataforma (Windows/Linux) y optimización de inferencia.
                      </span>
                    </li>

                  </ul>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-purple-400">Stack Tecnológico</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Computer Vision', 'Deep Learning', 'Object Detection', 'Fine-tuning', 'Dataset Annotation'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-700/50 rounded-lg text-xs sm:text-sm border border-slate-600/50 hover:border-purple-500/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-purple-400">Resultados</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                    <li>Detección precisa de objetos personalizados (<span className="font-semibold text-white">keys</span>)</li>
                    <li>Preservación de detección COCO mediante arquitectura multi-modelo</li>
                    <li>Sistema de detección en tiempo real funcional en CPU</li>
                    <li>Experiencia práctica en <span className="font-semibold text-white">Continual Learning</span> y limitaciones reales de fine-tuning</li>
                  </ul>
                </div>

                <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <a href="https://github.com/IkerMunozz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                    <Github size={18} />
                    Ver Código
                  </a>
                </div>
              </div>

              <div className="bg-slate-900 p-4 sm:p-6 flex items-center justify-center">
               <video
                  src="/videos/VideoDemostracion.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full rounded-lg border border-slate-700"
                />

              </div>

            </div>
          </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl mb-8 sm:mb-16">
              <div className="flex flex-col md:grid md:grid-cols-2">

                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Database size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Traffic Flow Analysis & Prediction</h3>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                    Sistema de análisis y predicción de tráfico urbano mediante técnicas de
                    <span className="text-cyan-400 font-semibold"> Machine Learning </span>
                    y análisis de datos, enfocado en la identificación de patrones temporales
                    y la predicción de congestión a partir de datos reales.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Características Principales</h4>
                    <ul className="space-y-2 sm:space-y-3 text-slate-300">

                      <li className="flex items-start gap-3">
                        <Database className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                        <span className="text-sm sm:text-base">
                          <span className="font-semibold text-white">Análisis Exploratorio: </span>
                          Limpieza, transformación y visualización de datos para identificar
                          patrones de tráfico por franja horaria y día de la semana.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <Brain className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                        <span className="text-sm sm:text-base">
                          <span className="font-semibold text-white">Modelado Predictivo: </span>
                          Entrenamiento y evaluación de modelos de Machine Learning
                          para estimar niveles de congestión futuros.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <Globe className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                        <span className="text-sm sm:text-base">
                          <span className="font-semibold text-white">Visualización de Resultados: </span>
                          Representación gráfica de tendencias y comparación entre
                          valores reales y predichos.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <Settings className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                        <span className="text-sm sm:text-base">
                          <span className="font-semibold text-white">Pipeline Completo: </span>
                          Preprocesamiento, división train/test, entrenamiento,
                          validación y análisis de métricas de rendimiento.
                        </span>
                      </li>

                    </ul>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Stack Tecnológico</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {[
                        'Python',
                        'Pandas',
                        'NumPy',
                        'Matplotlib',
                        'Scikit-learn',
                        'Machine Learning',
                        'Data Analysis',
                        'Regression',
                        'Time Series'
                      ].map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-700/50 rounded-lg text-xs sm:text-sm border border-slate-600/50 hover:border-cyan-500/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Resultados</h4>
                    <ul className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                      <li>Identificación clara de patrones de congestión por franja horaria</li>
                      <li>Modelo predictivo con buena capacidad de generalización</li>
                      <li>Aplicación práctica de técnicas de regresión y análisis temporal</li>
                      <li>Experiencia sólida en interpretación de métricas (MAE, RMSE, R²)</li>
                    </ul>
                  </div>

                  <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <a
                      href="https://github.com/IkerMunozz/Modelo_AnalisisTrafico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                      <Github size={18} />
                      Ver Código
                    </a>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">

                  <div className="w-full">
                    <video
                      src="/videos/Video_deteccion.mp4"
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
                    />
                  </div>

                  <div className="w-full">
                    <img
                      src={deteccion}
                      alt="Detección de objetos"
                      className="w-full rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
                    />
                  </div>

                </div>

              </div>
            </div>
          </div>
          )}

          {activeTab === 'vibecoding' && (
            <div className="space-y-16">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl">
                <div className="flex flex-col md:grid md:grid-cols-2">
                  <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <Brain size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Zalando Size Exchange Automator</h3>
                        <p className="text-xs sm:text-sm text-cyan-400 font-semibold mt-0.5">Full-Stack • AI Integration</p>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                      Plataforma full-stack que automatiza el proceso de cambios de talla en e-commerce mediante <span className="text-cyan-400 font-semibold">Inteligencia Artificial</span>. Integra un chatbot inteligente con Gemini, validación en tiempo real y automatización de logística, reduciendo la carga operativa mientras mejora la experiencia del cliente en entornos de producción real.
                    </p>

                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Características Principales</h4>
                      <ul className="space-y-2 sm:space-y-3 text-slate-300">
                        <li className="flex items-start gap-3">
                          <Brain className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                          <span className="text-sm sm:text-base"><span className="font-semibold text-white">Chatbot Inteligente:</span> Integración con Google Gemini para detectar intenciones y extraer datos de pedidos automáticamente</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Database className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                          <span className="text-sm sm:text-base"><span className="font-semibold text-white">Validación en Tiempo Real:</span> Verificación de stock, plazos de devolución y estado de pedidos con manejo de excepciones empresariales</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Settings className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                          <span className="text-sm sm:text-base"><span className="font-semibold text-white">Automatización Logística:</span> Generación automática de etiquetas de devolución (RMA) y creación de nuevos pedidos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Globe className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                          <span className="text-sm sm:text-base"><span className="font-semibold text-white">Panel de Control:</span> Monitorización en vivo de inventario, logs del sistema e indicadores de excepción</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Code2 className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                          <span className="text-sm sm:text-base"><span className="font-semibold text-white">API REST:</span> Endpoints bien estructurados para gestión de inventario, logs y procesamiento de solicitudes</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Stack Tecnológico</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Google Gemini SDK', 'Framer Motion', 'API REST'].map(tech => (
                          <span key={tech} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-700/50 rounded-lg text-xs sm:text-sm border border-slate-600/50 hover:border-cyan-500/50 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-lg sm:text-xl font-semibold text-cyan-400">Resultados</h4>
                      <ul className="space-y-1.5 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                        <li>✓ IA aplicada a logística: Chatbot inteligente con comprensión de contexto empresarial</li>
                        <li>✓ Automatización de procesos: Reducción de carga operativa mediante APIs y workflows inteligentes</li>
                        <li>✓ Manejo robusto de excepciones: Validaciones complejas (stock, plazos, duplicidades)</li>
                        <li>✓ Full-stack profesional: Arquitectura escalable ready para producción</li>
                      </ul>
                    </div>

                    <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                      <a href="https://github.com/ikerfedeto/Soporte_zalando" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                        <Github size={18} />
                        Ver Código
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 sm:p-4 flex flex-col gap-2 sm:gap-3">
                    <img src={imagenZalando} alt="Zalando - Dashboard Principal" className="rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 w-full h-auto" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <img src={analiticaZalando} alt="Zalando - Analítica" className="w-full h-auto rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300" />
                      <img src={historialZalando} alt="Zalando - Historial" className="w-full h-auto rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300" />
                    </div>
                    <img src={inventarioZalando} alt="Zalando - Inventario" className="rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
            </div>
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
    </div>
  );
}