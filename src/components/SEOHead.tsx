import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead = ({
  title = "TriCast360 - Revolutionärer Baumschutz für Bäume und Werte",
  description = "Revolutionäres Schutzsystem für Bäume - wiederverwendbar, nachhaltig und kostengünstig. Perfekt für Baustellen, Veranstaltungen und Stadtentwicklung.",
  keywords = "Baumschutz, Baumverkleidung, Baustellenschutz, Stadtentwicklung, nachhaltig, wiederverwendbar, Umweltschutz, TRICAST360",
  image = "https://tricast360.de/logo.webp",
  url = "https://tricast360.de/",
  type = "website"
}: SEOProps) => {
  const siteName = "TRICAST360";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteName} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="de_DE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="German" />
    </Helmet>
  );
};

// Predefined SEO configs for different pages
export const pageSEO = {
  home: {
    title: "TriCast360 - Revolutionärer Baumschutz für Bäume und Werte",
    description: "Revolutionäres Schutzsystem für Bäume - wiederverwendbar, nachhaltig und kostengünstig. Perfekt für Baustellen, Veranstaltungen und Stadtentwicklung.",
    url: "https://tricast360.de/"
  },
  system: {
    title: "TRICAST360 Schutzsystem - Innovative Baumverkleidung | TriCast360",
    description: "Entdecken Sie unser revolutionäres TRICAST360 Schutzsystem. Wiederverwendbare Baumverkleidungen für Baustellen, Veranstaltungen und Stadtentwicklung.",
    keywords: "TRICAST360 System, Baumverkleidung, Schutzsystem, Baustellenschutz, wiederverwendbar",
    url: "https://tricast360.de/system"
  },
  about: {
    title: "Über Uns - TRICAST360 Team & Expertise | TriCast360",
    description: "Lernen Sie das TRICAST360 Team kennen. Experten für Baumschutz und nachhaltige Stadtentwicklung mit jahrelanger Erfahrung.",
    keywords: "TRICAST360 Team, Baumschutzexperten, nachhaltige Stadtentwicklung, Umweltschutz",
    url: "https://tricast360.de/ueber-uns"
  },
  contact: {
    title: "Kontakt - TRICAST360 erreichen | TriCast360",
    description: "Kontaktieren Sie TRICAST360 für Ihr Baumschutzprojekt. Professionelle Beratung und individuelle Lösungen für Baumverkleidungen.",
    keywords: "TRICAST360 Kontakt, Baumschutz Beratung, Projektanfrage, Baumverkleidung",
    url: "https://tricast360.de/kontakt"
  },
  shop: {
    title: "Shop - TRICAST360 Produkte kaufen | TriCast360",
    description: "TRICAST360 Produkte online kaufen. Hochwertige Baumverkleidungen und Schutzsysteme für professionelle Anwendungen.",
    keywords: "TRICAST360 Shop, Baumverkleidung kaufen, Schutzsysteme, Produkte",
    url: "https://tricast360.de/shop"
  },
  cart: {
    title: "Warenkorb - TRICAST360 Bestellung | TriCast360",
    description: "Ihr Warenkorb bei TRICAST360. Überprüfen und bearbeiten Sie Ihre Bestellung für Baumverkleidungen und Schutzsysteme.",
    keywords: "TRICAST360 Warenkorb, Bestellung, Baumverkleidung kaufen",
    url: "https://tricast360.de/warenkorb"
  },
  privacy: {
    title: "Datenschutz - TRICAST360 | TriCast360",
    description: "Datenschutzerklärung von TRICAST360. Erfahren Sie, wie wir Ihre Daten schützen und verarbeiten.",
    keywords: "TRICAST360 Datenschutz, Datenschutzerklärung, Datenverarbeitung",
    url: "https://tricast360.de/datenschutz"
  },
  imprint: {
    title: "Impressum - TRICAST360 | TriCast360",
    description: "Impressum von TRICAST360. Rechtliche Informationen, Kontakt und Verantwortlichkeiten.",
    keywords: "TRICAST360 Impressum, rechtliche Informationen, Kontakt",
    url: "https://tricast360.de/impressum"
  }
};
