
import React, { useState, useEffect, useRef } from 'react';

interface CartItem {
  id: string;
  name: string;
  diameter: string;
  modules: number;
  basePrice: number;
  addOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  werbetafel: {
    id: string;
    name: string;
    price: number;
  } | null;
  quantity: number;
  hasDesignUpload: boolean;
  totalPrice: number;
}

const WarenkorbPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Deutschland'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('invoice');
  const [agbAccepted, setAgbAccepted] = useState(false);
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

  // Konfiguration aus localStorage laden
  useEffect(() => {
    const savedConfig = localStorage.getItem('TRICAST360_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      const cartItem: CartItem = {
        id: 'config-1',
        name: config.setName,
        diameter: config.diameter,
        modules: config.modules,
        basePrice: config.basePrice,
        addOns: config.addOns || [],
        werbetafel: config.werbetafel || null,
        quantity: config.quantity,
        hasDesignUpload: config.hasDesignUpload || false,
        totalPrice: config.totalPrice
      };
      setCartItems([cartItem]);
    }
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const unitPrice = (item.totalPrice / item.quantity);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity
        };
      }
      return item;
    }));
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getShipping = () => {
    return getSubtotal() > 500 ? 0 : 49;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return cartItems.length > 0;
      case 2:
        return customerInfo.firstName && customerInfo.lastName && 
               customerInfo.email && customerInfo.address && 
               customerInfo.city && customerInfo.zipCode;
      case 3:
        return paymentMethod && agbAccepted;
      default:
        return false;
    }
  };

  const handleSubmitOrder = () => {
    if (!isStepValid(3)) return;
    
    // Hier würde normalerweise die Bestellung verarbeitet
    alert('Vielen Dank für Ihre Bestellung! Sie erhalten in Kürze eine Bestätigung per E-Mail.');
    
    // Warenkorb leeren
    setCartItems([]);
    localStorage.removeItem('TRICAST360_config');
    
    // Zur Startseite weiterleiten
    window.location.href = '/';
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
        ref={setSectionRef('hero')}
        className={`py-16 sm:py-24 bg-[#f8fdf8] transition-all duration-1000 ${
          isVisible('hero') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0E1C3D] mb-6 sm:mb-8">
              Warenkorb & Checkout
            </h1>
            <p className="text-xl sm:text-2xl text-[#0E1C3D]/80 max-w-4xl mx-auto">
              Überprüfen Sie Ihre Bestellung und schließen Sie den Kaufprozess ab.
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Process */}
      <section 
        id="checkout" 
        data-animate 
        ref={setSectionRef('checkout')}
        className={`py-16 sm:py-24 bg-white transition-all duration-1000 delay-200 ${
          isVisible('checkout') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-12 sm:mb-16 overflow-x-auto pb-2">
            <div className="flex items-center min-w-max px-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 text-base sm:text-lg ${
                  currentStep >= 1 ? 'bg-[#baf742] text-[#0E1C3D]' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <span className={`text-base sm:text-xl font-semibold mr-4 sm:mr-6 whitespace-nowrap ${
                  currentStep >= 1 ? 'text-[#0E1C3D]' : 'text-gray-600'
                }`}>
                  Warenkorb
                </span>
              </div>
              <div className="w-8 sm:w-20 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0"></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 text-base sm:text-lg ${
                  currentStep >= 2 ? 'bg-[#baf742] text-[#0E1C3D]' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`text-base sm:text-xl font-semibold mr-4 sm:mr-6 whitespace-nowrap ${
                  currentStep >= 2 ? 'text-[#0E1C3D]' : 'text-gray-600'
                }`}>
                  Lieferadresse
                </span>
              </div>
              <div className="w-8 sm:w-20 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0"></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 text-base sm:text-lg ${
                  currentStep >= 3 ? 'bg-[#baf742] text-[#0E1C3D]' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <span className={`text-base sm:text-xl font-semibold whitespace-nowrap ${
                  currentStep >= 3 ? 'text-[#0E1C3D]' : 'text-gray-600'
                }`}>
                  Bezahlung
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Warenkorb */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0E1C3D] mb-8 sm:mb-10">Ihr Warenkorb</h2>
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                      <i className="ri-shopping-cart-line text-6xl sm:text-8xl text-gray-400 mb-6"></i>
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-4">Ihr Warenkorb ist leer</h3>
                      <p className="text-[#0E1C3D]/70 mb-8 text-lg">Konfigurieren Sie Ihr TriCast360-System im Shop.</p>
                      <a 
                        href="/shop"
                        className="bg-[#baf742] text-[#0E1C3D] px-8 py-4 rounded-lg hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg"
                      >
                        Zum Shop
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8">
                      {cartItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl p-6 sm:p-8">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 mr-6">
                              <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1C3D] mb-3">{item.name}</h3>
                              <p className="text-base sm:text-lg text-[#0E1C3D]/70">{item.diameter} Durchmesser • {item.modules} Module</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-3"
                            >
                              <i className="ri-delete-bin-line text-xl sm:text-2xl"></i>
                            </button>
                          </div>

                          <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-base sm:text-lg">
                              <span className="text-[#0E1C3D]">Grundpreis</span>
                              <span className="text-[#0E1C3D]">{item.basePrice}€</span>
                            </div>
                            
                            {item.addOns.map((addOn) => (
                              <div key={addOn.id} className="flex justify-between text-base sm:text-lg">
                                <span className="text-[#0E1C3D]">{addOn.name}</span>
                                <span className="text-[#0E1C3D]">+{addOn.price}€</span>
                              </div>
                            ))}
                            
                            {item.werbetafel && (
                              <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-[#0E1C3D]">{item.werbetafel.name}</span>
                                <span className="text-[#0E1C3D]">+{item.werbetafel.price}€</span>
                              </div>
                            )}
                            
                            {item.hasDesignUpload && (
                              <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-[#0E1C3D]">Design-Upload</span>
                                <span className="text-[#baf742]">✓</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200 gap-6">
                            <div className="flex items-center gap-6">
                              <span className="text-[#0E1C3D] font-medium text-lg">Menge:</span>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <i className="ri-subtract-line"></i>
                                </button>
                                <span className="w-16 text-center font-semibold text-lg">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <i className="ri-add-line"></i>
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl sm:text-3xl font-bold text-[#baf742]">{item.totalPrice}€</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Lieferadresse */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0E1C3D] mb-8 sm:mb-10">Lieferadresse</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Vorname *</label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Nachname *</label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">E-Mail *</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Telefon</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Firma (optional)</label>
                      <input
                        type="text"
                        value={customerInfo.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Straße und Hausnummer *</label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">PLZ *</label>
                      <input
                        type="text"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Stadt *</label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-base sm:text-lg"
                        required
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-[#0E1C3D] font-medium mb-3 text-lg">Land</label>
                      <select
                        value={customerInfo.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent pr-10 text-base sm:text-lg"
                      >
                        <option value="Deutschland">Deutschland</option>
                        <option value="Österreich">Österreich</option>
                        <option value="Schweiz">Schweiz</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Bezahlung */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0E1C3D] mb-8 sm:mb-10">Bezahlung & Bestellung abschließen</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0E1C3D] mb-6">Zahlungsart wählen</h3>
                      <div className="space-y-4">
                        <label className="flex items-start p-6 border-2 rounded-lg cursor-pointer hover:border-[#baf742] transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            value="invoice"
                            checked={paymentMethod === 'invoice'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-4 mt-1"
                          />
                          <div>
                            <span className="font-semibold text-[#0E1C3D] text-lg">Rechnung</span>
                            <p className="text-[#0E1C3D]/70">Zahlung nach Erhalt der Rechnung (14 Tage Zahlungsziel)</p>
                          </div>
                        </label>
                        
                        <label className="flex items-start p-6 border-2 rounded-lg cursor-pointer hover:border-[#baf742] transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            value="transfer"
                            checked={paymentMethod === 'transfer'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-4 mt-1"
                          />
                          <div>
                            <span className="font-semibold text-[#0E1C3D] text-lg">Vorkasse</span>
                            <p className="text-[#0E1C3D]/70">Überweisung vor Versand (3% Skonto)</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agbAccepted}
                          onChange={(e) => setAgbAccepted(e.target.checked)}
                          className="mt-1"
                        />
                        <span className="text-base sm:text-lg text-[#0E1C3D]">
                          Ich akzeptiere die{' '}
                          <a href="/impressum" className="text-[#baf742] hover:underline">
                            Allgemeinen Geschäftsbedingungen
                          </a>{' '}
                          und{' '}
                          <a href="/datenschutz" className="text-[#baf742] hover:underline">
                            Datenschutzbestimmungen
                          </a>
                          . *
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between mt-12 sm:mt-16 gap-6">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1 text-lg"
                  >
                    <i className="ri-arrow-left-line"></i>
                    Zurück
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid(currentStep)}
                    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold transition-colors order-1 sm:order-2 text-lg ${currentStep === 1 ? 'w-full sm:w-auto sm:ml-auto' : ''} ${
                      isStepValid(currentStep)
                        ? 'bg-[#baf742] text-[#0E1C3D] hover:bg-[#a8e63a]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Weiter
                    <i className="ri-arrow-right-line"></i>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!isStepValid(3)}
                    className={`flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-lg font-semibold transition-colors order-1 sm:order-2 w-full sm:w-auto sm:ml-auto text-lg ${
                      isStepValid(3)
                        ? 'bg-[#baf742] text-[#0E1C3D] hover:bg-[#a8e63a]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <i className="ri-check-line"></i>
                    Bestellung abschließen
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-[#f8fdf8] rounded-xl p-6 sm:p-8 lg:sticky lg:top-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0E1C3D] mb-6 sm:mb-8">Bestellübersicht</h3>
                
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-4 sm:pb-6">
                      <div className="flex justify-between mb-3">
                        <span className="font-semibold text-[#0E1C3D] text-base sm:text-lg">{item.name}</span>
                        <span className="font-semibold text-[#0E1C3D] text-base sm:text-lg">{item.totalPrice}€</span>
                      </div>
                      <p className="text-sm sm:text-base text-[#0E1C3D]/70">Menge: {item.quantity}x</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-[#0E1C3D]">Zwischensumme</span>
                    <span className="font-semibold text-[#0E1C3D]">{getSubtotal()}€</span>
                  </div>
                  
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-[#0E1C3D]">Versand</span>
                    <span className="font-semibold text-[#0E1C3D]">
                      {getShipping() === 0 ? 'Kostenlos' : `${getShipping()}€`}
                    </span>
                  </div>
                  
                  {getShipping() === 0 && (
                    <p className="text-sm sm:text-base text-[#baf742] font-medium">
                      ✓ Kostenloser Versand ab 500€
                    </p>
                  )}
                </div>
                
                <div className="border-t border-gray-300 pt-4 sm:pt-6 mb-6 sm:mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-[#0E1C3D]">Gesamtsumme</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#baf742]">{getTotal()}€</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#0E1C3D]/70 mt-2">inkl. 19% MwSt.</p>
                </div>
                
                <div className="text-sm sm:text-base text-[#0E1C3D]/70 space-y-2 sm:space-y-3">
                  <p>✓ 30 Tage Rückgaberecht</p>
                  <p>✓ 2 Jahre Garantie</p>
                  <p>✓ Kostenlose Beratung</p>
                </div>
              </div>
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

export default WarenkorbPage;
