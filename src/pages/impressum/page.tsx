import React, { useState, useEffect } from 'react';

const ImpressumPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Scroll-Animation mit Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Automatisch nach oben scrollen beim Laden der Seite
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as HomePage but with dark background */}
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
        data-animate 
        className={`py-20 lg:py-24 bg-[#f8fdf8] transition-all duration-1000 ${
          visibleSections.has('hero') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0E1C3D] mb-8">
              Impressum
            </h1>
            <p className="text-xl lg:text-2xl text-[#0E1C3D]/80">
              Rechtliche Angaben gemäß § 5 TMG
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section 
        id="content"
        data-animate
        className={`py-20 lg:py-24 bg-white transition-all duration-1000 delay-200 ${
          visibleSections.has('content') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Unternehmensangaben */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Unternehmensangaben</h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Unternehmen</h3>
                <p className="text-[#0E1C3D]/80 mb-3 text-lg">TRICAST360</p>
                <p className="text-sm text-[#0E1C3D]/60">(Brand)</p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Geschäftsführer</h3>
                <p className="text-[#0E1C3D]/80 text-lg">Galip Alkan</p>
              </div>
            </div>
          </div>

          {/* Postanschrift */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-8">Postanschrift</h2>
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mr-6 mt-1">
                  <i className="ri-map-pin-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <div>
                  <p className="text-[#0E1C3D]/80 text-xl">
                    Lüneburger Str. 90<br />
                    D-21423 Winsen (Luhe)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kontakt */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-8">Kontakt</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#f8fdf8] p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-phone-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-3">Telefon</h3>
                <p className="text-[#0E1C3D]/80 text-lg">+49 170 1002912</p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-mail-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-3">E-Mail</h3>
                <p className="text-[#0E1C3D]/80 text-lg">info@TRICAST360.de</p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-global-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-3">Internet</h3>
                <p className="text-[#0E1C3D]/80 text-lg">www.TRICAST360.de</p>
              </div>
            </div>
          </div>

          {/* Umsatzsteuer-ID */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-8">Umsatzsteuer-ID</h2>
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-[#0E1C3D] mb-3">Umsatzsteuer-Identifikationsnummer:</h3>
              <p className="text-[#0E1C3D]/80 text-lg">DE [wird bei Bedarf ergänzt]</p>
            </div>
          </div>

          {/* Verantwortlich für den Inhalt */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-8">Verantwortlich für den Inhalt</h2>
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-[#0E1C3D] mb-6">Verantwortlich für den Inhalt:</h3>
              <p className="text-[#0E1C3D]/80 text-lg">
                Galip Alkan<br />
                Lüneburger Str. 90<br />
                D-21423 Winsen (Luhe)
              </p>
            </div>
          </div>

          {/* Haftungsausschluss */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Haftungsausschluss</h2>
            
            <div className="space-y-10">
              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Haftung für Inhalte</h3>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                  Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Haftung für Links</h3>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Urheberrecht</h3>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            id="cta"
            data-animate
            className={`bg-white p-12 rounded-xl text-center border border-[#baf742]/10 transition-all duration-1000 delay-400 ${
              visibleSections.has('cta') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-6">
              Fragen zum Impressum?
            </h2>
            <p className="text-[#0E1C3D]/80 mb-8 text-xl max-w-3xl mx-auto">
              Wir helfen Ihnen gerne weiter
            </p>
            <a 
              href="/kontakt"
              className="bg-[#baf742] text-[#0E1C3D] px-10 py-5 rounded-lg text-xl font-semibold hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              Kontakt aufnehmen
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
              © {new Date().getFullYear()} TRICAST360<sup className="-mt-2">®</sup>. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImpressumPage;
