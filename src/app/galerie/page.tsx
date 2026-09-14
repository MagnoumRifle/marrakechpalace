import type { Metadata } from 'next';
import { GalleryClient } from '@/components/gallery-client';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Parcourez les rendus extérieurs, les intérieurs du rez-de-chaussée et du premier étage, et le film de Marrakech Palace.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
