import type { Metadata } from 'next';
import { LocationClient } from '@/components/location-client';

export const metadata: Metadata = {
  title: 'Localisation',
  description:
    'Retrouvez Marrakech Palace à Ouled Hassoune, Marrakech. Consultez la carte et préparez votre itinéraire pour visiter le domaine.',
};

export default function Location() {
  return <LocationClient />;
}
