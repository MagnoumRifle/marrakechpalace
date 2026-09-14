'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Download, ArrowUpRight } from 'lucide-react';
import { PageIntro, VisitCTA } from '@/components/shared';
import { BookModal } from '@/components/book-modal';
import { site } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';

export function DocumentsClient() {
  const { t, lang } = useLanguage();
  const [activeBook, setActiveBook] = useState<'brochure' | 'cps' | null>(null);

  return (
    <>
      <PageIntro
        eyebrow={t.documents.eyebrow}
        title={
          <>
            {t.documents.title1} <em>{t.documents.titleHighlight}</em>
          </>
        }
      >
        {lang === 'fr' ? (
          <>
            Retrouvez la brochure et le cahier des prestations de{' '}
            <span className="the-seasons">Marrakech Palace</span>.
          </>
        ) : (
          <>
            Access the official presentation brochure and architectural specifications for{' '}
            <span className="the-seasons">Marrakech Palace</span>.
          </>
        )}
      </PageIntro>

      <section className="container documents-page">
        {/* Document 01: Brochure */}
        <article className="document-card">
          <div
            className="document-cover"
            onClick={() => setActiveBook('brochure')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setActiveBook('brochure')}
            aria-label={`${t.documents.consult} : ${t.documents.brochureLabel}`}
          >
            <div className="document-cover-frame brochure-aspect">
              <Image
                src="/media/brochure-cover.webp"
                alt={
                  lang === 'fr'
                    ? 'Couverture de la brochure officielle Marrakech Palace'
                    : 'Official Marrakech Palace brochure cover'
                }
                width={1200}
                height={849}
                priority
              />
            </div>
          </div>
          <div>
            <p className="eyebrow">{t.documents.brochureLabel}</p>
            <h2>
              {lang === 'fr' ? 'L’esprit' : 'The spirit of'}
              <br />
              <span className="the-seasons brand-font-highlight">
                Marrakech Palace
              </span>
            </h2>
            <p>{t.documents.brochureText}</p>
            <small>PDF · 14 {t.documents.pages}</small>
          </div>
          <div className="document-buttons">
            <button
              type="button"
              className="button"
              onClick={() => setActiveBook('brochure')}
            >
              <BookOpen size={16} />
              {lang === 'fr' ? 'Feuilleter en 3D' : 'Open 3D Book'}
            </button>
            <a href={site.brochure} download className="text-link">
              {t.documents.brochureDownload} <Download size={16} />
            </a>
          </div>
        </article>

        {/* Document 02: CPS */}
        <article className="document-card">
          <div
            className="document-cover"
            onClick={() => setActiveBook('cps')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setActiveBook('cps')}
            aria-label={`${t.documents.consult} : ${t.documents.cpsLabel}`}
          >
            <div className="document-cover-frame cps-aspect">
              <Image
                src="/media/cps-cover.webp"
                alt={
                  lang === 'fr'
                    ? 'Couverture du cahier des prestations (CPS)'
                    : 'Architectural specifications (CPS) cover'
                }
                width={1200}
                height={1009}
              />
            </div>
          </div>
          <div>
            <p className="eyebrow">{t.documents.cpsLabel}</p>
            <h2>
              {t.documents.cpsTitle1}
              <br />
              {t.documents.cpsTitle2 && <>{t.documents.cpsTitle2} </>}
              <em>{t.documents.cpsTitleHighlight}</em>
            </h2>
            <p>{t.documents.cpsText}</p>
            <small>PDF · 52 {t.documents.pages}</small>
          </div>
          <div className="document-buttons">
            <button
              type="button"
              className="button"
              onClick={() => setActiveBook('cps')}
            >
              <BookOpen size={16} />
              {lang === 'fr' ? 'Feuilleter en 3D' : 'Open 3D Book'}
            </button>
            <a href={site.cps} download className="text-link">
              {t.documents.cpsDownload} <Download size={16} />
            </a>
          </div>
        </article>
      </section>

      {/* 3D Interactive Flipbook Modal */}
      <BookModal docId={activeBook} onClose={() => setActiveBook(null)} />

      <VisitCTA />
    </>
  );
}

