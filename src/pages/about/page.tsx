
import { useState, useEffect, useRef } from 'react';
import { AnimatedCard } from '../../components/AnimatedCard';
import { SEOHead, pageSEO } from '../../components/SEOHead';

const AboutPage = () => {
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
      "@type": "AboutPage",
      "name": "Über TRICAST360® - Das Team hinter der Innovation",
      "description": "Lernen Sie das Team hinter TRICAST360® kennen. Wir revolutionieren den Baumschutz mit nachhaltigen, innovativen Lösungen für eine grünere Zukunft.",
      "url": import.meta.env.VITE_SITE_URL + "/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "TRICAST360®",
        "foundingDate": "2024",
        "description": "Entwickler innovativer Baumschutzsysteme",
        "employee": [
          {
            "@type": "Person",
            "name": "Galip Alkan",
            "jobTitle": "Technischer Leiter"
          },
          {
            "@type": "Person",
            "name": "Rifat Acar",
            "jobTitle": "Nachhaltigkeitsexperte"
          },
          {
            "@type": "Person",
            "name": "Simon Müller",
            "jobTitle": "Technischer Leiter"
          }
        ]
      }
    });
    document.head.appendChild(script);

    // Update page title and meta description
    document.title = "Über TRICAST360® - Das Team hinter der Innovation";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lernen Sie das Team hinter TriCast360 kennen. Wir revolutionieren den Baumschutz mit nachhaltigen, innovativen Lösungen für eine grünere Zukunft.');
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
    <div className="min-h-screen bg-white">
      <SEOHead {...pageSEO.about} />
      {/* Header - Same as HomePage but with dark background */}
      <header className="bg-[#0a0c14]/95 backdrop-blur-md shadow-lg border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="/Logo Tricast360 white.webp"
                  alt="TRICAST360 Logo - Revolutionärer Baumschutz für Bäume und Werte"
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
              <a href="/ueber-uns" className="text-[#baf742] font-medium">
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
                  className="text-[#baf742] font-medium py-2"
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
        <div className="absolute inset-0 bg-[url('/hintergrund%20about%20us.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-[#baf742]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#baf742]/20 mb-10">
              <i className="ri-team-line text-[#baf742] text-xl"></i>
              <span className="text-[#baf742] font-semibold text-lg">Unser Team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10 leading-tight">
              Über <span className="text-[#baf742]">TRICAST360<sup className="-mt-2">®</sup></span>
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-white/80 mb-16 leading-relaxed max-w-5xl mx-auto">
              Wir revolutionieren den Baumschutz mit nachhaltigen, innovativen Lösungen für eine grünere Zukunft
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-sm px-6 sm:px-10 py-5 rounded-full shadow-lg border border-white/10 min-w-[200px] sm:min-w-[250px] justify-center">
                <div className="w-12 h-12 bg-[#baf742] rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-[#0a0c14] text-2xl"></i>
                </div>
                <span className="text-white font-semibold text-lg sm:text-xl">&lt;5min Installation</span>
              </div>
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-sm px-6 sm:px-10 py-5 rounded-full shadow-lg border border-white/10 min-w-[200px] sm:min-w-[250px] justify-center">
                <div className="w-12 h-12 bg-[#baf742] rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-leaf-line text-[#0a0c14] text-2xl"></i>
                </div>
                <span className="text-white font-semibold text-lg sm:text-xl">100% Nachhaltig</span>
              </div>
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-sm px-6 sm:px-10 py-5 rounded-full shadow-lg border border-white/10 min-w-[200px] sm:min-w-[250px] justify-center">
                <div className="w-12 h-12 bg-[#baf742] rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-recycle-line text-[#0a0c14] text-2xl"></i>
                </div>
                <span className="text-white font-semibold text-lg sm:text-xl">Wiederverwendbar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 lg:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0E1C3D] mb-8">Warum TRICAST360<sup className="-mt-2">®</sup>?</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 lg:gap-20">
            {/* Stat Card 1 - Enhanced */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div className="relative inline-block mb-8">
                    <div className="w-40 h-40 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl font-bold text-white">2024</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-md">
                      <i className="ri-calendar-line text-white text-xl"></i>
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-6 group-hover:text-[#baf742] transition-colors">Gegründet</h3>
                  <p className="text-[#0E1C3D]/70 text-xl leading-relaxed mb-8 flex-1">
                    Seit 2024 entwickeln wir innovative Baumschutzlösungen für eine nachhaltige Zukunft.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 bg-[#baf742]/10 px-6 py-3 rounded-full border border-[#baf742]/20">
                      <i className="ri-rocket-line text-[#baf742] text-xl"></i>
                      <span className="text-[#0E1C3D] font-semibold">Startup 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Card 2 - Enhanced */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div className="relative inline-block mb-8">
                    <div className="w-40 h-40 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-3xl font-bold text-white">Direkt</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-md">
                      <i className="ri-user-voice-line text-white text-xl"></i>
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-6 group-hover:text-[#baf742] transition-colors">Persönlicher Service</h3>
                  <p className="text-[#0E1C3D]/70 text-xl leading-relaxed mb-8 flex-1">
                    Direkter Kontakt zu den Gründern für individuelle Beratung und maßgeschneiderte Lösungen.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 bg-[#baf742]/10 px-6 py-3 rounded-full border border-[#baf742]/20">
                      <i className="ri-phone-line text-[#baf742] text-xl"></i>
                      <span className="text-[#0E1C3D] font-semibold">Direkter Draht</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Card 3 - Enhanced */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/20 to-[#baf742]/5 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#baf742]/10 group-hover:border-[#baf742]/30 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div className="relative inline-block mb-8">
                    <div className="w-40 h-40 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-3xl font-bold text-white">Vision</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-md">
                      <i className="ri-lightbulb-line text-white text-xl"></i>
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-6 group-hover:text-[#baf742] transition-colors">Innovative Lösungen</h3>
                  <p className="text-[#0E1C3D]/70 text-xl leading-relaxed mb-8 flex-1">
                    Wir revolutionieren den Baumschutz mit modernster Technologie und nachhaltigen Materialien.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 bg-[#baf742]/10 px-6 py-3 rounded-full border border-[#baf742]/20">
                      <i className="ri-flashlight-line text-[#baf742] text-xl"></i>
                      <span className="text-[#0E1C3D] font-semibold">Technologie</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="mission"
        ref={setSectionRef('mission')}
        className={`py-32 lg:py-40 bg-white transition-all duration-1000 delay-200 ${
          isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="mb-12">
                <h2 className="text-5xl md:text-6xl font-bold text-[#0E1C3D] leading-tight">
                  Bäume schützen, Zukunft gestalten
                </h2>
              </div>
              <div className="space-y-10 text-[#0E1C3D]/80 text-xl leading-relaxed">
                <p className="text-2xl">
                  Bei TriCast360 entwickeln wir innovative Baumschutzsysteme, die Nachhaltigkeit und Effizienz perfekt vereinen. Unser revolutionäres 360°-Schutzsystem ermöglicht es, Bäume während Bauprojekten optimal zu schützen.
                </p>
                <p className="text-xl">
                  Wir glauben daran, dass Umweltschutz und wirtschaftlicher Erfolg Hand in Hand gehen können. Deshalb haben wir ein System entwickelt, das nicht nur die Umwelt schont, sondern auch Kosten spart.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                {/* Schutz Card - Enhanced */}
                <div className="group text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/20 hover:border-[#baf742]/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl cursor-pointer">
                  <div className="relative inline-block mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                      <i className="ri-shield-check-line text-white text-5xl"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-lg">
                      <i className="ri-check-double-line text-white text-lg"></i>
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#0E1C3D] mb-4 md:mb-6 lg:mb-8 group-hover:text-[#baf742] transition-colors">Schutz</h3>
                  <p className="text-lg text-[#0E1C3D]/70 leading-relaxed group-hover:text-[#0E1C3D] transition-colors">
                    Optimaler Baumschutz bei jedem Projekt mit 360° Rundumschutz
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center gap-2 bg-[#baf742]/10 px-4 py-2 rounded-full border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">
                      <i className="ri-shield-star-line text-[#baf742] text-lg"></i>
                      <span className="text-[#0E1C3D] font-semibold text-sm">Premium Schutz</span>
                    </div>
                  </div>
                </div>

                {/* Nachhaltigkeit Card - Enhanced */}
                <div className="group text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/20 hover:border-[#baf742]/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl cursor-pointer">
                  <div className="relative inline-block mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#baf742] to-[#8bc34a] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                      <i className="ri-earth-line text-white text-5xl"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#baf742] rounded-full flex items-center justify-center shadow-lg">
                      <i className="ri-leaf-line text-white text-lg"></i>
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#0E1C3D] mb-4 md:mb-6 lg:mb-8 group-hover:text-[#baf742] transition-colors">Nachhaltigkeit</h3>
                  <p className="text-lg text-[#0E1C3D]/70 leading-relaxed group-hover:text-[#0E1C3D] transition-colors">
                    Umweltfreundlich und wiederverwendbar für maximale Nachhaltigkeit
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center gap-2 bg-[#baf742]/10 px-4 py-2 rounded-full border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">
                      <i className="ri-recycle-line text-[#baf742] text-lg"></i>
                      <span className="text-[#0E1C3D] font-semibold text-sm">100% Eco</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/tricast 360 baumschutzmodul baustelle 2.webp"
                alt="TriCast360 Mission"
                className="rounded-3xl shadow-2xl object-cover w-full h-[700px] border border-[#baf742]/10"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#baf742] p-10 rounded-3xl shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#0a0c14]">100%</div>
                  <div className="text-lg text-[#0a0c14] font-semibold">Nachhaltig</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team"
        ref={setSectionRef('team')}
        className={`py-32 lg:py-40 bg-gradient-to-br from-[#f8fdf8] to-white transition-all duration-1000 delay-300 ${
          isVisible('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0E1C3D] mb-10 leading-tight">
              Die Köpfe hinter TRICAST360<sup className="-mt-2">®</sup>
            </h2>
            <p className="text-2xl text-[#0E1C3D]/80 max-w-5xl mx-auto leading-relaxed">
              Ein erfahrenes Team aus Experten verschiedener Bereiche arbeitet gemeinsam an innovativen Lösungen für nachhaltigen Baumschutz
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Team Member 1 */}
            <AnimatedCard delay={0} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-[#baf742]/10">
              <div className="relative h-[500px]">
                <img 
                  src="/Galip Alkan Profilbild.webp"
                  alt="Galip Alkan - Geschäftsführer und Gründer von TRICAST360, Experte für nachhaltigen Baumschutz"
                  className="w-full h-full object-cover object-[15%_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-[#0E1C3D] mb-4">Galip Alkan</h3>
                <p className="text-[#baf742] font-semibold mb-6 text-xl">Geschäftsführer</p>
                <p className="text-[#0E1C3D]/80 mb-8 leading-relaxed text-lg">
                  Als Gründer und Geschäftsführer von TRICAST360<sup className="-mt-2">®</sup> bringe ich meine Vision einer nachhaltigen Zukunft in die Baubranche ein.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-4 py-2 rounded-full text-sm font-semibold border border-[#baf742]/20 hover:bg-[#baf742]/20 transition-colors cursor-pointer">Produktentwicklung</span>
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-4 py-2 rounded-full text-sm font-semibold border border-[#baf742]/20 hover:bg-[#baf742]/20 transition-colors cursor-pointer">Innovation</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Team Member 2 */}
            <AnimatedCard delay={200} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-[#baf742]/10">
              <div className="relative h-[500px]">
                <img 
                  src="/Rifat Acar - Profilbild.webp"
                  alt="Rifat Acar - Nachhaltigkeitsexperte bei TRICAST360, Spezialist für umweltfreundliche Baumschutzsysteme"
                  className="w-full h-full object-cover object-[45%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-[#0E1C3D] mb-4">Rifat Acar</h3>
                <p className="text-[#baf742] font-semibold mb-6 text-xl">Nachhaltigkeitsexperte</p>
                <p className="text-[#0E1C3D]/80 mb-8 leading-relaxed text-lg">
                  Experte für innovative Schutzsysteme mit über 15 Jahren Erfahrung in der Entwicklung nachhaltiger Baulösungen.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-4 py-2 rounded-full text-sm font-semibold border border-[#baf742]/20 hover:bg-[#baf742]/20 transition-colors cursor-pointer">Umweltschutz</span>
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-4 py-2 rounded-full text-sm font-semibold border border-[#baf742]/20 hover:bg-[#baf742]/20 transition-colors cursor-pointer">Materialforschung</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Team Member 3 */}
            <AnimatedCard delay={400} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-[#baf742]/10">
              <div className="h-[500px] overflow-hidden">
                <img 
                  src="/team-placeholder-3.webp"
                  alt="Simon Müller"
                  className="w-full h-full object-cover object-[center_30%]"
                />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-[#0E1C3D] mb-4">Simon Müller</h3>
                <p className="text-[#baf742] font-semibold mb-6 text-xl">Marketing</p>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg mb-8">
                  Mit über 10 Jahren Erfahrung in der Entwicklung von Webplattformen leitet Simon unser Innovationsteam und sorgt für höchste Qualitätsstandards.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-4 py-2 rounded-full text-sm font-semibold border border-[#baf742]/20 hover:bg-[#baf742]/20 transition-colors cursor-pointer">Web-Entwicklung</span>
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-4 py-2 rounded-full text-sm font-semibold border border-[#baf742]/20 hover:bg-[#baf742]/20 transition-colors cursor-pointer">Digital Marketing</span>
                </div>
              </div>
            </AnimatedCard>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        id="values"
        ref={setSectionRef('values')}
        className={`py-32 lg:py-40 bg-white transition-all duration-1000 delay-400 ${
          isVisible('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0E1C3D] mb-8 leading-tight">Was uns antreibt</h2>
            <p className="text-2xl text-[#0E1C3D]/70 leading-relaxed">Was uns antreibt und leitet</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Nachhaltigkeit Card - Enhanced */}
            <div className="group text-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#f8fdf8] via-white to-[#f0f8f0] rounded-3xl border-2 border-[#baf742]/20 hover:border-[#baf742]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="relative inline-block mb-6 md:mb-8 lg:mb-10">
                  <div className="w-24 h-24 md:w-32 lg:w-36 h-24 md:h-32 lg:h-36 bg-gradient-to-br from-[#baf742] via-[#8bc34a] to-[#66bb6a] rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <i className="ri-leaf-line text-white text-4xl md:text-5xl lg:text-6xl"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#baf742] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <i className="ri-heart-line text-white text-lg md:text-xl"></i>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E1C3D] mb-4 md:mb-6 lg:mb-8 group-hover:text-[#baf742] transition-colors duration-300">Nachhaltigkeit</h3>
                <p className="text-base md:text-lg lg:text-xl text-[#0E1C3D]/70 leading-relaxed group-hover:text-[#0E1C3D] transition-colors duration-300 mb-4 md:mb-6 lg:mb-8 px-2">
                  Umweltschutz ist der Kern unserer Mission. Wir entwickeln Lösungen, die Ressourcen schonen und die Natur respektieren.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">CO2-neutral</span>
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">Recycelbar</span>
                </div>
              </div>
            </div>

            {/* Innovation Card - Enhanced */}
            <div className="group text-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#f8fdf8] via-white to-[#f0f8f0] rounded-3xl border-2 border-[#baf742]/20 hover:border-[#baf742]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="relative inline-block mb-6 md:mb-8 lg:mb-10">
                  <div className="w-24 h-24 md:w-32 lg:w-36 h-24 md:h-32 lg:h-36 bg-gradient-to-br from-[#baf742] via-[#8bc34a] to-[#66bb6a] rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <i className="ri-lightbulb-line text-white text-4xl md:text-5xl lg:text-6xl"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#baf742] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <i className="ri-heart-line text-white text-lg md:text-xl"></i>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E1C3D] mb-4 md:mb-6 lg:mb-8 group-hover:text-[#baf742] transition-colors duration-300">Innovation</h3>
                <p className="text-base md:text-lg lg:text-xl text-[#0E1C3D]/70 leading-relaxed group-hover:text-[#0E1C3D] transition-colors duration-300 mb-4 md:mb-6 lg:mb-8 px-2">
                  Wir denken anders und entwickeln bahnbrechende Technologien, die traditionelle Methoden revolutionieren.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">Technologie</span>
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">Forschung</span>
                </div>
              </div>
            </div>

            {/* Ressourcen-Effizienz Card - Enhanced */}
            <div className="group text-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#f8fdf8] via-white to-[#f0f8f0] rounded-3xl border-2 border-[#baf742]/20 hover:border-[#baf742]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#baf742]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="relative inline-block mb-6 md:mb-8 lg:mb-10">
                  <div className="w-24 h-24 md:w-32 lg:w-36 h-24 md:h-32 lg:h-36 bg-gradient-to-br from-[#baf742] via-[#8bc34a] to-[#66bb6a] rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <i className="ri-recycle-line text-white text-4xl md:text-5xl lg:text-6xl"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#baf742] rounded-full flex items-center justify-center shadow-lg">
                    <i className="ri-infinity-line text-white text-lg md:text-xl animate-spin" style={{animationDuration: '3s'}}></i>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0E1C3D] mb-4 md:mb-6 lg:mb-8 group-hover:text-[#baf742] transition-colors duration-300">Ressourcen‑<br className="hidden md:block" />Effizienz</h3>
                <p className="text-base md:text-lg lg:text-xl text-[#0E1C3D]/70 leading-relaxed group-hover:text-[#0E1C3D] transition-colors duration-300 mb-4 md:mb-6 lg:mb-8 px-2">
                  Sparsamkeit und Wiederverwendbarkeit stehen im Mittelpunkt unseres Produktdesigns und unserer Unternehmensphilosophie.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">Wiederverwendung</span>
                  <span className="bg-[#baf742]/10 text-[#0E1C3D] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#baf742]/20 group-hover:bg-[#baf742]/20 transition-colors">Kosteneffizient</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        id="story"
        ref={setSectionRef('story')}
        className={`py-32 lg:py-40 bg-gradient-to-br from-[#f8fdf8] to-white transition-all duration-1000 delay-500 ${
          isVisible('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#0E1C3D] mb-10 leading-tight">Unsere Story</h2>
              <p className="text-3xl text-[#baf742] font-semibold mb-12">Von der Idee zur Innovation</p>
              
              <div className="space-y-10 text-[#0E1C3D]/80 text-xl leading-relaxed mb-16">
                <p className="text-2xl">
                  2024 – Das Jahr, in dem eine Vision Realität wurde. Als wir sahen, wie ineffizient und umweltschädlich herkömmlicher Baumschutz war, wussten wir: Es muss einen besseren Weg geben.
                </p>
                <p className="text-xl">
                  Heute entwickeln wir als jugendliches, dynamisches Startup die nächste Generation von Baumschutzsystemen – modular, nachhaltig und wirtschaftlich.
                </p>
              </div>

            </div>

            <div className="relative">
              <img 
                src="/tricast 360 baumschutzmodul baustelle 3.webp"
                alt="Unsere Story"
                className="rounded-3xl shadow-2xl object-cover w-full h-[600px] border border-[#baf742]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        ref={setSectionRef('cta')}
        className={`py-32 lg:py-40 bg-gradient-to-br from-[#0a0c14] to-[#0f1219] transition-all duration-1000 delay-600 ${
          isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-[#baf742]/20 backdrop-blur-sm px-8 py-4 rounded-full mb-10 border border-[#baf742]/30">
            <span className="text-[#baf742] font-medium text-xl">Innovation seit 2024</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-tight">
            Werden Sie Teil unserer Mission
          </h2>
          <p className="text-2xl md:text-3xl text-white/80 mb-16 max-w-5xl mx-auto leading-relaxed">
            Gemeinsam gestalten wir die Zukunft des Baumschutzes. Lassen Sie uns zusammen nachhaltige Lösungen entwickeln.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a 
              href="/kontakt"
              className="group bg-[#baf742] text-[#0a0c14] px-12 py-6 rounded-xl text-2xl font-semibold hover:bg-[#a8e63a] transition-all duration-300 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap"
            >
              <span className="flex items-center justify-center gap-3">
                Kontakt aufnehmen
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform text-xl"></i>
              </span>
            </a>
            <a 
              href="/system"
              className="group border-2 border-white text-white px-12 py-6 rounded-xl text-2xl font-semibold hover:bg-white hover:text-[#0a0c14] transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <span className="flex items-center justify-center gap-3">
                Unser System
                <i className="ri-play-circle-line group-hover:scale-110 transition-transform text-xl"></i>
              </span>
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
                <h3 className="text-2xl font-bold text-white">Jetzt anfragen</h3>
                <button 
                  onClick={() => setIsContactFormOpen(false)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} data-readdy-form id="about-contact-form">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">Vorname</label>
                  <input 
                    type="text" 
                    name="vorname"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">Nachname</label>
                  <input 
                    type="text" 
                    name="nachname"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">E-Mail</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">Unternehmen</label>
                  <input 
                    type="text" 
                    name="unternehmen"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-white"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">Nachricht</label>
                  <textarea 
                    name="nachricht"
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent resize-none text-white"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                  ></textarea>
                  <p className="text-sm text-white/60 mt-1">Maximal 500 Zeichen</p>
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

export default AboutPage;
