
import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import { TechStackCanvas } from './components/TechStackAnimation';
import { StatsCanvas } from './components/StatsAnimation';

const HomePage = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set());

  // Scroll Animation Hook
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setAnimatedSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    }, observerOptions);

    // Observe all sections with data-section attribute
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // SEO Schema.org JSON-LD
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TRICAST360® - Revolutionärer Baumschutz",
      "description":
        "Revolutionäres Schutzsystem für Bäume - wiederverwendbar, nachhaltig und kostengünstig. Perfekt für Baustellen, Veranstaltungen und Stadtentwicklung.",
      "url": import.meta.env.VITE_SITE_URL,
      "mainEntity": {
        "@type": "Product",
        "name": "TRICAST360® Baumschutzsystem",
        "description":
          "Modulares 360°-Baumschutzsystem mit innovativer Klick-Technologie",
        "brand": {
          "@type": "Brand",
          "name": "TRICAST360",
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "EUR",
        },
      },
    });
    document.head.appendChild(script);

    // Update page title and meta description
    document.title = "TRICAST360® - Revolutionärer Baumschutz";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Revolutionäres Schutzsystem für Bäume - wiederverwendbar, nachhaltig und kostengünstig. Perfekt für Baustellen, Veranstaltungen und Stadtentwicklung.'
      );
    }

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // FormData in Objekt konvertieren
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Ihre Anfrage wurde erfolgreich gesendet!');
        form.reset();
        setIsContactFormOpen(false);
      } else {
        alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c14]">
      {/* Header */}
      <header className="bg-[#0a0c14]/95 backdrop-blur-md shadow-lg border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="/Logo Tricast360 white.webp"
                  alt="TriCast360 Logo"
                  className="h-12 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/system" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                System
              </a>
              <a href="/shop" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                Shop
              </a>
              <a href="/ueber-uns" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                Über uns
              </a>
              <a href="/kontakt" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                Kontakt
              </a>
              <a
                href="/kontakt"
                className="bg-[#baf742] text-[#0a0c14] px-6 py-2 rounded-full font-semibold hover:bg-[#a8e63a] transition-all duration-300 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap"
              >
                Jetzt anfragen
              </a>
            </nav>

            {/* Mobile Hamburger Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#baf742] transition-colors p-3 rounded-lg hover:bg-white/5 group"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                    }`}
                  ></span>
                  <span
                    className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-[#0a0c14]/95 backdrop-blur-md border-t border-white/5 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 max-h-[70vh] overflow-y-auto">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/system"
                  className="text-white/80 hover:text-[#baf742] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  System
                </a>
                <a
                  href="/shop"
                  className="text-white/80 hover:text-[#baf742] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </a>
                <a
                  href="/ueber-uns"
                  className="text-white/80 hover:text-[#baf742] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Über uns
                </a>
                <a
                  href="/kontakt"
                  className="text-white/80 hover.text-[#baf742] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kontakt
                </a>
                <a
                  href="/kontakt"
                  className="bg-[#baf742] text-[#0a0c14] px-6 py-3 rounded-full font-semibold hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jetzt anfragen
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Highlights Section with GSAP Animation - HELL */}
      <div className="bg-white">
        <HighlightsSection />
      </div>

      {/* Main Content Section - DUNKEL */}
      <section 
        className="py-20 bg-gradient-to-b from-[#0a0c14] to-[#0f1219]"
        data-section="main-content"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div 
              className={`space-y-6 transition-all duration-1000 ${
                animatedSections.has('main-content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-[#baf742]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#baf742]/20">
                <i className="ri-leaf-line text-[#baf742]"></i>
                <span className="text-[#baf742] font-semibold text-sm">Nachhaltig & Effizient</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Innovativer Baumschutz für moderne Baustellen
              </h2>
              
              <div className="space-y-4">
                <div 
                  className={`flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#baf742]/30 transition-all duration-700 delay-200 ${
                    animatedSections.has('main-content') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#baf742]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-[#baf742] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Schnelle Installation</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Werkzeuglos montierbar in unter 5 Minuten und vollständig wiederverwendbar für unbegrenzte Projekte.
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#baf742]/30 transition-all duration-700 delay-300 ${
                    animatedSections.has('main-content') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#baf742]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-recycle-line text-[#baf742] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">100% Nachhaltig</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      100% recycelbare Materialien, CO₂-neutrale Produktion und unbegrenzte Wiederverwendbarkeit.
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#baf742]/30 transition-all duration-700 delay-400 ${
                    animatedSections.has('main-content') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#baf742]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-award-line text-[#baf742] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Praxiserprobt</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Erfolgreich getestet in über 500 Bauprojekten europaweit und bewährt seit 2020.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/system"
                className={`inline-flex items-center gap-2 bg-[#baf742] text-[#0a0c14] px-8 py-4 rounded-xl font-semibold hover:bg-[#a8e63a] transition-all duration-700 delay-500 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap group ${
                  animatedSections.has('main-content') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
              >
                Mehr erfahren
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>

            {/* Right Image */}
            <div 
              className={`relative transition-all duration-1000 delay-300 ${
                animatedSections.has('main-content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-transparent rounded-3xl blur-3xl"></div>
              <img
                src="/Tricast360 Baumschutzmodul inmitten einer Stadtbaustelle.webp"
                alt="TriCast360 Baumschutz System"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] border border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0a0c14]/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-[#baf742]/30">
                <div className="text-5xl font-bold text-[#baf742] mb-1">&lt;5min</div>
                <div className="text-sm text-white/60">Installation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - HELL */}
      <section 
        className="py-20 bg-white"
        data-section="tech-stack"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              animatedSections.has('tech-stack') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-[#baf742]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#baf742]/20 mb-6">
              <i className="ri-lightbulb-line text-[#baf742]"></i>
              <span className="text-[#baf742] font-semibold text-sm">Innovation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E1C3D] mb-4">Unsere Technologie</h2>
            <p className="text-xl text-[#0E1C3D]/60">Innovation trifft auf Nachhaltigkeit</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tech Item 1 */}
            <div 
              className={`group bg-gray-50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-[#baf742]/50 transition-all duration-700 hover:transform hover:scale-105 ${
                animatedSections.has('tech-stack') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-64 h-64 mx-auto mb-6">
                <TechStackCanvas type="modular" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0E1C3D] mb-3 text-center group-hover:text-[#baf742] transition-colors">Modulares System</h3>
              <p className="text-[#0E1C3D]/60 text-center leading-relaxed">
                Flexible Anpassung an jeden Baumstamm durch intelligente Klick-Technologie
              </p>
            </div>

            {/* Tech Item 2 */}
            <div 
              className={`group bg-gray-50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-[#baf742]/50 transition-all duration-700 hover:transform hover:scale-105 ${
                animatedSections.has('tech-stack') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="w-64 h-64 mx-auto mb-6">
                <TechStackCanvas type="quick" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0E1C3D] mb-3 text-center group-hover:text-[#baf742] transition-colors">Schnelle Installation</h3>
              <p className="text-[#0E1C3D]/60 text-center leading-relaxed">
                Werkzeuglose Montage in unter 5 Minuten spart Zeit und Kosten
              </p>
            </div>

            {/* Tech Item 3 */}
            <div 
              className={`group bg-gray-50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-[#baf742]/50 transition-all duration-700 hover:transform hover:scale-105 ${
                animatedSections.has('tech-stack') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="w-64 h-64 mx-auto mb-6">
                <TechStackCanvas type="sustainable" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0E1C3D] mb-3 text-center group-hover:text-[#baf742] transition-colors">100% Nachhaltig</h3>
              <p className="text-[#0E1C3D]/60 text-center leading-relaxed">
                Wiederverwendbar und vollständig recycelbar für maximale Umweltfreundlichkeit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - DUNKEL */}
      <section 
        className="py-20 bg-gradient-to-b from-[#0a0c14] to-[#0f1219]"
        data-section="stats"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Stats */}
            <div 
              className={`space-y-8 transition-all duration-1000 ${
                animatedSections.has('stats') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-[#baf742]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#baf742]/20">
                <i className="ri-bar-chart-line text-[#baf742]"></i>
                <span className="text-[#baf742] font-semibold text-sm">Bewährte Effizienz</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Messbare Vorteile im Baumschutz
              </h2>
              
              <div 
                className={`space-y-6 transition-all duration-700 delay-300 ${
                  animatedSections.has('stats') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="text-6xl font-bold text-[#baf742] mb-3">90%</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Schnellere Installation
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Durch werkzeuglose Montage und modulares Design erreichen wir eine 
                    deutlich höhere Effizienz im Vergleich zu herkömmlichen Baumschutzsystemen.
                  </p>
                </div>

                <div className="space-y-3">
                  <div 
                    className={`flex items-center gap-3 text-white/80 transition-all duration-500 delay-500 ${
                      animatedSections.has('stats') 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-5'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#baf742]/20 rounded-lg flex items-center justify-center">
                      <i className="ri-check-line text-[#baf742]"></i>
                    </div>
                    Bis zu 70% Kostenersparnis durch Wiederverwendbarkeit
                  </div>
                  <div 
                    className={`flex items-center gap-3 text-white/80 transition-all duration-500 delay-600 ${
                      animatedSections.has('stats') 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-5'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#baf742]/20 rounded-lg flex items-center justify-center">
                      <i className="ri-check-line text-[#baf742]"></i>
                    </div>
                    100% recycelbare Materialien
                  </div>
                  <div 
                    className={`flex items-center gap-3 text-white/80 transition-all duration-500 delay-700 ${
                      animatedSections.has('stats') 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-5'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#baf742]/20 rounded-lg flex items-center justify-center">
                      <i className="ri-check-line text-[#baf742]"></i>
                    </div>
                    Fördert die Wirtschaftlichkeit des Unternehmens
                  </div>
                </div>
              </div>
            </div>

            {/* Right WebGL Animation */}
            <div 
              className={`relative h-[600px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-1000 delay-400 ${
                animatedSections.has('stats') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <StatsCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - HELL */}
      <section 
        className="py-20 bg-white relative overflow-hidden"
        data-section="vision"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              animatedSections.has('vision') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E1C3D] mb-8 leading-tight">
              Baumschutz neu gedacht: Nachhaltig, effizient und zukunftsorientiert
            </h2>
            <p className="text-xl text-[#0E1C3D]/60 mb-12 leading-relaxed">
              TRICAST360<sup>®</sup> revolutioniert den Baumschutz auf Baustellen durch innovative Technologie 
              und nachhaltiges Design. Unser modulares System schützt nicht nur Bäume, sondern auch die Umwelt und Ihr Budget.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-700 delay-300 ${
                animatedSections.has('vision') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <a
                href="/kontakt"
                className="group bg-[#baf742] text-[#0E1C3D] px-8 py-4 rounded-xl font-semibold hover:bg-[#a8e63a] transition-all duration-300 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center justify-center gap-2">
                  Jetzt anfragen
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </a>
              <a
                href="/system"
                className="group bg-[#baf742] text-[#0E1C3D] px-8 py-4 rounded-xl font-semibold hover:bg-[#a8e63a] transition-all duration-300 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center justify-center gap-2">
                  System entdecken
                  <i className="ri-play-circle-line group-hover:scale-110 transition-transform"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - DUNKEL */}
      <footer className="bg-[#0a0c14] text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <img
                src="/Logo Tricast360 white.webp"
                alt="TriCast360 Logo"
                className="h-12 w-auto mb-4"
              />
              <p className="text-white/60 mb-4">
                Innovativer 360°-Baumschutz für eine nachhaltige Zukunft.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="/system" className="text-white/60 hover:text-[#baf742] transition-colors">System</a></li>
                <li><a href="/shop" className="text-white/60 hover:text-[#baf742] transition-colors">Shop</a></li>
                <li><a href="/ueber-uns" className="text-white/60 hover:text-[#baf742] transition-colors">Über uns</a></li>
                <li><a href="/kontakt" className="text-white/60 hover:text-[#baf742] transition-colors">Kontakt</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Rechtliches</h3>
              <ul className="space-y-2">
                <li><a href="/impressum" className="text-white/60 hover:text-[#baf742] transition-colors">Impressum</a></li>
                <li><a href="/datenschutz" className="text-white/60 hover:text-[#baf742] transition-colors">Datenschutz</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} TRICAST360<sup>®</sup>. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0c14] border border-white/10 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Jetzt anfragen
                </h3>
                <button
                  onClick={() => setIsContactFormOpen(false)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                data-readdy-form
                id="modal-contact-form"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Vorname
                  </label>
                  <input
                    type="text"
                    name="vorname"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Nachname
                  </label>
                  <input
                    type="text"
                    name="nachname"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    name="unternehmen"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf744] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Nachricht
                  </label>
                  <textarea
                    name="nachricht"
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent resize-none text-white"
                    placeholder="Beschreiben Sie Ihr Projekt..."
                  ></textarea>
                  <p className="text-sm text-white/60 mt-1">
                    Maximal 500 Zeichen
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#baf742] text-[#0a0c14] py-3 rounded-lg font-semibold hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Anfrage senden
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
