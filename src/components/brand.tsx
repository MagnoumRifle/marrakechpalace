import Link from 'next/link';

export interface BrandProps {
  onClick?: () => void;
  variant?: 'horizontal' | 'stacked' | 'emblem';
  tone?: 'auto' | 'light' | 'dark' | 'bronze';
  className?: string;
  height?: number;
}

export function Brand({
  onClick,
  tone = 'auto',
  className = '',
  height,
}: BrandProps) {
  const customStyle = height ? { height: `${height}px` } : undefined;
  // Clean URL-safe asset matching images/Logos/Plan de travail 1 copie 5@4x.png
  const logoSrc = '/images/logo/marrakech-palace-logo.png';

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`brand brand-${tone} ${className}`}
      aria-label="Marrakech Palace — Accueil"
    >
      <img
        src={logoSrc}
        alt="Marrakech Palace"
        className="brand-logo"
        style={customStyle}
      />
    </Link>
  );
}
