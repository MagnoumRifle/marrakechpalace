'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { gallery, films, plansList, GalleryItem } from '@/lib/gallery';
import { Lightbox } from './lightbox';
import { useLanguage } from '@/lib/i18n';

export function Gallery() {
  const [category, setCategory] = useState('tout');
  const [index, setIndex] = useState<number | null>(null);
  const { t, lang } = useLanguage();

  let items: GalleryItem[] = [];
  if (category === 'films') {
    items = films;
  } else if (category === 'plans') {
    items = plansList;
  } else if (category === 'tout') {
    items = gallery;
  } else {
    items = gallery.filter(x => x.category === category);
  }

  const filterButtons = [
    { id: 'tout', label: t.gallery.filters.tous },
    { id: 'exterieurs', label: t.gallery.filters.exterieurs },
    { id: 'rdc', label: t.gallery.filters.rdc },
    { id: 'etage', label: t.gallery.filters.etage },
    {
      id: 'plans',
      label: lang === 'fr' ? "Plans d'architecte" : 'Architectural Plans',
    },
    {
      id: 'films',
      label: lang === 'fr' ? 'Films & Vidéos' : 'Films & Videos',
    },
  ];

  return (
    <section className="container gallery-section">
      <div
        className="gallery-filters"
        role="group"
        aria-label={lang === 'fr' ? 'Filtrer la galerie' : 'Filter gallery'}
      >
        {filterButtons.map(({ id, label }) => (
          <button
            aria-pressed={id === category}
            key={id}
            onClick={() => setCategory(id)}
          >
            {label}
          </button>
        ))}
        <span aria-live="polite">
          {items.length}{' '}
          {items.length === 1
            ? lang === 'fr'
              ? 'média'
              : 'media'
            : lang === 'fr'
            ? 'vues'
            : 'views'}
        </span>
      </div>

      <div className={`gallery-grid ${category === 'plans' ? 'gallery-grid-plans' : ''}`}>
        {items.map((item, i) => {
          const caption =
            lang === 'en' && item.altEn ? item.altEn : item.altFr || item.alt;
          const isHero = category === 'tout' && i === 0;

          return (
            <button
              key={item.id}
              className={`gallery-card ${isHero ? 'gallery-card-hero' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`${
                item.video
                  ? lang === 'fr'
                    ? 'Lire la vidéo'
                    : 'Play video'
                  : lang === 'fr'
                  ? 'Agrandir'
                  : 'View'
              } : ${caption} — vue ${i + 1}`}
            >
              <div
                className={`gallery-photo ${
                  item.plan ? 'is-plan' : ''
                } ${item.video ? 'is-video' : ''}`}
              >
                <Image
                  src={item.src}
                  alt={caption}
                  fill
                  loading={i < 4 ? 'eager' : 'lazy'}
                  sizes={
                    isHero
                      ? '100vw'
                      : '(max-width: 650px) 100vw, 50vw'
                  }
                />
                {item.video && (
                  <span className="gallery-play" aria-hidden="true">
                    <Play size={28} fill="white" />
                  </span>
                )}
                <span className="gallery-enlarge" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
                {item.video && (
                  <span className="gallery-video-tag">
                    {lang === 'fr' ? 'Film HD' : 'HD Film'}
                  </span>
                )}
              </div>
              <span className="gallery-caption">
                <span>{caption}</span>
                <small>{String(i + 1).padStart(2, '0')}</small>
              </span>
            </button>
          );
        })}
      </div>

      <Lightbox
        items={items}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
      />
    </section>
  );
}
