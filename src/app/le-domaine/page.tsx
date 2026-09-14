import type { Metadata } from 'next';
import { DomainClient } from '@/components/domain-client';

export const metadata: Metadata = {
  title: 'Le domaine',
  description:
    'Découvrez un domaine fermé de douze villas à Ouled Hassoune : jardins privés, allées paysagères et espaces de loisirs.',
};

export default function Domain() {
  return <DomainClient />;
}
