'use client';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';
import { useLanguage } from '@/lib/i18n';

export function LocationMap() {
  const { lang } = useLanguage();

  return (
    <div className="location-map">
      <iframe
        title="Marrakech Palace — localisation sur Google Maps"
        src="https://maps.google.com/maps?q=31.6550299,-7.8052779&z=12&output=embed"
        loading="eager"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a className="map-external" href={site.maps} target="_blank" rel="noopener noreferrer">
        {lang === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'} <ArrowUpRight size={15} />
      </a>
    </div>
  );
}
