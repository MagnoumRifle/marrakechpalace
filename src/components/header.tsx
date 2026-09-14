'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './brand';
import { LanguageSwitcher } from './language-switcher';
import { useLanguage } from '@/lib/i18n';
import { whatsappLink } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const { t } = useLanguage();

  const navItems = [
    { href: '/le-domaine', label: t.nav.domain },
    { href: '/les-villas', label: t.nav.villas },
    { href: '/galerie', label: t.nav.gallery },
    { href: '/documents', label: t.nav.documents },
    { href: '/localisation', label: t.nav.location },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  function close() {
    dialog.current?.close();
  }

  return (
    <>
      <header className={`header ${pathname === '/' && !scrolled ? 'header-overlay' : ''}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>
            {t.nav.contact}
          </Link>
        </nav>
        <LanguageSwitcher />
        <Link href="/contact" className="header-cta">
          {t.nav.cta} <ArrowUpRight size={15} />
        </Link>
        <button className="menu-toggle icon-button" onClick={() => dialog.current?.showModal()} aria-label={t.nav.openMenu}>
          <Menu />
        </button>
      </header>

      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu principal"
        onClick={e => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <Brand tone="bronze" onClick={close} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LanguageSwitcher />
              <button onClick={close} className="icon-button" aria-label={t.nav.closeMenu}>
                <X />
              </button>
            </div>
          </div>
          <nav aria-label="Navigation mobile">
            <Link href="/" onClick={close}>
              {t.nav.home}
            </Link>
            {navItems.map((item, i) => (
              <Link key={item.href} href={item.href} onClick={close}>
                <small>0{i + 1}</small>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={close}>
              <small>0{navItems.length + 1}</small>
              {t.nav.contact}
            </Link>
          </nav>
          <Link
            href="/contact"
            className="button"
            onClick={close}
            style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
          >
            {t.nav.cta} <ArrowUpRight size={16} />
          </Link>
          <a className="text-link" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            {t.nav.whatsapp} <ArrowUpRight size={16} />
          </a>
          <p className="eyebrow">{t.nav.addressTag}</p>
        </div>
      </dialog>
    </>
  );
}
