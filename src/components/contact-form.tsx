'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';

export function ContactForm() {
  const query = useSearchParams();
  const variant = query.get('configuration');
  const [prepared, setPrepared] = useState<string | null>(null);
  const { t, lang } = useLanguage();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    if (!name || !contact) return;
    const message = String(data.get('message') || '').trim();

    const text =
      lang === 'fr'
        ? `Bonjour, je m’appelle ${name}. Je souhaite organiser une visite de Marrakech Palace.\nMon contact : ${contact}.${
            variant === 'chambre'
              ? '\nJe suis intéressé(e) par l’option chambre + salle de bain au rez-de-chaussée.'
              : variant === 'salon'
              ? '\nJe suis intéressé(e) par la configuration salon au rez-de-chaussée.'
              : ''
          }${message ? '\n\n' + message : ''}`
        : `Hello, my name is ${name}. I would like to schedule a private visit to Marrakech Palace.\nMy contact: ${contact}.${
            variant === 'chambre'
              ? '\nI am interested in the ground floor bedroom + ensuite option.'
              : variant === 'salon'
              ? '\nI am interested in the expanded salon configuration.'
              : ''
          }${message ? '\n\n' + message : ''}`;

    setPrepared(text);
  }

  return (
    <form className="contact-form" onSubmit={submit} onChange={() => setPrepared(null)}>
      <p className="eyebrow">{t.contact.eyebrow}</p>
      <h2>
        {t.contact.chatTitle} <em>{t.contact.chatTitleHighlight}</em>
      </h2>

      {variant && ['salon', 'chambre'].includes(variant) && (
        <p className="configuration-note">
          {lang === 'fr' ? 'Votre sélection : ' : 'Your selected layout: '}
          {variant === 'chambre'
            ? lang === 'fr'
              ? 'Chambre + salle de bain'
              : 'Bedroom + ensuite bathroom'
            : lang === 'fr'
            ? 'Configuration salon'
            : 'Expanded salon'}
        </p>
      )}

      <label htmlFor="name">
        {t.contact.nameLabel}
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder={t.contact.namePlaceholder}
          pattern=".*\S.*"
        />
      </label>

      <label htmlFor="contact">
        {lang === 'fr' ? 'E-mail ou téléphone' : 'Email or phone'}
        <input
          id="contact"
          name="contact"
          required
          maxLength={150}
          placeholder={lang === 'fr' ? 'Pour vous recontacter' : 'Your preferred contact'}
          pattern=".*\S.*"
        />
      </label>

      <label htmlFor="message">
        {t.contact.messageLabel} <span>({lang === 'fr' ? 'facultatif' : 'optional'})</span>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1500}
          placeholder={t.contact.messagePlaceholder}
        />
      </label>

      <p className="form-privacy">{t.contact.privacyNotice}</p>

      {prepared ? (
        <div className="prepared-message" role="status">
          <p>{lang === 'fr' ? 'Votre demande est prête.' : 'Your inquiry is ready.'}</p>
          <a
            href={whatsappLink(prepared)}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            <MessageCircle size={18} />{' '}
            {lang === 'fr' ? 'Ouvrir dans WhatsApp' : 'Open in WhatsApp'}{' '}
            <ArrowUpRight size={16} />
          </a>
          <small>
            {lang === 'fr'
              ? 'Le message sera envoyé lorsque vous le confirmerez dans WhatsApp.'
              : 'The message will be sent once you confirm it in WhatsApp.'}
          </small>
        </div>
      ) : (
        <button className="button" type="submit">
          {t.contact.sendButton} <ArrowUpRight size={17} />
        </button>
      )}
    </form>
  );
}
