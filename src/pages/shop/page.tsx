
import React, { useState, useEffect, useRef } from 'react';

interface ProductSet {
  id: string;
  name: string;
  diameter: string;
  modules: number;
  price: number;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface WerbetafelOption {
  id: string;
  name: string;
  description: string;
  price: number;
  setId: string;
}

const ShopPage = () => {
  // Original state variables
  const [selectedSet, setSelectedSet] = useState<string>('set-s');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedWerbetafel, setSelectedWerbetafel] = useState<string>('none');
  const [quantity, setQuantity] = useState<number>(1);
  const [customQuantity, setCustomQuantity] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Multi-step funnel state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Modified / new state variables
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Auto scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Intersection Observer für Scroll-Animationen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px',
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

  // Data
  const productSets: ProductSet[] = [
    { id: 'set-s', name: 'Set S (5er Set)', diameter: '25cm', modules: 5, price: 399 },
    { id: 'set-m', name: 'Set M (7er Set)', diameter: '32cm', modules: 7, price: 559 },
    { id: 'set-l', name: 'Set L (9er Set)', diameter: '40cm', modules: 9, price: 699 },
    { id: 'set-xl', name: 'Set XL (12er Set)', diameter: '55cm', modules: 12, price: 879 },
    { id: 'set-2xl', name: 'Set 2XL (15er Set)', diameter: '70cm', modules: 15, price: 999 },
  ];

  const addOns: AddOn[] = [
    { id: 'verstarkung', name: 'Verstärkung', description: 'Zusätzliche Stabilität für extreme Wetterbedingungen', price: 50 },
    { id: 'farboption', name: 'Farboption', description: 'Individuelle Farbgestaltung des Systems', price: 49 },
  ];

  const werbetafelOptions: WerbetafelOption[] = [
    { id: 'none', name: 'Keine Werbetafel', description: 'Ohne Werbefläche', price: 0, setId: '' },
    { id: 'werbetafel-s', name: 'Werbetafel Set S (5er Set)', description: 'Passend für 25cm System', price: 29, setId: 'set-s' },
    { id: 'werbetafel-m', name: 'Werbetafel Set M (7er Set)', description: 'Passend für 32cm System', price: 39, setId: 'set-m' },
    { id: 'werbetafel-l', name: 'Werbetafel Set L (9er Set)', description: 'Passend für 40cm System', price: 49, setId: 'set-l' },
    { id: 'werbetafel-xl', name: 'Werbetafel Set XL (12er Set)', description: 'Passend für 55cm System', price: 59, setId: 'set-xl' },
    { id: 'werbetafel-2xl', name: 'Werbetafel Set 2XL (15er Set)', description: 'Passend für 70cm System', price: 69, setId: 'set-2xl' },
  ];

  // Helper functions
  const getCurrentSet = () => productSets.find((set) => set.id === selectedSet);
  const getCurrentWerbetafel = () => werbetafelOptions.find((opt) => opt.id === selectedWerbetafel);

