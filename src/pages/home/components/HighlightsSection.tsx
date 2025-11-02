
import { useEffect } from 'react';

export const HighlightsSection = () => {
  useEffect(() => {
    // Swiper initialisieren
    const initSwiper = () => {
      if (window.Swiper) {
        new window.Swiper(".swiper", {
          effect: "cards",
          cardsEffect: {
            rotate: true,
          },
          grabCursor: true,
          initialSlide: 2,
          speed: 500,
          loop: true,
          mousewheel: {
            invert: false,
          },
        });
      }
    };

    // Warten bis Swiper geladen ist
    if (window.Swiper) {
      initSwiper();
    } else {
      const checkSwiper = setInterval(() => {
        if (window.Swiper) {
          initSwiper();
          clearInterval(checkSwiper);
        }
      }, 100);
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center py-16 lg:py-24 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#baf742]/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#baf742]/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-[#baf742]/15 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 bg-[#0E1C3D]/5 backdrop-blur-[30px] rounded-[20px] w-full max-w-[900px] lg:max-w-[1200px] shadow-[0_0.5px_0_1px_rgba(14,28,61,0.23)_inset,0_1px_0_0_rgba(14,28,61,0.66)_inset,0_4px_16px_rgba(0,0,0,0.12)] z-10 mx-auto">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center max-w-[450px] lg:max-w-[550px] px-6 lg:px-12 py-8 lg:py-16 text-justify order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-[#baf742]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#baf742]/40 mb-6 shadow-lg">
              <i className="ri-star-fill text-[#0a0c14]"></i>
              <span className="text-[#0a0c14] font-bold text-sm">Unsere Highlights</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-[#0E1C3D] mb-6 lg:mb-8 text-center leading-tight">
              Innovativer
              <span className="block bg-gradient-to-r from-[#baf742] via-[#a8e63a] to-[#baf742] bg-clip-text text-transparent">
                Baumschutz
              </span>
            </h2>

            <p className="text-[#0E1C3D]/70 font-medium text-sm lg:text-lg mb-5 lg:mb-8 leading-relaxed text-center lg:text-justify">
              Entdecken Sie die wichtigsten Vorteile unseres innovativen TRICAST360® Systems. Von blitzschneller Installation bis hin zu 100% nachhaltiger Produktion - erleben Sie, wie wir den Baumschutz revolutionieren und dabei die Umwelt schützen.
            </p>

            <a 
              href="/system"
              className="block px-8 lg:px-12 py-3 lg:py-4 mx-auto text-base lg:text-xl font-bold rounded border-none outline-none text-[#0E1C3D] bg-[#baf742] shadow-[0_6px_30px_rgba(186,247,66,0.3)] border border-[#baf742]/30 cursor-pointer hover:bg-[#a8e63a] transition-all duration-300 whitespace-nowrap no-underline"
            >
              Alle Vorteile
            </a>
          </div>

          {/* Swiper Cards */}
          <div className="swiper w-[280px] lg:w-[350px] h-[400px] lg:h-[550px] py-8 lg:py-16 order-1 lg:order-2 swiper-cards swiper-3d">
            <div className="swiper-wrapper">
              {/* Card 1 */}
              <div className="swiper-slide relative shadow-[0_15px_50px_rgba(0,0,0,0.2)] rounded-[10px] select-none">
                <img 
                  className="absolute inset-0 w-full h-full object-cover object-top" 
                  alt="Schnelle Installation"
                  src="/Tricast360 Stadtbaustelle 2.webp"
                />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent">
                  <span className="absolute top-0 right-0 text-white py-2 px-3 lg:px-4 m-3 lg:m-4 rounded-[20px] tracking-[2px] text-xs lg:text-sm font-bold bg-[#baf742]/20 shadow-[inset_2px_-2px_20px_rgba(186,247,66,0.2),inset_-3px_3px_3px_rgba(255,255,255,0.4)] backdrop-blur-[74px]">
                    <i className="ri-time-line mr-1"></i>&lt;5 Min
                  </span>
                  <h3 className="absolute bottom-0 left-0 text-white font-semibold text-base lg:text-xl leading-relaxed m-4 lg:m-6">
                    Blitzschnelle Installation
                  </h3>
                </div>
              </div>

              {/* Card 2 */}
              <div className="swiper-slide relative shadow-[0_15px_50px_rgba(0,0,0,0.2)] rounded-[10px] select-none">
                <img 
                  className="absolute inset-0 w-full h-full object-cover object-top" 
                  alt="100% Nachhaltig"
                  src="/Tricast360 Stadtbaustelle 3.webp"
                />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent">
                  <span className="absolute top-0 right-0 text-white py-2 px-3 lg:px-4 m-3 lg:m-4 rounded-[20px] tracking-[2px] text-xs lg:text-sm font-bold bg-[#baf742]/20 shadow-[inset_2px_-2px_20px_rgba(186,247,66,0.2),inset_-3px_3px_3px_rgba(255,255,255,0.4)] backdrop-blur-[74px]">
                    <i className="ri-leaf-line mr-1"></i>100%
                  </span>
                  <h3 className="absolute bottom-0 left-0 text-white font-semibold text-base lg:text-xl leading-relaxed m-4 lg:m-6">
                    Vollständig recycelbar
                  </h3>
                </div>
              </div>

              {/* Card 3 */}
              <div className="swiper-slide relative shadow-[0_15px_50px_rgba(0,0,0,0.2)] rounded-[10px] select-none">
                <img 
                  className="absolute inset-0 w-full h-full object-cover object-top" 
                  alt="500+ Projekte"
                  src="/Tricast360 Stadtbaustelle 4.webp"
                />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent">
                  <span className="absolute top-0 right-0 text-white py-2 px-3 lg:px-4 m-3 lg:m-4 rounded-[20px] tracking-[2px] text-xs lg:text-sm font-bold bg-[#baf742]/20 shadow-[inset_2px_-2px_20px_rgba(186,247,66,0.2),inset_-3px_3px_3px_rgba(255,255,255,0.4)] backdrop-blur-[74px]">
                    <i className="ri-building-line mr-1"></i>500+
                  </span>
                  <h3 className="absolute bottom-0 left-0 text-white font-semibold text-base lg:text-xl leading-relaxed m-4 lg:m-6">
                    Bewährte Qualität
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
