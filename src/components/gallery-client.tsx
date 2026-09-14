'use client';
import { PageIntro, VisitCTA } from '@/components/shared';
import { Gallery } from '@/components/gallery';
import { useLanguage } from '@/lib/i18n';

export function GalleryClient() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageIntro
        eyebrow={t.gallery.eyebrow}
        title={
          <>
            {t.gallery.title1} <em>{t.gallery.titleHighlight}</em>
          </>
        }
      >
        {lang === 'fr' ? (
          <>
            Photographies, plans et vidéos de{' '}
            <span className="the-seasons">Marrakech Palace</span>.
          </>
        ) : (
          <>
            Photographs, architectural plans and video captures of{' '}
            <span className="the-seasons">Marrakech Palace</span>.
          </>
        )}
      </PageIntro>
      <Gallery />
      <VisitCTA />
    </>
  );
}
