import type { Metadata } from 'next';
import { ContactClient } from '@/components/contact-client';

export const metadata: Metadata = {
  title: 'Contact et visite',
  description:
    'Échangez avec notre équipe et organisez votre visite de Marrakech Palace. Contact par WhatsApp ou téléphone.',
};

export default function Contact() {
  return <ContactClient />;
}
