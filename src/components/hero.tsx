'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';

export function Hero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.src = '/media/hero.mp4';
    video.play().catch(() => {});
  }, []);

  return (
    <section className="hero">
      <Image
        src="/media/exterieurs-v2day.png"
        alt="Villa Marrakech Palace"
        fill
        priority
        sizes="100vw"
        className="hero-poster"
      />
      <video
        ref={ref}
        className={`hero-video ${ready ? 'is-ready' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/exterieurs-v2day.png"
        onPlaying={() => setReady(true)}
        aria-label="Film de la villa Marrakech Palace et de sa piscine"
      />
      <div className="hero-shade" />
      <div className="hero-content container">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>
          {t.hero.title1}
          <br />
          {t.hero.title2} <em>{t.hero.titleHighlight}</em>
        </h1>
        <p>{t.hero.subtitle}</p>
        <div className="hero-actions">
          <Link className="button button-light" href="/les-villas">
            {t.hero.discoverVillas} <ArrowUpRight size={17} />
          </Link>
          <a className="hero-brochure" href={site.brochure} download>
            {t.hero.brochure} <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <div className="hero-bottom container">
        <a href="#le-domaine" className="scroll-link">
          <span className="scroll-line" />
          {t.hero.scroll}
        </a>
      </div>
    </section>
  );
}
