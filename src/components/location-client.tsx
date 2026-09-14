'use client';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PageIntro, Photo, VisitCTA, TextLink } from '@/components/shared';
import { LocationMap } from '@/components/location-map';
import { site } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';

export function LocationClient() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageIntro
        eyebrow={t.location.eyebrow}
        title={
          <>
            {t.location.title1} <em>{t.location.titleHighlight}</em>
          </>
        }
      >
        {t.location.subtitle}
      </PageIntro>

      <div className="container location-banner">
        <Photo
          src="exterieurs-v2day"
          alt={
            lang === 'fr'
              ? 'Jardin privatif et piscine de la villa'
              : 'Private landscaped garden and pool of the villa'
          }
          priority
          sizes="100vw"
        />
      </div>

      {/* Editorial & Travel Times Section from Brochure */}
      <section className="container location-editorial-section">
        <div className="location-editorial-header">
          <h2 className="location-editorial-title the-seasons">
            {t.location.overviewTitle}
          </h2>
          <div className="location-editorial-rule" />
        </div>

        <div className="location-editorial-text">
          <p>{t.location.p1}</p>
          <p>{t.location.p2}</p>
        </div>

        <div className="location-times-grid">
          {/* 39 MIN - Aéroport */}
          <div className="location-time-card">
            <div className="time-number-row">
              <span className="time-number the-seasons">{t.location.time1Val}</span>
              <span className="time-unit the-seasons">{t.location.time1Unit}</span>
            </div>
            <p className="time-label">{t.location.time1Label}</p>
            <div className="time-icon-wrapper" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </div>

          {/* 28 MIN - Centre-ville */}
          <div className="location-time-card">
            <div className="time-number-row">
              <span className="time-number the-seasons">{t.location.time2Val}</span>
              <span className="time-unit the-seasons">{t.location.time2Unit}</span>
            </div>
            <p className="time-label">{t.location.time2Label}</p>
            <div className="time-icon-wrapper" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                <path d="M2.5 19.5l6-2 5 2 7.5-2.5v2.5l-7.5 2.5-5-2-6 2v-2.5z" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* 33 MIN - Jemaa El-Fna */}
          <div className="location-time-card">
            <div className="time-number-row">
              <span className="time-number the-seasons">{t.location.time3Val}</span>
              <span className="time-unit the-seasons">{t.location.time3Unit}</span>
            </div>
            <p className="time-label">{t.location.time3Label}</p>
            <div className="time-icon-wrapper" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 32 32" fill="currentColor">
                <path d="M20 2h-2v2h-1v4h4V4h-1V2zm1 7h-4l-.5 2H22l-.5-2zm.8 3H16.2L16 28h8l-.2-16zM18 15h4v3h-4v-3zm0 5h4v3h-4v-3z" />
                <path d="M6 18c0-3.5 3-6 7-6v16H4v-5c0-1.5.5-3 2-5zm7-3c-2.5 0-4.5 1.5-4.8 4h9.6c-.3-2.5-2.3-4-4.8-4z" />
                <path d="M4 28h24v2H4z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <p className="eyebrow">{t.location.futureEyebrow}</p>
        <h2 className="the-seasons location-find-heading">
          {t.location.futureTitle1}{' '}
          <span className="the-seasons brand-highlight">
            {t.location.futureTitleHighlight}
          </span>
        </h2>

        <div className="location-layout">
          <LocationMap />
          <aside>
            <MapPin size={25} strokeWidth={1} />
            <h3>
              Ouled Hassoune
              <br />
              Marrakech
            </h3>
            <p>{t.location.leadText}</p>
            <a
              className="button"
              href={site.directions}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.location.directions} <ArrowUpRight size={16} />
            </a>
            <TextLink href="/contact">{t.location.planVisit}</TextLink>
          </aside>
        </div>
      </section>

      <section className="container split location-last">
        <Photo
          src="etage-terrace-1-v1"
          alt={
            lang === 'fr'
              ? 'Espace détente sur une terrasse privative'
              : 'Secluded relaxation lounge on private terrace'
          }
        />
        <div className="editorial-copy">
          <p className="eyebrow">{t.location.visitEyebrow}</p>
          <h2>
            {t.location.visitTitle1}
            <br />
            {t.location.visitTitle2} <em>{t.location.visitTitleHighlight}</em>
          </h2>
          <p>{t.location.visitText}</p>
        </div>
      </section>

      <VisitCTA />
    </>
  );
}
