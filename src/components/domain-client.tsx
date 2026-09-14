'use client';
import { PageIntro, Photo, TextLink, VisitCTA } from '@/components/shared';
import { InteractiveMasterplan } from '@/components/interactive-masterplan';
import { useLanguage } from '@/lib/i18n';

export function DomainClient() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageIntro
        eyebrow={t.domain.eyebrow}
        title={
          <>
            {t.domain.title1}
            <br />
            {t.domain.title2} <em>{t.domain.titleHighlight}</em>
          </>
        }
      >
        {t.domain.subtitle}
      </PageIntro>

      <div className="container domain-banner">
        <Photo
          src="exterieurs-v2night"
          alt={
            lang === 'fr'
              ? 'Villa Marrakech Palace et piscine à la nuit tombée'
              : 'Marrakech Palace villa and pool at dusk'
          }
          priority
          sizes="100vw"
        />
      </div>

      <section id="plan" className="section container">
        <div className="section-heading">
          <p className="eyebrow">{t.domain.planEyebrow}</p>
          <h2>
            {t.domain.planTitle1}
            <br />
            {t.domain.planTitle2} <em>{t.domain.planTitleHighlight}</em>
          </h2>
          <p>
            {t.domain.planSubtitle1}
            <br />
            {t.domain.planSubtitle2}
          </p>
        </div>

        <div className="domain-plan">
          <InteractiveMasterplan />
          <div className="domain-highlights">
            <article>
              <span>01</span>
              <h3>
                {lang === 'fr' ? (
                  <>Douze villas<br />individuelles</>
                ) : (
                  <>Twelve individual<br />villas</>
                )}
              </h3>
              <p>{t.domain.card1Text}</p>
            </article>
            <article>
              <span>02</span>
              <h3>
                {lang === 'fr' ? (
                  <>Un jardin.<br />Une piscine.</>
                ) : (
                  <>A private garden.<br />A pool.</>
                )}
              </h3>
              <p>{t.domain.card2Text}</p>
            </article>
            <article>
              <span>03</span>
              <h3>
                {lang === 'fr' ? (
                  <>Un domaine<br />à accès contrôlé</>
                ) : (
                  <>A gated estate<br />with controlled access</>
                )}
              </h3>
              <p>{t.domain.card3Text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="domain-lifestyle">
        <div className="container">
          <div className="domain-lifestyle-top split">
            <div className="editorial-copy">
              <p className="eyebrow">{t.domain.lifestyleEyebrow}</p>
              <h2>
                {t.domain.lifestyleTitle1}
                <br />
                {t.domain.lifestyleTitle2} <em>{t.domain.lifestyleTitleHighlight}</em>
              </h2>
              <p>{t.domain.lifestyleText}</p>
              <div className="amenities">
                {t.domain.amenities.map(amenity => (
                  <span key={amenity}>{amenity}</span>
                ))}
              </div>
            </div>
            <div className="lifestyle-lead-photo">
              <Photo
                src="padel.png"
                alt={
                  lang === 'fr'
                    ? 'Terrain de padel vitré anti-bruit au sein du domaine'
                    : 'Acoustic-glazed padel court on the estate'
                }
              />
            </div>
          </div>

          {/* 4 Amenities Visual Cards Grid: Padel, Pétanque, Jeux Enfants, Supermarket */}
          <div className="lifestyle-amenities-grid">
            <div className="lifestyle-facility-card">
              <div className="facility-photo-wrapper">
                <Photo
                  src="padel.png"
                  alt={lang === 'fr' ? 'Terrain de padel vitré anti-bruit' : 'Acoustic-glazed padel tennis court'}
                />
                <span className="facility-badge">{lang === 'fr' ? '01 · Sport' : '01 · Sports'}</span>
              </div>
              <div className="facility-content">
                <h4>{lang === 'fr' ? 'Terrain de Padel' : 'Padel Tennis Court'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'Équipé de vitrages anti-bruit pour allier performance sportive et respect de la quiétude des résidents.'
                    : 'Fitted with acoustic glazing to combine athletic enjoyment with serene estate tranquility.'}
                </p>
              </div>
            </div>

            <div className="lifestyle-facility-card">
              <div className="facility-photo-wrapper">
                <Photo
                  src="petanque.png"
                  alt={lang === 'fr' ? 'Terrain de pétanque et multisport' : 'Pétanque and multisport field'}
                />
                <span className="facility-badge">{lang === 'fr' ? '02 · Convivialité' : '02 · Leisure'}</span>
              </div>
              <div className="facility-content">
                <h4>{lang === 'fr' ? 'Pétanque & Multisport' : 'Pétanque & Multisport'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'Un boulodrome ombragé et un terrain multisport pour partager des moments de détente entre voisins et amis.'
                    : 'A shaded pétanque alley and multisport ground to share leisurely moments with family and friends.'}
                </p>
              </div>
            </div>

            <div className="lifestyle-facility-card">
              <div className="facility-photo-wrapper">
                <Photo
                  src="jeux.png"
                  alt={lang === 'fr' ? 'Espace de jeux abrité sous tonnelle' : 'Children playground under protective pergola'}
                />
                <span className="facility-badge">{lang === 'fr' ? '03 · Famille' : '03 · Family'}</span>
              </div>
              <div className="facility-content">
                <h4>{lang === 'fr' ? 'Espace Jeux Enfants' : 'Children’s Playground'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'Un espace de jeux abrité sous une élégante tonnelle, sécurisé et pensé pour l’épanouissement des plus jeunes.'
                    : 'A dedicated play sanctuary sheltered under an architectural pergola, designed for safe family moments.'}
                </p>
              </div>
            </div>

            <div className="lifestyle-facility-card">
              <div className="facility-photo-wrapper">
                <Photo
                  src="supermarket.png"
                  alt={lang === 'fr' ? 'Mini-market et commodités au sein du domaine' : 'On-site mini-market and daily conveniences'}
                />
                <span className="facility-badge">{lang === 'fr' ? '04 · Quotidien' : '04 · Essentials'}</span>
              </div>
              <div className="facility-content">
                <h4>{lang === 'fr' ? 'Mini-Market Résidentiel' : 'Residential Mini-Market'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'Une supérette de proximité intégrée au domaine, assurant l’accès immédiat à tous vos achats essentiels.'
                    : 'An on-site gourmet convenience market providing immediate access to everyday provisions without leaving the estate.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container split">
        <Photo
          src="exterieurs-v1day"
          alt={
            lang === 'fr'
              ? 'Volumes contemporains et baies vitrées de la villa'
              : 'Contemporary architectural volumes and panoramic windows'
          }
        />
        <div className="editorial-copy">
          <p className="eyebrow">{t.domain.archiEyebrow}</p>
          <h2>
            {t.domain.archiTitle1}
            <br />
            {t.domain.archiTitle2} <em>{t.domain.archiTitleHighlight}</em>
          </h2>
          <p>{t.domain.archiText}</p>
          <TextLink href="/les-villas">{t.domain.archiLink}</TextLink>
        </div>
      </section>

      <VisitCTA />
    </>
  );
}
