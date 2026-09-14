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
  const logoSrc = '/marrakech-palace-logo.png';

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
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src.endsWith('/marrakech-palace-logo.png')) {
            img.src = '/images/logo/marrakech-palace-logo.png';
          } else if (img.src.includes('/images/logo/')) {
            img.src = '/logo.png';
          }
        }}
      />
    </Link>
  );
}