  const calculateTotal = () => {
    const basePrice = getCurrentSet()?.price || 0;
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    const werbetafelPrice = getCurrentWerbetafel()?.price || 0;
    const finalQuantity = customQuantity ? parseInt(customQuantity) || 1 : quantity;
    return (basePrice + addOnPrice + werbetafelPrice) * finalQuantity;
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setCustomQuantity('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview('');
  };

  const handleAddToCart = () => {
    const currentSet = getCurrentSet();
    const currentWerbetafel = getCurrentWerbetafel();
    const finalQuantity = customQuantity ? parseInt(customQuantity) || 1 : quantity;

    const configData = {
      setName: currentSet?.name || 'Individuelles Set',
      diameter: currentSet?.diameter || '',
      modules: currentSet?.modules || 0,
      basePrice: currentSet?.price || 0,
      addOns: selectedAddOns
        .map((addOnId) => {
          const addOn = addOns.find((a) => a.id === addOnId);
          return addOn ? { id: addOn.id, name: addOn.name, price: addOn.price } : null;
        })
        .filter(Boolean),
      werbetafel:
        currentWerbetafel && currentWerbetafel.id !== 'none'
          ? {
              id: currentWerbetafel.id,
              name: currentWerbetafel.name,
              price: currentWerbetafel.price,
            }
          : null,
      quantity: finalQuantity,
      hasDesignUpload: uploadedImage !== null,
      totalPrice: calculateTotal(),
    };

    // Save configuration to localStorage
    localStorage.setItem('TRICAST360_config', JSON.stringify(configData));

    // Navigate to cart (replace with appropriate navigation if using router)
    // @ts-ignore
    window.REACT_APP_NAVIGATE('/warenkorb');
  };

  // Contact form submit (modified)
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

  // Step validation
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return selectedSet !== '';
      case 2:
        return true; // Add-ons are optional
      case 3:
        return selectedWerbetafel !== '';
      case 4:
        return quantity > 0 || (customQuantity && parseInt(customQuantity) > 0);
      case 5:
        return true; // Summary step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return 'Produktset wählen';
      case 2:
        return 'Zubehör hinzufügen';
      case 3:
        return 'Werbetafel konfigurieren';
      case 4:
        return 'Stückzahl festlegen';
      case 5:
        return 'Zusammenfassung';
      default:
        return '';
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return 'Wählen Sie das passende TriCast360-Set für Ihren Stammdurchmesser';
      case 2:
        return 'Erweitern Sie Ihr System mit optionalem Zubehör';
      case 3:
        return 'Fügen Sie eine Werbetafel hinzu und laden Sie Ihr Design hoch';
      case 4:
        return 'Bestimmen Sie die gewünschte Anzahl der Sets';
      case 5:
        return 'Überprüfen Sie Ihre Konfiguration und fügen Sie sie zum Warenkorb hinzu';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c14]">
      {/* Header - Modified */}
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
              <a href="/shop" className="text-[#baf742] font-medium">
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
                  className="text-[#baf742] font-medium py-2"
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
        className={`py-24 lg:py-32 bg-[#f8fdf8] transition-all duration-1000 ${
          isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0E1C3D] mb-8">
              TRICAST360<sup>®</sup> Shop
            </h1>
            <p className="text-xl lg:text-2xl text-[#0E1C3D]/80 max-w-4xl mx-auto mb-12">
              Stellen Sie Ihr individuelles Baumschutzsystem zusammen und erhalten Sie sofort ein Angebot.
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-[#0E1C3D]">Schritt {currentStep} von {totalSteps}</span>
                <span className="text-sm font-medium text-[#0E1C3D]">{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-[#baf742] h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section
        id="configuration"
        ref={setSectionRef('configuration')}
        className={`py-24 lg:py-32 bg-white transition-all duration-1000 delay-200 ${
          isVisible('configuration') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Configuration Panel */}
            <div className="lg:col-span-2">
              {/* Step Header */}
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0E1C3D] mb-4">
                  {getStepTitle(currentStep)}
                </h2>
                <p className="text-lg text-[#0E1C3D]/70">
                  {getStepDescription(currentStep)}
                </p>
              </div>

