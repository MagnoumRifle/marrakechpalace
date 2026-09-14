'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery, film, plans } from '@/lib/gallery';
import { site } from '@/lib/site';
import { Lightbox } from './lightbox';
import { useLanguage } from '@/lib/i18n';

export function Explorer() {
  const [mode, setMode] = useState('interieurs');
  const [level, setLevel] = useState('rdc');
  const [variant, setVariant] = useState('salon');
  const [scene, setScene] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { t, lang } = useLanguage();

  const interiors = gallery.filter(
    x => x.category === level && (level !== 'rdc' || variant === 'chambre' || (!x.id.includes('bedroom') && !x.id.includes('bathroom')))
  );
  const items = mode === 'plans' ? [level === 'etage' ? plans.etage : plans[variant]] : mode === 'films' ? [film] : interiors;
  const activeIndex = Math.min(scene, items.length - 1);
  const active = items[activeIndex];

  function next(direction: number) {
    setScene((activeIndex + direction + items.length) % items.length);
  }

  const modeButtons = [
    ['interieurs', t.villas.modes.interieurs],
    ['plans', t.villas.modes.plans],
    ['films', t.villas.modes.films],
  ];

  const levelButtons = [
    ['rdc', t.villas.levels.rdc],
    ['etage', t.villas.levels.etage],
  ];

  return (
    <section id="explorer" className="explorer container">
      <div className="explorer-toolbar">
        <div className="segmented" role="group" aria-label="Mode d’exploration">
          {modeButtons.map(([id, label]) => (
            <button key={id} aria-pressed={mode === id} onClick={() => { setMode(id); setScene(0); }}>
              {label}
            </button>
          ))}
        </div>
        {mode !== 'films' && (
          <div className="level-switch" role="group" aria-label="Niveau de la villa">
            {levelButtons.map(([id, label]) => (
              <button key={id} aria-pressed={level === id} onClick={() => { setLevel(id); setScene(0); }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="explorer-grid">
        <div className="explorer-media-column">
          <div className={`explorer-stage ${mode === 'plans' ? 'plan-stage' : ''}`}>
            {mode === 'films' ? (
              <video key="film" controls playsInline preload="none" poster={film.src} aria-label="Film extérieur de la villa">
                <source src={film.video} type="video/mp4" />
              </video>
            ) : (
              <button
                className="explorer-image"
                onClick={() => setLightbox(activeIndex)}
                aria-label={active.alt}
              >
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 65vw"
                />
              </button>
            )}
            {items.length > 1 && (
              <div className="scene-arrows">
                <button onClick={() => next(-1)} aria-label="Vue précédente">
                  <ChevronLeft size={18} />
                </button>
                <span>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <button onClick={() => next(1)} aria-label="Vue suivante">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
          <p className="media-caption" aria-live="polite">
            {active.alt}
          </p>
          {mode === 'interieurs' && (
            <div className="thumbnails" aria-label="Choisir une pièce">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  className={activeIndex === i ? 'selected' : ''}
                  onClick={() => setScene(i)}
                  aria-label={item.alt + ` — vue ${i + 1}`}
                  aria-pressed={activeIndex === i}
                >
                  <Image src={item.src} alt="" width={120} height={80} sizes="100px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="villa-summary">
          <p className="eyebrow">{t.villas.eyebrow}</p>
          <h2>
            {mode === 'films' ? (
              lang === 'fr' ? <>Un lieu à<br /><em>ressentir.</em></> : <>A place to<br /><em>experience.</em></>
            ) : level === 'etage' ? (
              lang === 'fr' ? <>À l’étage,<br />votre <em>intimité.</em></> : <>Upstairs,<br />your <em>sanctuary.</em></>
            ) : variant === 'salon' ? (
              lang === 'fr' ? <>Le plaisir<br />de <em>recevoir.</em></> : <>The art of<br /><em>entertaining.</em></>
            ) : (
              lang === 'fr' ? <>Une chambre<br />de <em>plain-pied.</em></> : <>A ground-floor<br /><em>suite.</em></>
            )}
          </h2>
          <p>
            {mode === 'films'
              ? lang === 'fr'
                ? 'La villa, son jardin et sa piscine, dans un film pour vous projeter.'
                : 'The villa, its garden, and private pool, presented in motion.'
              : level === 'etage'
              ? lang === 'fr'
                ? 'Les chambres, les espaces privés et les terrasses dessinent un autre rythme, plus intime.'
                : 'Bedrooms, private lounges, and terraces cultivate stillness and seclusion.'
              : variant === 'salon'
              ? lang === 'fr'
                ? 'Des espaces de réception généreux, pensés pour se retrouver et prolonger les journées sur le jardin.'
                : 'Expansive reception living spaces crafted to gather and open out onto the sunlit garden.'
              : lang === 'fr'
              ? 'Le salon du rez-de-chaussée peut laisser place à une chambre supplémentaire avec sa salle de bain.'
              : 'The ground floor reception can be customized into an additional private bedroom with ensuite bathroom.'}
          </p>

          {level === 'rdc' && mode !== 'films' && (
            <div className="variant-field">
              <span>{t.villas.variantTitle}</span>
              <div role="group" aria-label={t.villas.variantTitle}>
                <button aria-pressed={variant === 'salon'} onClick={() => { setVariant('salon'); setScene(0); }}>
                  {t.villas.variants.salon}
                </button>
                <button aria-pressed={variant === 'chambre'} onClick={() => { setVariant('chambre'); setScene(0); }}>
                  {t.villas.variants.chambre}
                </button>
              </div>
              {variant === 'chambre' && <small>{t.villas.variantNote}</small>}
            </div>
          )}

          <dl className="villa-facts">
            <div>
              <dt>{t.villas.facts.coveredArea}</dt>
              <dd>422 m²</dd>
            </div>
            <div>
              <dt>{lang === 'fr' ? 'Rez-de-chaussée' : 'Ground floor'}</dt>
              <dd>204 m²</dd>
            </div>
            <div>
              <dt>{lang === 'fr' ? 'Premier étage' : 'First floor'}</dt>
              <dd>218 m²</dd>
            </div>
            <div>
              <dt>{t.villas.facts.outdoor}</dt>
              <dd>{t.villas.facts.outdoorValue}</dd>
            </div>
          </dl>

          <Link className="button" href={`/contact?configuration=${variant}`}>
            {t.villas.cta} <ArrowUpRight size={16} />
          </Link>
          <div className="summary-downloads">
            <a href={site.brochure} download>
              Brochure PDF
            </a>
            <a href={site.cps} download>
              CPS PDF
            </a>
          </div>
        </aside>
      </div>

      <Lightbox items={items} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
