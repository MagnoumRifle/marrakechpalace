export const site = {
  name: 'Marrakech Palace',
  description: 'Douze villas contemporaines à Ouled Hassoune, Marrakech. 422 m² de surface couverte, jardins et piscines privés dans un domaine fermé.',
  // Temporary sales number supplied by the owner. Change this one value before launch.
  whatsapp: '212631857034',
  phoneDisplay: '+212 631 857 034',
  maps: 'https://www.google.com/maps/search/?api=1&query=31.6550299,-7.8052779',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=31.6550299,-7.8052779',
  brochure: '/documents/marrakech-palace-brochure.pdf',
  cps: '/documents/marrakech-palace-cps.pdf',
};
export function whatsappLink(message = 'Bonjour, je souhaite en savoir plus sur les villas Marrakech Palace et organiser une visite.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const navigation = [
  { href: '/le-domaine', label: 'Le domaine' },
  { href: '/les-villas', label: 'Les villas' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/localisation', label: 'Localisation' },
  { href: '/documents', label: 'Documents' },
];
