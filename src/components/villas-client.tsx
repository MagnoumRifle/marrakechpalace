'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PageIntro, VisitCTA, TextLink } from '@/components/shared';
import { Explorer } from '@/components/explorer';
import { useLanguage } from '@/lib/i18n';

const interiorAtmospheres = [
  {
    id: 'chambre-etage',
    labelFr: 'Chambre 1er étage',
    labelEn: '1st Floor Bedroom',
    levelFr: 'Premier étage',
    levelEn: 'First Floor',
    descFr: 'Lumière feutrée, calme préservé et vue sur le jardin',
    descEn: 'Soft daylight, quiet privacy and serene garden views',
    video: '/media/video-interior-salon.mp4',
  },
  {
    id: 'dining',
    labelFr: 'Salle à Manger',
    labelEn: 'Dining Room',
    levelFr: 'Rez-de-chaussée',
    levelEn: 'Ground Floor',
    descFr: 'Atmosphère lumineuse et conviviale pour recevoir',
    descEn: 'Sunlit and convivial atmosphere designed for entertaining',
    video: '/media/video-interior-dining.mp4',
  },
  {
    id: 'bedroom',
    labelFr: 'Suite Master',
    labelEn: 'Master Suite',
    levelFr: 'Premier étage',
    levelEn: 'First Floor',
    descFr: 'Cocon feutré, matières naturelles et vue panoramique',
    descEn: 'Peaceful cocoon, natural textiles and panoramic views',
    video: '/media/video-interior-bedroom.mp4',
  },
  {
    id: 'bathroom',
    labelFr: 'Bain de Marbre',
    labelEn: 'Marble Bath',
    levelFr: 'Premier étage',
    levelEn: 'First Floor',
    descFr: 'Sanctuaire minéral d’exception et finitions précieuses',
    descEn: 'Architectural mineral sanctuary and precious finishes',
    video: '/media/video-interior-bathroom.mp4',
  },
  {
    id: 'kitchen',
    labelFr: 'Cuisine Contemporaine',
    labelEn: 'Gourmet Kitchen',
    levelFr: 'Rez-de-chaussée',
    levelEn: 'Ground Floor',
    descFr: 'Îlot de réception en marbre et menuiseries épurées',
    descEn: 'Marble reception island and bespoke minimalist cabinetry',
    video: '/media/video-interior-kitchen.mp4',
  },
  {
    id: 'double-salon',
    labelFr: 'Grand Double Salon',
    labelEn: 'Grand Double Living Room',
    levelFr: 'Rez-de-chaussée',
    levelEn: 'Ground Floor',
    descFr: 'Vaste espace de réception traversant ouvert sur la terrasse et la piscine',
    descEn: 'Expansive through-light reception opening onto the terrace and pool',
    video: '/media/video-interior-terrace.mp4',
  },
];

export function VillasClient() {
  const { t, lang } = useLanguage();
  const [activeAtmosphere, setActiveAtmosphere] = useState(interiorAtmospheres[0]);

  return (
    <>
      <PageIntro
        eyebrow={t.villas.eyebrow}
        title={
          <>
            {t.villas.title1} <em>{t.villas.titleHighlight}</em>
          </>
        }
      >
        {t.villas.subtitle}
      </PageIntro>

      {/* Stat line with numeric values: 422m² total, 204m² RDC, 218m² étage */}
      <div className="container villa-statline">
        <span>
          <strong>422 m²</strong> {t.villas.statTotal}
        </span>
        <span>
          <strong>204 m²</strong> {t.villas.statRdc}
        </span>
        <span>
          <strong>218 m²</strong> {t.villas.statEtage}
        </span>
      </div>

      <Explorer />

      {/* "À chaque niveau, son atmosphère" with multiple looping videos */}
      <section className="section container atmosphere-section">
        <div className="split atmosphere-split">
          <div className="editorial-copy">
            <p className="eyebrow">{t.villas.interiorsEyebrow}</p>
            <h2>
              {t.villas.interiorsTitle1}
              <br />
              {t.villas.interiorsTitle2} <em>{t.villas.interiorsTitleHighlight}</em>
            </h2>
            <p>{t.villas.interiorsText}</p>

            {/* Atmosphere selector pills */}
            <div className="atmosphere-pills" role="tablist" aria-label="Choisir une atmosphère">
              {interiorAtmospheres.map(atm => {
                const isSelected = atm.id === activeAtmosphere.id;
                const label = lang === 'fr' ? atm.labelFr : atm.labelEn;
                return (
                  <button
                    key={atm.id}
                    role="tab"
                    aria-selected={isSelected}
                    className={`atmosphere-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveAtmosphere(atm)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="atmosphere-active-info">
              <span className="atmosphere-level-tag">
                {lang === 'fr' ? activeAtmosphere.levelFr : activeAtmosphere.levelEn}
              </span>
              <p className="atmosphere-active-desc">
                {lang === 'fr' ? activeAtmosphere.descFr : activeAtmosphere.descEn}
              </p>
            </div>

            <TextLink href="/galerie">{t.villas.interiorsLink}</TextLink>
          </div>

          <div className="atmosphere-featured-video-container">
            <video
              key={activeAtmosphere.video}
              className="section-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={
                lang === 'fr'
                  ? `${activeAtmosphere.labelFr} — ${activeAtmosphere.descFr}`
                  : `${activeAtmosphere.labelEn} — ${activeAtmosphere.descEn}`
              }
            >
              <source src={activeAtmosphere.video} type="video/mp4" />
            </video>
            <div className="atmosphere-video-badge">
              <span className="pulse-dot" />
              <span>
                {lang === 'fr' ? activeAtmosphere.labelFr : activeAtmosphere.labelEn} ·{' '}
                {lang === 'fr' ? activeAtmosphere.levelFr : activeAtmosphere.levelEn}
              </span>
            </div>
          </div>
        </div>
      </section>

      <VisitCTA />
    </>
  );
}
