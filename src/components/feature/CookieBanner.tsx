
import { useState, useEffect } from 'react';

interface CookieBanner {
  onAcceptAll: () => void;
  onAcceptNecessary: () => void;
  onShowSettings: () => void;
}

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Immer aktiviert
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Prüfen ob bereits eine Cookie-Entscheidung getroffen wurde
    const cookieConsent = localStorage.getItem('TRICAST360-cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('TRICAST360-cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    // Hier würden die entsprechenden Tracking-Scripts geladen
  };

  const handleAcceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('TRICAST360-cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('TRICAST360-cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (category: keyof typeof preferences) => {
    if (category === 'necessary') return; // Notwendige Cookies können nicht deaktiviert werden
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#baf742] shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {!showSettings ? (
            // Haupt-Banner
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-[#baf742] rounded-full flex-shrink-0">
                  <i className="ri-shield-check-line text-[#0E1C3D] text-lg"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0E1C3D] mb-2">
                    Ihre Privatsphäre ist uns wichtig
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Nutzererfahrung zu bieten, 
                    unsere Website zu verbessern und Ihnen relevante Inhalte anzuzeigen. Durch Klicken auf "Alle akzeptieren" 
                    stimmen Sie der Verwendung aller Cookies zu. Sie können Ihre Einstellungen jederzeit anpassen oder nur 
                    notwendige Cookies akzeptieren.
                  </p>
                  <p className="text-xs text-gray-600 mb-4">
                    Weitere Informationen finden Sie in unserer{' '}
                    <a href="/datenschutz" className="text-[#baf742] hover:underline font-medium">
                      Datenschutzerklärung
                    </a>{' '}
                    und unseren{' '}
                    <a href="/impressum" className="text-[#baf742] hover:underline font-medium">
                      Cookie-Richtlinien
                    </a>.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAcceptAll}
                  className="bg-[#baf742] text-[#0E1C3D] px-6 py-3 rounded-lg font-semibold hover:bg-[#a8e63a] transition-colors whitespace-nowrap"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Nur notwendige
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="border-2 border-[#0E1C3D] text-[#0E1C3D] px-6 py-3 rounded-lg font-semibold hover:bg-[#0E1C3D] hover:text-white transition-colors whitespace-nowrap"
                >
                  Einstellungen anpassen
                </button>
              </div>
            </div>
          ) : (
            // Erweiterte Einstellungen
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#0E1C3D]">Cookie-Einstellungen</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <p className="text-gray-700 text-sm">
                Hier können Sie detailliert festlegen, welche Cookies Sie zulassen möchten. 
                Ihre Auswahl wird für 12 Monate gespeichert.
              </p>

              <div className="space-y-4">
                {/* Notwendige Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#0E1C3D]">Notwendige Cookies</h4>
                    <div className="w-12 h-6 bg-[#baf742] rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. 
                    Sie speichern keine persönlich identifizierbaren Informationen.
                  </p>
                </div>

                {/* Analyse Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#0E1C3D]">Analyse-Cookies</h4>
                    <button
                      onClick={() => handlePreferenceChange('analytics')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics ? 'bg-[#baf742]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.analytics ? 'ml-auto' : 'ml-0'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                    indem sie Informationen anonym sammeln und melden.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#0E1C3D]">Marketing-Cookies</h4>
                    <button
                      onClick={() => handlePreferenceChange('marketing')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.marketing ? 'bg-[#baf742]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.marketing ? 'ml-auto' : 'ml-0'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies werden verwendet, um Ihnen relevante Werbung und Inhalte anzuzeigen. 
                    Sie können auch zur Messung der Effektivität von Werbekampagnen verwendet werden.
                  </p>
                </div>

                {/* Funktionale Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#0E1C3D]">Funktionale Cookies</h4>
                    <button
                      onClick={() => handlePreferenceChange('functional')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.functional ? 'bg-[#baf742]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.functional ? 'ml-auto' : 'ml-0'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung, 
                    wie z.B. das Speichern Ihrer Sprachpräferenzen.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSavePreferences}
                  className="bg-[#baf742] text-[#0E1C3D] px-6 py-3 rounded-lg font-semibold hover:bg-[#a8e63a] transition-colors whitespace-nowrap"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="border-2 border-[#0E1C3D] text-[#0E1C3D] px-6 py-3 rounded-lg font-semibold hover:bg-[#0E1C3D] hover:text-white transition-colors whitespace-nowrap"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
