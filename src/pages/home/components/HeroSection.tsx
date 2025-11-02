
import React, { useState, useRef, Suspense } from 'react';
import ThreeJsHero from '../../../components/ThreeJsHero';

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0c14]">
      {/* Background Video */}
      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-0 object-cover w-full h-full transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src="/Tricast360 Video Startseite Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Video Loading Placeholder */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0c14] to-[#1a1d29] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#baf742]/30 border-t-[#baf742] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#baf742] font-semibold">Video wird geladen...</p>
          </div>
        </div>
      )}

      {/* Video Error Fallback */}
      {videoError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0c14] to-[#1a1d29] flex items-center justify-center">
          <div className="text-center text-white">
            <i className="ri-video-off-line text-6xl text-[#baf742]/50 mb-4"></i>
            <p className="text-xl font-semibold mb-2">Video konnte nicht geladen werden</p>
            <p className="text-gray-400">Bitte überprüfen Sie Ihre Internetverbindung</p>
          </div>
        </div>
      )}

      {/* Gradient Overlay - Improved for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c14]/80 via-[#0a0c14]/70 to-[#0a0c14]/90 z-5"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
        
          {/* Main Heading - Three.js Animated with Enhanced Fallback */}
          <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s', height: '200px', width: '100%' }}>
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                {/* Single line with floating animation */}
                <div className="animate-pulse-slow">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight drop-shadow-2xl hover:scale-105 transition-transform duration-300">
                    <span className="drop-shadow-lg">
                      SCHÜTZT <span className="text-[#baf742]">BÄUME</span>, SCHÜTZT <span className="text-[#baf742]">WERTE</span>
                    </span>
                  </h1>
                </div>
              </div>
            }>
              <ThreeJsHero className="absolute inset-0" />
            </Suspense>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.6s' }}>
            Revolutionärer 360°-Schutz für Bäume auf Baustellen. Werkzeuglos, wiederverwendbar und DIN-konform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a
              href="/kontakt"
              className="group px-8 py-4 bg-[#baf742] text-[#0a0c14] rounded-lg font-bold text-lg hover:bg-[#a8e63a] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 hover:scale-105 backdrop-blur-sm"
            >
              Jetzt anfragen
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </a>
            <a
              href="/system"
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg"
            >
              Mehr erfahren
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#baf742]/30 transition-all duration-300">
              <div className="text-3xl font-bold text-[#baf742] mb-1 drop-shadow-lg">&lt;5min</div>
              <div className="text-sm text-gray-400">Installation</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#baf742]/30 transition-all duration-300">
              <div className="text-3xl font-bold text-[#baf742] mb-1 drop-shadow-lg">100%</div>
              <div className="text-sm text-gray-400">Wieder<br className="sm:hidden" />verwendbar</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#baf742]/30 transition-all duration-300">
              <div className="text-3xl font-bold text-[#baf742] mb-1 drop-shadow-lg">DIN</div>
              <div className="text-sm text-gray-400">Konform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <div className="w-6 h-10 border-2 border-[#baf742]/50 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <div className="w-1 h-3 bg-[#baf742] rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}