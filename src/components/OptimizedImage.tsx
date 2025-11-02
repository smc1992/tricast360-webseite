import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  title?: string;
}

// Bild-Komponente mit optimierten SEO- und Performance-Attributen
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  title
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      title={title || alt}
      decoding="async"
    />
  );
};

// Predefined Alt-Texts für häufig verwendete Bilder
export const imageAlts = {
  logo: "TRICAST360 Logo - Revolutionärer Baumschutz",
  heroVideo: "TRICAST360 Baumschutzsystem in Aktion auf Baustelle",
  teamMember1: "Galip Alkan - TRICAST360 Teammitglied und Experte",
  teamMember2: "Rifat Acar - TRICAST360 Teammitglied und Experte",
  protectionSystem: "TRICAST360 Baumschutzmodul auf Stadtbaustelle",
  constructionSite1: "Baustelle mit TRICAST360 Baumverkleidungen",
  constructionSite2: "Stadtbaustelle mit professionellem Baumschutz",
  constructionSite3: "TRICAST360 Schutzsystem in urbaner Umgebung",
  constructionSite4: "Baustellenschutz mit wiederverwendbaren Modulen",
  backgroundAbout: "Architektonischer Hintergrund für Über-Uns Seite",
  productImage1: "TRICAST360 Baumschutzmodul Detailansicht",
  productImage2: "Professionelle Baumverkleidung auf Baustelle",
  productImage3: "TRICAST360 Schutzsystem Installation"
};