              {/* Step 1: Product Set Selection */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productSets.map((set) => (
                      <div
                        key={set.id}
                        className={`border-2 rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105 ${
                          selectedSet === set.id 
                            ? 'border-[#baf742] bg-[#baf742]/5 shadow-lg shadow-[#baf742]/20' 
                            : 'border-gray-200 hover:border-[#baf742]/50 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedSet(set.id)}
                      >
                        <div className="text-center">
                          <h4 className="text-2xl font-semibold text-[#0E1C3D] mb-4">{set.name}</h4>
                          <p className="text-[#0E1C3D]/70 mb-2 text-lg">{set.diameter} Durchmesser</p>
                          <p className="text-[#0E1C3D]/70 mb-6 text-lg">{set.modules} Module</p>
                          <p className="text-3xl font-bold text-[#baf742] mb-4">{set.price}€</p>
                          {selectedSet === set.id && (
                            <div className="flex justify-center">
                              <i className="ri-check-circle-fill text-[#baf742] text-3xl"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Add-ons */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                      <i className="ri-information-line text-blue-600 text-2xl mr-3"></i>
                      <p className="text-blue-800">
                        Zubehör ist optional. Sie können diesen Schritt überspringen, wenn Sie kein zusätzliches Zubehör benötigen.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {addOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className={`border-2 rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-[1.02] ${
                          selectedAddOns.includes(addOn.id) 
                            ? 'border-[#baf742] bg-[#baf742]/5 shadow-lg shadow-[#baf742]/20' 
                            : 'border-gray-200 hover:border-[#baf742]/50 hover:shadow-md'
                        }`}
                        onClick={() => handleAddOnToggle(addOn.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-2xl font-semibold text-[#0E1C3D] mb-3">{addOn.name}</h4>
                            <p className="text-[#0E1C3D]/70 text-lg">{addOn.description}</p>
                          </div>
                          <div className="text-right ml-6">
                            <p className="text-3xl font-bold text-[#baf742] mb-2">+{addOn.price}€</p>
                            {selectedAddOns.includes(addOn.id) && (
                              <i className="ri-check-circle-fill text-[#baf742] text-3xl"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Werbetafel */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="space-y-6">
                    {werbetafelOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border-2 rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-[1.02] ${
                          selectedWerbetafel === option.id 
                            ? 'border-[#baf742] bg-[#baf742]/5 shadow-lg shadow-[#baf742]/20' 
                            : 'border-gray-200 hover:border-[#baf742]/50 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedWerbetafel(option.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-2xl font-semibold text-[#0E1C3D] mb-3">{option.name}</h4>
                            <p className="text-[#0E1C3D]/70 text-lg">{option.description}</p>
                          </div>
                          <div className="text-right ml-6">
                            <p className="text-3xl font-bold text-[#baf742] mb-2">
                              {option.price === 0 ? '0€' : `+${option.price}€`}
                            </p>
                            {selectedWerbetafel === option.id && (
                              <i className="ri-check-circle-fill text-[#baf742] text-3xl"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Image Upload Section */}
                  {selectedWerbetafel !== 'none' && (
                    <div className="mt-12 p-8 bg-[#f8fdf8] rounded-2xl border border-gray-200">
                      <h4 className="text-2xl font-semibold text-[#0E1C3D] mb-6">Werbetafel-Design hochladen</h4>
                      <p className="text-[#0E1C3D]/70 mb-8 text-lg">
                        Laden Sie Ihr Logo oder Design für die Werbetafel hoch (JPG, PNG, PDF)
                      </p>

                      {!imagePreview ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#baf742] transition-colors">
                          <i className="ri-upload-cloud-2-line text-6xl text-gray-400 mb-6"></i>
                          <p className="text-[#0E1C3D] mb-6 text-lg">Datei hier ablegen oder</p>
                          <label className="bg-[#baf742] text-[#0a0c14] px-8 py-4 rounded-lg hover:bg-[#a8e63a] transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg">
                            Datei auswählen
                            <input type="file" accept="image/*,.pdf" onChange={handleImageUpload} className="hidden" />
                          </label>
                          <p className="text-base text-[#0E1C3D]/60 mt-4">Maximale Dateigröße: 10MB</p>
                        </div>
                      ) : (
                        <div className="border-2 border-[#baf742] rounded-lg p-8">
                          <div className="flex items-center justify-between mb-6">
                            <h5 className="font-semibold text-[#0E1C3D] text-lg">Hochgeladenes Design</h5>
                            <button onClick={removeImage} className="text-red-500 hover:text-red-700 transition-colors">
                              <i className="ri-delete-bin-line text-2xl"></i>
                            </button>
                          </div>
                          {uploadedImage?.type.startsWith('image/') ? (
                            <img src={imagePreview} alt="Werbetafel Design" className="max-w-full h-48 object-contain rounded-lg" />
                          ) : (
                            <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-lg">
                              <i className="ri-file-pdf-line text-4xl text-red-500"></i>
                              <span className="text-[#0E1C3D] text-lg">{uploadedImage?.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Quantity */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleQuantityChange(num)}
                        className={`py-6 px-8 rounded-lg border-2 font-semibold transition-all text-xl transform hover:scale-105 ${
                          quantity === num && !customQuantity
                            ? 'border-[#baf742] bg-[#baf742] text-[#0a0c14] shadow-lg shadow-[#baf742]/20'
                            : 'border-gray-300 text-[#0E1C3D] hover:border-[#baf742]'
                        }`}
                      >
                        {num} Stück
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#f8fdf8] rounded-lg p-8 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <label className="text-[#0E1C3D] font-medium text-xl">Andere Anzahl:</label>
                      <input
                        type="number"
                        min="1"
                        value={customQuantity}
                        onChange={(e) => {
                          setCustomQuantity(e.target.value);
                          setQuantity(0);
                        }}
                        className="w-full md:w-48 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent text-xl"
                        placeholder="Anzahl eingeben"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <i className="ri-information-line text-blue-600 text-2xl mr-3 mt-1"></i>
                      <div>
                        <h5 className="font-semibold text-blue-800 mb-2">Mengenrabatt verfügbar</h5>
                        <p className="text-blue-700">
                          Ab 10 Sets: 5% Rabatt • Ab 20 Sets: 10% Rabatt • Ab 50 Sets: 15% Rabatt
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div className="bg-[#f8fdf8] rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-[#0E1C3D] mb-8">Ihre Konfiguration im Überblick</h3>
                    
                    <div className="space-y-6">
                      {/* Selected Set */}
                      <div className="flex justify-between items-center py-4 border-b border-gray-200">
                        <div>
                          <h4 className="font-semibold text-[#0E1C3D] text-lg">{getCurrentSet()?.name}</h4>
                          <p className="text-[#0E1C3D]/70">{getCurrentSet()?.diameter} Durchmesser • {getCurrentSet()?.modules} Module</p>
                        </div>
                        <span className="font-bold text-[#0E1C3D] text-lg">{getCurrentSet()?.price}€</span>
                      </div>

                      {/* Add-ons */}
                      {selectedAddOns.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-[#0E1C3D] text-lg">Zubehör</h4>
                          {selectedAddOns.map((addOnId) => {
                            const addOn = addOns.find((a) => a.id === addOnId);
                            return addOn ? (
                              <div key={addOn.id} className="flex justify-between items-center py-2">
                                <span className="text-[#0E1C3D]">{addOn.name}</span>
                                <span className="font-semibold text-[#0E1C3D]">+{addOn.price}€</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}

                      {/* Werbetafel */}
                      {selectedWerbetafel !== 'none' && (
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                          <div>
                            <h4 className="font-semibold text-[#0E1C3D] text-lg">{getCurrentWerbetafel()?.name}</h4>
                            {uploadedImage && (
                              <p className="text-[#baf742] text-sm">✓ Design hochgeladen</p>
                            )}
                          </div>
                          <span className="font-bold text-[#0E1C3D] text-lg">+{getCurrentWerbetafel()?.price}€</span>
                        </div>
                      )}

                      {/* Quantity */}
                      <div className="flex justify-between items-center py-4 border-b border-gray-200">
                        <span className="font-semibold text-[#0E1C3D] text-lg">Stückzahl</span>
                        <span className="font-bold text-[#0E1C3D] text-lg">
                          {customQuantity ? parseInt(customQuantity) || 1 : quantity}x
                        </span>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300">
                        <span className="text-2xl font-bold text-[#0E1C3D]">Gesamtpreis</span>
                        <span className="text-3xl font-bold text-[#baf742]">{calculateTotal()}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <i className="ri-check-line text-green-600 text-2xl mr-3 mt-1"></i>
                      <div>
                        <h5 className="font-semibold text-green-800 mb-2">Bereit für den Warenkorb</h5>
                        <p className="text-green-700">
                          Ihre Konfiguration ist vollständig. Klicken Sie auf "In den Warenkorb", um fortzufahren.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-16">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all text-lg ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-[#0E1C3D] hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  <i className="ri-arrow-left-line"></i>
                  Zurück
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all text-lg ${
                      isStepValid(currentStep)
                        ? 'bg-[#baf742] text-[#0a0c14] hover:bg-[#a8e63a] shadow-lg shadow-[#baf742]/20'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Weiter
                    <i className="ri-arrow-right-line"></i>
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#baf742] text-[#0a0c14] px-8 py-4 rounded-lg hover:bg-[#a8e63a] transition-all duration-300 font-bold text-lg whitespace-nowrap cursor-pointer shadow-lg shadow-[#baf742]/20 hover:shadow-xl hover:shadow-[#baf742]/30 flex items-center gap-3"
                  >
                    <i className="ri-shopping-cart-line text-xl"></i>
                    In den Warenkorb ({calculateTotal()}€)
                  </button>
                )}
              </div>
            </div>

            {/* Configuration Summary - Rechts */}
            <div className="lg:col-span-1">
              <div className="bg-[#f8fdf8] rounded-2xl p-8 sticky top-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-[#0E1C3D] mb-8">
                  Aktuelle Auswahl
                </h3>
                
                <div className="space-y-6 mb-8">
                  {/* Current Set */}
                  {selectedSet && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-lg text-[#0E1C3D] font-medium">
                        {getCurrentSet()?.name}
                      </span>
                      <span className="font-bold text-lg text-[#0E1C3D]">
                        {getCurrentSet()?.price}€
                      </span>
                    </div>
                  )}
                  
                  {/* Add-ons */}
                  {selectedAddOns.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-base font-semibold text-[#0E1C3D] border-b border-gray-200 pb-2">
                        Zubehör
                      </h4>
                      {selectedAddOns.map((addOnId) => {
                        const addOn = addOns.find((a) => a.id === addOnId);
                        return addOn ? (
                          <div key={addOn.id} className="flex justify-between items-center py-1">
                            <span className="text-sm text-[#0E1C3D]">
                              {addOn.name}
                            </span>
                            <span className="font-semibold text-sm text-[#0E1C3D]">
                              +{addOn.price}€
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {/* Werbetafel */}
                  {selectedWerbetafel !== 'none' && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-lg text-[#0E1C3D] font-medium">
                        {getCurrentWerbetafel()?.name}
                      </span>
                      <span className="font-bold text-lg text-[#0E1C3D]">
                        +{getCurrentWerbetafel()?.price}€
                      </span>
                    </div>
                  )}

                  {/* Quantity */}
                  {(quantity > 0 || customQuantity) && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-lg text-[#0E1C3D] font-medium">
                        Stückzahl
                      </span>
                      <span className="font-bold text-lg text-[#0E1C3D]">
                        {customQuantity ? parseInt(customQuantity) || 1 : quantity}x
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-gray-300 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#0E1C3D]">
                      Gesamtpreis
                    </span>
                    <span className="text-2xl font-bold text-[#baf742]">
                      {calculateTotal()}€
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#0E1C3D]/70">
                  <p>✓ Kostenloser Versand ab 500€</p>
                  <p>✓ 30 Tage Rückgaberecht</p>
                  <p>✓ 2 Jahre Garantie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modified */}
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
                <li>
                  <a href="/system" className="text-white/60 hover:text-[#baf742] transition-colors">
                    System
                  </a>
                </li>
                <li>
                  <a href="/shop" className="text-white/60 hover:text-[#baf742] transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/ueber-uns" className="text-white/60 hover:text-[#baf742] transition-colors">
                    Über uns
                  </a>
                </li>
                <li>
                  <a href="/kontakt" className="text-white/60 hover:text-[#baf742] transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Rechtliches</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/impressum" className="text-white/60 hover:text-[#baf742] transition-colors">
                    Impressum
                  </a>
                </li>
                <li>
                  <a href="/datenschutz" className="text-white/60 hover:text-[#baf742] transition-colors">
                    Datenschutz
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} TRICAST360<sup>®</sup>. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal - Modified */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0c14] border border-white/10 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Jetzt anfragen</h3>
                <button onClick={() => setIsContactFormOpen(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} data-readdy-form id="konfigurator-contact-form">
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

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">Nachricht</label>
                  <textarea
                    name="nachricht"
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#baf742] focus:border-transparent resize-none text-white"
                    placeholder="Beschreiben Sie Ihr Projekt..."
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

export default ShopPage;
