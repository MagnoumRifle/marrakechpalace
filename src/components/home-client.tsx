'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from '@/components/hero';
import { Photo, Stats, TextLink, VisitCTA, DocumentsList } from '@/components/shared';
import { HomeVideos } from '@/components/home-videos';
import { InteractiveMasterplan } from './interactive-masterplan';
import { useLanguage } from '@/lib/i18n';

export function HomeClient() {
  const { t, lang } = useLanguage();

  return (
    <>
      <Hero />
      <Stats />

      {/* Domain intro */}
      <section id="le-domaine" className="section container split domain-intro">
        <div className="editorial-copy">
          <p className="eyebrow">
            <span className="the-seasons">Marrakech Palace</span> ·{' '}
            {lang === 'fr' ? 'Le domaine' : 'The Estate'}
          </p>
          <h2>
            {t.home.domainTitle1}
            <br />
            {t.home.domainTitle2} <em>{t.home.domainTitleHighlight}</em>
          </h2>
          <p>{t.home.domainText}</p>
          <TextLink href="/le-domaine">{t.home.domainLink}</TextLink>
        </div>
        <div className="image-composition">
          <Photo
            src="exterieurs-v1day"
            alt={
              lang === 'fr'
                ? 'Architecture contemporaine d’une villa Marrakech Palace'
                : 'Contemporary architecture of a Marrakech Palace villa'
            }
          />
          <span className="vertical-caption">{t.home.domainCaption}</span>
        </div>
      </section>

      {/* Masterplan band */}
      <section className="masterplan-band">
        <div className="container split masterplan-split">
          <InteractiveMasterplan />
          <div className="editorial-copy">
            <p className="eyebrow">{t.home.masterplanEyebrow}</p>
            <h2>
              {t.home.masterplanTitle1}
              <br />
              {t.home.masterplanTitle2} <em>{t.home.masterplanTitleHighlight}</em>
            </h2>
            <p>{t.home.masterplanText}</p>
            <TextLink href="/le-domaine#plan">{t.home.masterplanLink}</TextLink>
          </div>
        </div>
      </section>

      {/* Interior story */}
      <section className="section container interior-story">
        <div className="section-heading">
          <p className="eyebrow">{t.home.villasEyebrow}</p>
          <h2>
            {t.home.villasTitle1} <em>{t.home.villasTitleHighlight}</em>
          </h2>
          <p>
            {t.home.villasSubtitle1}
            <br />
            {t.home.villasSubtitle2}
          </p>
        </div>
        <Link href="/les-villas" className="feature-image-link">
          <Photo
            src="etage-hall-v1-2"
            alt={
              lang === 'fr'
                ? 'Salon lumineux au premier étage de la villa'
                : 'Sunlit living area on the first floor'
            }
            sizes="(max-width: 760px) 100vw, 90vw"
          />
          <span className="image-link-label">
            {t.home.villasExplore} <ArrowUpRight size={20} />
          </span>
        </Link>
        <div className="interior-caption">
          <span>{t.home.villasCaption}</span>
          <TextLink href="/les-villas">{t.home.villasLink}</TextLink>
        </div>
      </section>

      {/* Videos: Lifestyle (night sky) + Location preview (bathroom) */}
      <HomeVideos />

      {/* Documents preview */}
      <section className="documents-preview container">
        <p className="eyebrow">{t.home.documentsEyebrow}</p>
        <h2>
          {t.home.documentsTitle1} <em>{t.home.documentsTitleHighlight}</em>
        </h2>
        <DocumentsList />
      </section>

      <VisitCTA />
    </>
  );
}
