
import { useState, useEffect, useRef } from 'react';

const ContactPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    
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
        setSubmitStatus('success');
        form.reset();
        // Reset character counter
        const counter = document.getElementById('char-counter');
        if (counter) {
          counter.textContent = '0/500 Zeichen';
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
              <a href="/system" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                System
              </a>
              <a href="/shop" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                Shop
              </a>
              <a href="/ueber-uns" className="text-white/80 hover:text-[#baf742] transition-colors font-medium">
                Über uns
              </a>
              <a href="/kontakt" className="text-[#baf742] font-medium">
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
                  className="text-[#baf742] font-medium py-2"
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
          <div className="text-center text-white max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-[#baf742]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#baf742]/20 mb-10">
              <i className="ri-phone-line text-[#baf742] text-xl"></i>
              <span className="text-[#baf742] font-semibold text-lg">Kontakt</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight">
              Fragen? Wir beraten Sie gerne.
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl mb-16 max-w-5xl mx-auto leading-relaxed">
              Lassen Sie uns gemeinsam die perfekte Baumschutz-Lösung für Ihr Projekt finden.
            </p>
            <a 
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-[#baf742] text-[#0a0c14] px-12 py-6 rounded-xl text-2xl font-semibold hover:bg-[#a8e63a] transition-all duration-300 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap inline-block"
            >
              <span className="flex items-center gap-3">
                Jetzt Kontakt aufnehmen
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform text-xl"></i>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        id="contact-form"
        ref={setSectionRef('contact-form')}
        className={`py-32 lg:py-40 bg-gradient-to-br from-[#f8fdf8] to-white transition-all duration-1000 delay-200 ${
          isVisible('contact-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-[#baf742]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#baf742]/20 mb-8">
              <i className="ri-mail-line text-[#baf742] text-xl"></i>
              <span className="text-[#baf742] font-semibold text-lg">Projekt anfragen</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0E1C3D] mb-8 leading-tight">Projekt anfragen</h2>
            <p className="text-2xl sm:text-3xl text-[#0E1C3D]/80 leading-relaxed">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-[#baf742]/10">
            {submitStatus === 'success' && (
              <div className="mb-10 p-8 bg-green-50 border border-green-200 rounded-2xl">
                <div className="flex items-center">
                  <i className="ri-check-circle-line text-green-600 mr-4 text-2xl"></i>
                  <span className="text-green-800 font-medium text-xl">Vielen Dank! Ihre Projektanfrage wurde erfolgreich gesendet.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-10 p-8 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 mr-4 text-2xl"></i>
                  <span className="text-red-800 font-medium text-xl">Fehler beim Senden. Bitte versuchen Sie es erneut.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} data-readdy-form id="project-inquiry-form">
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                  <label className="block text-lg font-medium text-[#0E1C3D] mb-4">
                    Unternehmen <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    required
                    className="w-full px-6 py-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-xl"
                    placeholder="Ihr Unternehmen"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-[#0E1C3D] mb-4">
                    Ansprechpartner <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="contact_person"
                    required
                    className="w-full px-6 py-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-xl"
                    placeholder="Ihr Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                  <label className="block text-lg font-medium text-[#0E1C3D] mb-4">
                    E-Mail <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-6 py-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-xl"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-[#0E1C3D] mb-4">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    className="w-full px-6 py-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-xl"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-lg font-medium text-[#0E1C3D] mb-4">
                  Zusätzliche Informationen
                </label>
                <textarea 
                  name="additional_info"
                  rows={8}
                  maxLength={500}
                  className="w-full px-6 py-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#baf742] focus:border-transparent resize-none text-xl"
                  placeholder="Weitere Details zu Ihrem Projekt..."
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    const counter = document.getElementById('char-counter');
                    if (counter) {
                      counter.textContent = `${target.value.length}/500 Zeichen`;
                    }
                  }}
                ></textarea>
                <p id="char-counter" className="text-lg text-gray-500 mt-3">0/500 Zeichen</p>
              </div>

              <div className="mb-10">
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="privacy_consent"
                    required
                    className="mt-2 mr-5 h-6 w-6 text-[#baf742] focus:ring-[#baf742] border-gray-300 rounded"
                  />
                  <span className="text-lg text-[#0E1C3D]">
                    Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              <div className="bg-gradient-to-br from-[#f8fdf8] to-white p-10 rounded-2xl mb-10 border border-[#baf742]/10">
                <h4 className="text-2xl font-semibold text-[#0E1C3D] mb-8">Nächste Schritte:</h4>
                <ul className="space-y-6 text-[#0E1C3D]/80 text-xl">
                  <li className="flex items-start">
                    <span className="text-[#baf742] mr-4 text-2xl">•</span>
                    Kostenlose Beratung innerhalb von 24 Stunden
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#baf742] mr-4 text-2xl">•</span>
                    Individuelles Angebot basierend auf Ihren Anforderungen
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#baf742] mr-4 text-2xl">•</span>
                    Technische Dokumentation und Installationsunterstützung
                  </li>
                </ul>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto md:px-12 py-6 mx-auto rounded-xl text-2xl font-semibold hover:bg-[#a8e63a] transition-all duration-300 shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed bg-[#baf742] text-[#0a0c14] block"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Projekt anfragen'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section 
        id="service-features"
        ref={setSectionRef('service-features')}
        className={`py-32 lg:py-40 bg-white transition-all duration-1000 delay-300 ${
          isVisible('service-features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/10 hover:shadow-xl transition-all duration-300">
              <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="ri-time-line text-[#0a0c14] text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#0E1C3D] mb-6">Antwortzeit</h3>
              <p className="text-3xl sm:text-4xl font-bold text-[#baf742] mb-4">&lt;24 h</p>
              <p className="text-[#0E1C3D]/70 text-xl">Schnelle Rückmeldung garantiert</p>
            </div>

            <div className="text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/10 hover:shadow-xl transition-all duration-300">
              <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="ri-phone-line text-[#0a0c14] text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#0E1C3D] mb-6">Telefonische Beratung</h3>
              <p className="text-3xl sm:text-4xl font-bold text-[#baf742] mb-4">möglich</p>
              <p className="text-[#0E1C3D]/70 text-xl">Persönliche Gespräche nach Vereinbarung</p>
            </div>

            <div className="text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/10 hover:shadow-xl transition-all duration-300">
              <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="ri-truck-line text-[#0a0c14] text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#0E1C3D] mb-6">Deutschlandweite<br className="hidden sm:block" />Lieferung</h3>
              <p className="text-[#0E1C3D]/70 text-xl">Zuverlässig und termingerecht</p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact */}
      <section 
        id="direct-contact"
        ref={setSectionRef('direct-contact')}
        className={`py-32 lg:py-40 bg-gradient-to-br from-[#f8fdf8] to-white transition-all duration-1000 delay-400 ${
          isVisible('direct-contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-[#baf742]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#baf742]/20 mb-8">
              <i className="ri-customer-service-line text-[#baf742] text-xl"></i>
              <span className="text-[#baf742] font-semibold text-lg">Direkter Kontakt</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0E1C3D] mb-10 leading-tight">
              Direkte Kontaktmöglichkeiten
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="bg-white p-12 rounded-3xl shadow-xl text-center border border-[#baf742]/10 hover:shadow-2xl transition-all duration-300">
              <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="ri-phone-line text-[#0a0c14] text-4xl"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0E1C3D] mb-6">Telefon</h3>
              <p className="text-xl sm:text-2xl font-bold text-[#0E1C3D] mb-4">+49 170 1002912</p>
              <p className="text-lg sm:text-xl text-[#0E1C3D]/70">Mo-Fr 8:00-18:00 Uhr</p>
            </div>

            <div className="bg-white p-12 rounded-3xl shadow-xl text-center border border-[#baf742]/10 hover:shadow-2xl transition-all duration-300">
              <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="ri-mail-line text-[#0a0c14] text-4xl"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0E1C3D] mb-6">E-Mail</h3>
              <p className="text-xl sm:text-2xl font-bold text-[#0E1C3D] mb-4">info@TRICAST360.de</p>
              <p className="text-lg sm:text-xl text-[#0E1C3D]/70">Antwort binnen 24h</p>
            </div>

            <div className="bg-white p-12 rounded-3xl shadow-xl text-center border border-[#baf742]/10 hover:shadow-2xl transition-all duration-300">
              <div className="w-24 h-24 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="ri-map-pin-line text-[#0a0c14] text-4xl"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0E1C3D] mb-6">Adresse</h3>
              <p className="text-xl sm:text-2xl font-bold text-[#0E1C3D] mb-4">Lüneburger Str. 90</p>
              <p className="text-lg sm:text-xl text-[#0E1C3D]/70">D-21423 Winsen (Luhe)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why TriCast360 */}
      <section 
        id="why-TRICAST"
        ref={setSectionRef('why-TRICAST')}
        className={`py-32 lg:py-40 bg-white transition-all duration-1000 delay-500 ${
          isVisible('why-TRICAST') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-[#baf742]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#baf742]/20 mb-8">
              <i className="ri-star-line text-[#baf742] text-xl"></i>
              <span className="text-[#baf742] font-semibold text-lg">Warum TRICAST360<sup className="-mt-2">®</sup></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0E1C3D] mb-10 leading-tight">
              Warum TRICAST360<sup className="-mt-2">®</sup>?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/10 hover:shadow-xl transition-all duration-300">
              <div className="w-28 h-28 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="ri-customer-service-2-line text-[#0a0c14] text-5xl"></i>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0E1C3D] mb-8">Kostenlose Erstberatung</h3>
              <p className="text-[#0E1C3D]/70 text-xl leading-relaxed">Unverbindliche Beratung für Ihr Projekt</p>
            </div>

            <div className="text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/10 hover:shadow-xl transition-all duration-300">
              <div className="w-28 h-28 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="ri-recycle-line text-[#0a0c14] text-5xl"></i>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0E1C3D] mb-8">Mehrfach wiederverwendbar</h3>
              <p className="text-[#0E1C3D]/70 text-xl leading-relaxed">Nachhaltig und kosteneffizient</p>
            </div>

            <div className="text-center p-12 bg-gradient-to-br from-[#f8fdf8] to-white rounded-3xl border border-[#baf742]/10 hover:shadow-xl transition-all duration-300">
              <div className="w-28 h-28 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="ri-shield-check-line text-[#0a0c14] text-5xl"></i>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0E1C3D] mb-8">Qualitätsgeprüft</h3>
              <p className="text-[#0E1C3D]/70 text-xl leading-relaxed">Made in Germany nach DIN-Standards</p>
            </div>
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
    </div>
  );
};

export default ContactPage;
