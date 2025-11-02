
import { useState, useEffect, useRef } from 'react';

const SystemPage = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Auto scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer für Scroll-Animationen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  // SEO Schema.org JSON-LD
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "TRICAST360® Baumschutzsystem",
      "description": "Revolutionäres modulares 360°-Baumschutzsystem mit innovativer Klick-Technologie. Werkzeuglos montierbar, 100% nachhaltig und wiederverwendbar.",
      "url": import.meta.env.VITE_SITE_URL + "/system",
      "brand": {
        "@type": "Brand",
        "name": "TRICAST360®"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "EUR"
      }
    });
    document.head.appendChild(script);

    // Update page title and meta description
    document.title = "TRICAST360® System - Revolutionärer Baumschutz";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Entdecken Sie das revolutionäre TRICAST360® Baumschutzsystem. Modularer 360°-Schutz, werkzeuglos montierbar, 100% nachhaltig und wiederverwendbar.');
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
      {/* Header - Same as HomePage */}
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
              <a href="/system" className="text-[#baf742] font-medium">
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
                  className="text-[#baf742] font-medium py-2"
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
                  className="text-white/80 hover:text-[#baf742] transition-colors font-medium py-2"
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
      <section 
        id="hero"
        ref={setSectionRef('hero')}
        className={`relative py-32 lg:py-40 bg-gradient-to-br from-[#0a0c14] to-[#0f1219] overflow-hidden transition-all duration-1000 ${
          isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-[#baf742]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#baf742]/20 mb-10">
              <i className="ri-settings-3-line text-[#baf742] text-xl"></i>
              <span className="text-[#baf742] font-semibold text-lg">Unser System</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10 leading-tight">
              Das <span className="text-[#baf742]">TRICAST360<sup className="-mt-2">®</sup></span> System
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-white/80 mb-16 leading-relaxed max-w-5xl mx-auto">
              Revolutionärer 360°-Baumschutz mit modularer Klick-Technologie
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-full shadow-lg border border-white/10">
                <div className="w-12 h-12 bg-[#baf742] rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-[#0a0c14] text-2xl"></i>
                </div>
                <span className="text-white font-semibold text-xl">&lt;5min Installation</span>
              </div>
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-full shadow-lg border border-white/10">
                <div className="w-12 h-12 bg-[#baf742] rounded-full flex items-center justify-center">
                  <i className="ri-tools-line text-[#0a0c14] text-2xl"></i>
                </div>
                <span className="text-white font-semibold text-xl">Werkzeuglos</span>
              </div>
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-full shadow-lg border border-white/10">
                <div className="w-12 h-12 bg-[#baf742] rounded-full flex items-center justify-center">
                  <i className="ri-recycle-line text-[#0a0c14] text-2xl"></i>
                </div>
                <span className="text-white font-semibold text-xl">100% Nachhaltig</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section 
        id="overview"
        ref={setSectionRef('overview')}
        className={`py-32 lg:py-48 bg-white transition-all duration-1000 delay-200 ${
          isVisible('overview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0E1C3D] mb-8">Systemübersicht</h2>
            <p className="text-2xl lg:text-3xl text-[#0E1C3D]/80">Komponenten</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0E1C3D] mb-12">
                Innovation trifft<br />Nachhaltigkeit
              </h3>
              <p className="text-2xl lg:text-3xl text-[#0E1C3D]/80 mb-16 leading-relaxed">
                Das TRICAST360<sup className="-mt-2">®</sup>-System revolutioniert den Baumschutz durch intelligente Modularität und nachhaltige Materialien. Entwickelt für die Anforderungen moderner Baustellen.
              </p>

              <div className="grid grid-cols-2 gap-16">
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold text-[#baf742] mb-4">2020</div>
                  <p className="text-[#0E1C3D] font-semibold text-2xl">Praxiserprobt seit</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold text-[#baf742] mb-4">✓</div>
                  <p className="text-[#0E1C3D] font-semibold text-2xl">Bereit für den Markteintritt</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-transparent rounded-3xl blur-3xl animate-pulse-slow"></div>
              <img
                src="/tricast360 baumschutzmodul baustelle.webp"
                alt="TriCast360 System Übersicht"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] lg:h-[600px] border border-[#baf742]/10 transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-10 -left-10 bg-[#baf742] p-8 rounded-3xl shadow-2xl animate-float-1">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0a0c14] mb-1">&lt;5min</div>
                  <div className="text-lg text-[#0a0c14] font-semibold">Installation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Features */}
      <section 
        id="features"
        ref={setSectionRef('features')}
        className={`py-32 lg:py-48 bg-[#f8fdf8] transition-all duration-1000 delay-300 ${
          isVisible('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0E1C3D] mb-8">TRICAST360<sup className="-mt-2">®</sup> System</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
            {/* Modulares Design - Enhanced Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30">
                <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mb-8 mx-auto">
                  <i className="ri-puzzle-line text-[#0E1C3D] text-4xl"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-8 text-center group-hover:text-[#baf742] transition-colors">Modulares Design</h3>
                <p className="text-[#0E1C3D]/80 mb-8 text-xl text-center leading-relaxed">
                  Flexible Anpassung an verschiedene Baumstämme und Situationen
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Stammumfang 20-80 cm</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Höhe stufenlos verstellbar</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Beliebig erweiterbar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gurt-Verbindung - Enhanced Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30">
                <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mb-8 mx-auto">
                  <i className="ri-links-line text-[#0E1C3D] text-4xl"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-8 text-center group-hover:text-[#baf742] transition-colors">Gurt-Verbindung</h3>
                <p className="text-[#0E1C3D]/80 mb-8 text-xl text-center leading-relaxed">
                  Werkzeuglose Installation in wenigen Minuten
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Ohne Werkzeug</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Sichere Verriegelung</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Einfache Demontage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 360° Rundumschutz - Enhanced Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30">
                <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mb-8 mx-auto">
                  <i className="ri-shield-check-line text-[#0E1C3D] text-4xl"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-8 text-center group-hover:text-[#baf742] transition-colors">360° Rundumschutz</h3>
                <p className="text-[#0E1C3D]/80 mb-8 text-xl text-center leading-relaxed">
                  Vollständiger Schutz des Baumstammes vor Beschädigungen
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Kompletter Rundumschutz</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Stoßdämpfende Wirkung</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Witterungsbeständig</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wiederverwendbar - Enhanced Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30">
                <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mb-8 mx-auto">
                  <i className="ri-recycle-line text-[#0E1C3D] text-4xl"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-8 text-center group-hover:text-[#baf742] transition-colors">Wiederverwendbar</h3>
                <p className="text-[#0E1C3D]/80 mb-8 text-xl text-center leading-relaxed">
                  Nachhaltig durch mehrfache Nutzung auf verschiedenen Baustellen
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Mehrfach verwendbar</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Einfache Reinigung</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="ri-check-line text-[#baf742] mr-4 text-2xl"></i>
                    <span className="text-[#0E1C3D] text-xl">Langlebige Materialien</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TriCast360 Stats */}
      <section 
        id="stats"
        ref={setSectionRef('stats')}
        className={`py-32 lg:py-48 bg-white transition-all duration-1000 delay-400 ${
          isVisible('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0E1C3D] mb-8">Warum TRICAST360<sup className="-mt-2">®</sup>?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
            <div className="text-center">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-5xl font-bold text-white">90%</span>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-md">
                  <i className="ri-time-line text-white text-xl"></i>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0E1C3D] mb-8">Weniger Installationszeit</h3>
              <p className="text-[#0E1C3D]/70 text-2xl">
                Drastische Zeitersparnis durch werkzeuglose Installation
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-5xl font-bold text-white">100%</span>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-md">
                  <i className="ri-recycle-line text-white text-xl"></i>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0E1C3D] mb-8">Nachhaltig</h3>
              <p className="text-[#0E1C3D]/70 text-2xl">
                Vollständig recycelbare Materialien und wiederverwendbar
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-5xl font-bold text-white">100%</span>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-md">
                  <i className="ri-shield-check-line text-white text-xl"></i>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0E1C3D] mb-8">Praxiserprobt</h3>
              <p className="text-[#0E1C3D]/70 text-2xl">
                Von Behörden abgenommen und erfolgreich in Praxistests bewährt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section 
        id="technical"
        ref={setSectionRef('technical')}
        className={`py-32 lg:py-48 bg-[#f8fdf8] transition-all duration-1000 delay-500 ${
          isVisible('technical') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/15 to-transparent rounded-3xl blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              <img 
                src="/tricast 360 baumschutzmodul baustelle 2.webp"
                alt="Technische Details"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] lg:h-[600px] border border-[#baf742]/10 transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#baf742] p-8 rounded-3xl shadow-2xl animate-float-2" style={{ animationDelay: '0.5s' }}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0a0c14] mb-1">360°</div>
                  <div className="text-lg text-[#0a0c14] font-semibold">Schutz</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0E1C3D] mb-12">
                Einfache Installation
              </h2>
              <p className="text-2xl lg:text-3xl text-[#0E1C3D]/80 mb-16">
                Das TRICAST360<sup className="-mt-2">®</sup>-System ist so konzipiert, dass es ohne Spezialwerkzeug oder Fachkenntnisse installiert werden kann.
              </p>

              <div className="space-y-12">
                <div className="flex items-start group">
                  <div className="w-20 h-20 bg-[#baf742] rounded-full flex items-center justify-center mr-8 mt-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-pulse-slow">
                    <span className="text-[#0E1C3D] font-bold text-3xl">1</span>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0E1C3D] mb-4 group-hover:text-[#baf742] transition-colors">Module positionieren</h3>
                    <p className="text-[#0E1C3D]/70 text-2xl">
                      Einfach um den Baumstamm platzieren
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-20 h-20 bg-[#baf742] rounded-full flex items-center justify-center mr-8 mt-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
                    <span className="text-[#0E1C3D] font-bold text-3xl">2</span>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0E1C3D] mb-4 group-hover:text-[#baf742] transition-colors">Klick-Verbindung</h3>
                    <p className="text-[#0E1C3D]/70 text-2xl">
                      Werkzeuglos zusammenstecken
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-20 h-20 bg-[#baf742] rounded-full flex items-center justify-center mr-8 mt-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-pulse-slow" style={{ animationDelay: '1s' }}>
                    <span className="text-[#0E1C3D] font-bold text-3xl">3</span>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0E1C3D] mb-4 group-hover:text-[#baf742] transition-colors">Gurt befestigen</h3>
                    <p className="text-[#0E1C3D]/70 text-2xl">
                      Sichere Fixierung ohne Werkzeug
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        ref={setSectionRef('cta')}
        className={`py-32 lg:py-48 bg-[#0E1C3D] transition-all duration-1000 delay-600 ${
          isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-[#baf742]/20 px-8 py-4 rounded-full mb-12">
            <span className="text-[#baf742] font-medium text-2xl">Praxiserprobt seit 2020</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-12">
            Bereit für Ihr Projekt?
          </h2>
          <p className="text-2xl lg:text-3xl text-white/80 mb-16 max-w-4xl mx-auto">
            Entdecken Sie die Vorteile des TRICAST360<sup className="-mt-2">®</sup>-Systems für Ihr nächstes Bauprojekt. Kostenlose Beratung und individuelles Angebot.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href="/kontakt"
                className="bg-[#baf742] text-[#0E1C3D] px-12 py-6 rounded-lg text-2xl font-semibold hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap"
              >
                Projekt anfragen
              </a>
              <a
                href="/"
                className="border-2 border-[#baf742] text-[#baf742] px-12 py-6 rounded-lg text-2xl font-semibold hover:bg-[#baf742] hover:text-[#0E1C3D] transition-colors cursor-pointer whitespace-nowrap"
              >
                Zurück zur Startseite
              </a>
            </div>
        </div>
      </section>

      {/* Footer - Same as HomePage */}
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
                Revolutionärer 360°-Baumschutz für eine nachhaltige Zukunft.
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
              © {new Date().getFullYear()} TRICAST360<sup className="-mt-2">®</sup>. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal - Same as HomePage */}
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
                id="system-contact-form"
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
                    className="w-0 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
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

export default SystemPage;
