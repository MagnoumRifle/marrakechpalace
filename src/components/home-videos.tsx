'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function HomeVideos() {
  const { t, lang } = useLanguage();

  return (
    <>
      {/* Lifestyle section — "Les jours s'étirent. Les instants restent." with magnific smooth movement video */}
      <section className="lifestyle">
        <video
          className="lifestyle-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={
            lang === 'fr'
              ? 'Villa Marrakech Palace dans son cadre de vie'
              : 'Marrakech Palace villa in its living sanctuary'
          }
        >
          <source src="/media/video-lifestyle.mp4" type="video/mp4" />
        </video>
        <div className="lifestyle-content container">
          <p className="eyebrow">
            {lang === 'fr'
              ? 'Votre jardin. Votre piscine. Votre rythme.'
              : 'Your garden. Your pool. Your rhythm.'}
          </p>
          <h2>
            {lang === 'fr' ? "Les jours s'étirent." : 'Days stretch gently.'}
            <br />
            {lang === 'fr' ? 'Les instants ' : 'Moments '}
            <em>{lang === 'fr' ? 'restent.' : 'endure.'}</em>
          </h2>
          <Link className="text-link light" href="/galerie">
            {lang === 'fr' ? 'Imaginez-vous ici' : 'Picture yourself here'}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* Location preview — "Le calme pour adresse." with widescreen cttd video */}
      <section className="section container split location-preview">
        <div className="editorial-copy">
          <p className="eyebrow">Ouled Hassoune · Marrakech</p>
          <h2>
            {lang === 'fr' ? 'Le calme' : 'Tranquility'}
            <br />
            {lang === 'fr' ? 'pour ' : 'as your '}
            <em>{lang === 'fr' ? 'adresse.' : 'address.'}</em>
          </h2>
          <p>
            {lang === 'fr'
              ? "À l'est de Marrakech, le domaine invite à profiter d'un quotidien plus ouvert, au rythme du jardin et des saisons."
              : 'East of Marrakech, the estate invites you to embrace an open, serene lifestyle tuned to the gentle rhythm of gardens and seasons.'}
          </p>
          <Link className="text-link" href="/localisation">
            {lang === 'fr' ? (
              <>
                Situer <span className="the-seasons">Marrakech Palace</span>
              </>
            ) : (
              <>
                Locate <span className="the-seasons">Marrakech Palace</span>
              </>
            )}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="section-video-container location-video-widescreen">
          <video
            className="section-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={
              lang === 'fr'
                ? 'Vue vidéo du domaine Marrakech Palace'
                : 'Video view of Marrakech Palace estate'
            }
          >
            <source src="/media/cttd.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
}
