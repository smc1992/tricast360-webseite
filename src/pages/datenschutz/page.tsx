
import React, { useState, useEffect } from 'react';

const DatenschutzPage = () => {
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
      {/* Header - Same as HomePage but with white background */}
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
        className={`py-24 bg-[#f8fdf8] transition-all duration-1000 ${
          visibleSections.has('hero') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0E1C3D] mb-8">
              Datenschutzerklärung
            </h1>
            <p className="text-xl sm:text-2xl text-[#0E1C3D]/80 max-w-4xl mx-auto">
              Informationen zum Umgang mit Ihren personenbezogenen Daten
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Allgemeine Hinweise */}
          <div 
            id="allgemeine-hinweise" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-100 ${
              visibleSections.has('allgemeine-hinweise') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Allgemeine Hinweise</h2>
            
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </div>
          </div>

          {/* Datenerfassung */}
          <div 
            id="datenerfassung" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-200 ${
              visibleSections.has('datenerfassung') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Datenerfassung auf unserer Website</h2>
            
            <div className="space-y-10">
              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Wie erfassen wir Ihre Daten?</h3>
                <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                  Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Wofür nutzen wir Ihre Daten?</h3>
                <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>
            </div>
          </div>

          {/* Ihre Rechte */}
          <div 
            id="ihre-rechte" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-300 ${
              visibleSections.has('ihre-rechte') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Ihre Rechte bezüglich Ihrer Daten</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-information-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-4">Auskunftsrecht</h3>
                <p className="text-[#0E1C3D]/80">
                  Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-edit-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-4">Berichtigung</h3>
                <p className="text-[#0E1C3D]/80">
                  Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, falls die verarbeiteten personenbezogenen Daten unrichtig oder unvollständig sind.
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-delete-bin-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-4">Löschung</h3>
                <p className="text-[#0E1C3D]/80">
                  Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern die Voraussetzungen des Art. 17 DSGVO erfüllt sind.
                </p>
              </div>

              <div className="bg-[#f8fdf8] p-8 rounded-xl">
                <div className="w-16 h-16 bg-[#baf742] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-shield-check-line text-[#0E1C3D] text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1C3D] mb-4">Widerspruch</h3>
                <p className="text-[#0E1C3D]/80">
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten Widerspruch einzulegen.
                </p>
              </div>
            </div>
          </div>

          {/* Hosting */}
          <div 
            id="hosting" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-400 ${
              visibleSections.has('hosting') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Hosting</h2>
            
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-6">Externes Hosting</h3>
              <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
              </p>
              <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>
          </div>

          {/* Kontaktformular */}
          <div 
            id="kontaktformular" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-500 ${
              visibleSections.has('kontaktformular') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Kontaktformular</h2>
            
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen.
              </p>
            </div>
          </div>

          {/* Server-Log-Dateien */}
          <div 
            id="server-log" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-600 ${
              visibleSections.has('server-log') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Server-Log-Dateien</h2>
            
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <p className="text-[#0E1C3D]/80 leading-relaxed mb-6 text-lg">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-[#0E1C3D]/80 space-y-3 mb-6 text-lg">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-[#0E1C3D]/80 leading-relaxed text-lg">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>
          </div>

          {/* Kontakt */}
          <div 
            id="kontakt-datenschutz" 
            data-animate 
            className={`mb-16 transition-all duration-1000 delay-700 ${
              visibleSections.has('kontakt-datenschutz') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E1C3D] mb-10">Kontakt bei Datenschutzfragen</h2>
            
            <div className="bg-[#f8fdf8] p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-[#0E1C3D] mb-6">Verantwortlicher für den Datenschutz:</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[#0E1C3D]/80 mb-4 text-lg">
                    <strong>Galip Alkan</strong><br />
                    Lüneburger Str. 90<br />
                    D-21423 Winsen (Luhe)
                  </p>
                </div>
                <div>
                  <p className="text-[#0E1C3D]/80 text-lg">
                    <strong>Telefon:</strong> +49 170 1002912<br />
                    <strong>E-Mail:</strong> info@TRICAST360.de
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            id="cta-datenschutz" 
            data-animate 
            className={`transition-all duration-1000 delay-800 ${
              visibleSections.has('cta-datenschutz') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-[#0E1C3D] p-12 rounded-xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Fragen zum Datenschutz?
              </h2>
              <p className="text-white/80 mb-8 text-xl max-w-3xl mx-auto">
                Wir beantworten gerne Ihre Fragen zum Datenschutz
              </p>
              <a 
                href="/kontakt"
                className="bg-[#baf742] text-[#0E1C3D] px-10 py-5 rounded-lg text-xl font-semibold hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap inline-block"
              >
                Kontakt aufnehmen
              </a>
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
              © {new Date().getFullYear()} TRICAST360<sup>®</sup>. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DatenschutzPage;
