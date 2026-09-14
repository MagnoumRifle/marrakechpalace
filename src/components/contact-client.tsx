'use client';
import { Suspense } from 'react';
import { ArrowUpRight, Calendar, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { PageIntro, Photo } from '@/components/shared';
import { ContactForm } from '@/components/contact-form';
import { LocationMap } from '@/components/location-map';
import { site, whatsappLink } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';

export function ContactClient() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageIntro
        eyebrow={t.contact.eyebrow}
        title={
          <>
            {t.contact.title1}
            <br />
            {t.contact.title2} <em>{t.contact.titleHighlight}</em>
          </>
        }
      >
        {lang === 'fr' ? (
          <>
            Échangeons sur votre projet et découvrons ensemble{' '}
            <span className="the-seasons">Marrakech Palace</span>.
          </>
        ) : (
          <>
            Let’s discuss your aspirations and explore{' '}
            <span className="the-seasons">Marrakech Palace</span> together.
          </>
        )}
      </PageIntro>

      <section className="container contact-layout">
        <div className="contact-photo">
          <Photo
            src="exterieurs-v1day"
            alt={
              lang === 'fr'
                ? 'Façade contemporaine et jardins de la villa Marrakech Palace'
                : 'Contemporary facade and private gardens of Villa Marrakech Palace'
            }
            priority
          />
          <p className="contact-photo-caption">{t.contact.addressSub}</p>
          <div className="contact-perks">
            <div className="contact-perk-item">
              <Calendar size={18} />
              <div>
                <strong>{lang === 'fr' ? 'Visites privées 7j/7' : 'Private visits 7 days a week'}</strong>
                <p>{lang === 'fr' ? 'Accueil personnalisé sur rendez-vous avec un conseiller dédié.' : 'Personalized private tour by appointment with a dedicated advisor.'}</p>
              </div>
            </div>
            <div className="contact-perk-item">
              <MapPin size={18} />
              <div>
                <strong>{lang === 'fr' ? 'Ouled Hassoune · Marrakech' : 'Ouled Hassoune · Marrakech'}</strong>
                <p>{lang === 'fr' ? 'À seulement 20 minutes du centre-ville, dans un cadre serein et préservé.' : 'Only 20 minutes from central Marrakech in a peaceful, protected sanctuary.'}</p>
              </div>
            </div>
            <div className="contact-perk-item">
              <ShieldCheck size={18} />
              <div>
                <strong>{lang === 'fr' ? 'Accompagnement confidentiel' : 'Confidential consultation'}</strong>
                <p>{lang === 'fr' ? 'Étude attentive de vos critères d’acquisition et de personnalisation.' : 'Attentive guidance tailored to your acquisition and personalization preferences.'}</p>
              </div>
            </div>
          </div>
        </div>
        <Suspense
          fallback={
            <p>{lang === 'fr' ? 'Chargement du formulaire…' : 'Loading form…'}</p>
          }
        >
          <ContactForm />
        </Suspense>
      </section>

      <section className="contact-direct container">
        <div>
          <p className="eyebrow">
            {lang === 'fr' ? 'Un premier échange' : 'A preliminary conversation'}
          </p>
          <h3>
            {t.contact.chatTitle} <em>{t.contact.chatTitleHighlight}</em>
          </h3>
        </div>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={23} />
          <span>
            <small>{t.contact.onWhatsapp}</small>
            {site.phoneDisplay}
          </span>
          <ArrowUpRight size={18} />
        </a>
        <a href={`tel:+${site.whatsapp}`}>
          <Phone size={22} />
          <span>
            <small>{t.contact.byPhone}</small>
            {site.phoneDisplay}
          </span>
          <ArrowUpRight size={18} />
        </a>
      </section>

      <section className="contact-location">
        <div className="container split">
          <div className="editorial-copy">
            <p className="eyebrow">{t.contact.findUs}</p>
            <h2>
              Ouled Hassoune.
              <br />
              <em>Marrakech.</em>
            </h2>
            <a
              className="button"
              href={site.directions}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.location.directions} <ArrowUpRight size={17} />
            </a>
          </div>
          <LocationMap />
        </div>
      </section>
    </>
  );
}
