'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Download, MessageCircle } from 'lucide-react';
import { Brand } from './brand';
import { site, whatsappLink } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';
import media from '@/lib/media.json';

const mediaMap = new Map((media as { id: string; src: string }[]).map(x => [x.id, x.src]));
const fallbacks: Record<string, string> = {
  'padel': '/media/padel.webp',
  'plan-domaine': '/media/plan-domaine.webp',
  'brochure-cover': '/media/brochure-cover.webp',
  'cps-cover': '/media/cps-cover.webp',
};

export function Photo({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 760px) 100vw, 50vw',
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const resolved =
    mediaMap.get(src) ||
    fallbacks[src] ||
    (src.startsWith('/') ? src : src.includes('.') ? `/media/${src}` : `/media/${src}.png`);
  return (
    <div className={`photo ${className}`}>
      <Image src={resolved} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`text-link ${light ? 'light' : ''}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <p className="intro-copy">{children}</p>}
    </section>
  );
}

export function Stats() {
  const { lang } = useLanguage();
  return (
    <div className="stats container">
      <div>
        <span>12</span>
        <p>{lang === 'fr' ? 'Villas individuelles' : 'Individual villas'}</p>
      </div>
      <div>
        <span>
          422 <small>m²</small>
        </span>
        <p>{lang === 'fr' ? 'De surface couverte par villa' : 'Covered area per villa'}</p>
      </div>
      <div>
        <span>
          1 414 <em>{lang === 'fr' ? 'à' : 'to'}</em> 1 903 <small>m²</small>
        </span>
        <p>{lang === 'fr' ? 'De terrain privatif' : 'Private grounds per villa'}</p>
      </div>
    </div>
  );
}

export function DocumentsList() {
  const { lang } = useLanguage();
  const docs = [
    {
      title: (
        <>
          {lang === 'fr' ? 'Brochure du projet' : 'Project Brochure'}
        </>
      ),
      copy: (
        <>
          {lang === 'fr' ? 'L’esprit ' : 'The spirit of '}
          <span className="the-seasons">Marrakech Palace</span>
        </>
      ),
      href: site.brochure,
    },
    {
      title: lang === 'fr' ? 'Cahier des prestations' : 'Specifications (CPS)',
      copy: lang === 'fr' ? 'Le projet dans ses détails' : 'Technical details and finishes',
      href: site.cps,
    },
  ];

  return (
    <div className="document-list">
      {docs.map(doc => (
        <a key={doc.href} href={doc.href} download className="document-row">
          <span>
            <strong>{doc.title}</strong>
            <small>{doc.copy}</small>
          </span>
          <span className="document-action">
            {lang === 'fr' ? 'Télécharger' : 'Download'} <span className="file-type">PDF</span>
            <Download size={18} />
          </span>
        </a>
      ))}
    </div>
  );
}

export function VisitCTA() {
  const { t } = useLanguage();
  return (
    <section className="visit-cta">
      <div className="container visit-cta-inner">
        <div>
          <p className="eyebrow">{t.visitCta.eyebrow}</p>
          <h2>
            {t.visitCta.title1}
            <br />
            {t.visitCta.title2} <em>{t.visitCta.titleHighlight}</em>
          </h2>
        </div>
        <div>
          <p>{t.visitCta.text}</p>
          <div className="visit-cta-actions">
            <Link href="/contact" className="button button-light">
              {t.visitCta.button} <ArrowUpRight size={17} />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-light"
            >
              <MessageCircle size={18} /> WhatsApp <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const navItems = [
    { href: '/le-domaine', label: t.nav.domain },
    { href: '/les-villas', label: t.nav.villas },
    { href: '/galerie', label: t.nav.gallery },
    { href: '/documents', label: t.nav.documents },
    { href: '/localisation', label: t.nav.location },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="footer">
      <div className="container footer-top">
        <Brand tone="light" />
        <nav aria-label="Navigation de pied de page">
          {navItems.map(x => (
            <Link key={x.href} href={x.href}>
              {x.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} <span className="the-seasons">Marrakech Palace</span>
        </span>
        <span>{t.footer.location}</span>
        <span>{t.footer.legal}</span>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const { t } = useLanguage();
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Marrakech Palace"
    >
      <MessageCircle size={22} />
      <span>{t.visitCta.eyebrow}</span>
    </a>
  );
}

export { ArrowDown, ArrowRight, ArrowUpRight };
