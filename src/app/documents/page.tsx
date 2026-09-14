import type { Metadata } from 'next';
import { DocumentsClient } from '@/components/documents-client';

export const metadata: Metadata = {
  title: 'Brochure et documents',
  description:
    'Consultez et téléchargez directement la brochure Marrakech Palace et le cahier des prestations (CPS) du projet.',
};

export default function Documents() {
  return <DocumentsClient />;
}
