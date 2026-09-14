import type { Metadata } from 'next';
import { VillasClient } from '@/components/villas-client';
export const metadata:Metadata={title:'Les villas',description:'Explorez les intérieurs et les plans des villas de 422 m². Comparez les configurations salon ou chambre avec salle de bain au rez-de-chaussée.'};
export default function Villas(){return <VillasClient />;}
