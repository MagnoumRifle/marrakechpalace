import media from './media.json';

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  altFr?: string;
  altEn?: string;
  category: string;
  width: number;
  height: number;
  video?: string;
  plan?: boolean;
};

// Rich, bilingual architectural descriptions
const descriptions: Record<string, { fr: string; en: string }> = {
  'exterieurs-v2day': {
    fr: 'Façade contemporaine & bassin de nage privé',
    en: 'Contemporary Facade & Private Swimming Pool',
  },
  'exterieurs-v1day': {
    fr: 'Perspective sur la villa & jardin paysager',
    en: 'Perspective over the Villa & Landscaped Garden',
  },
  'exterieurs-v2night': {
    fr: 'La villa à la nuit tombée · Éclairage architectural',
    en: 'The Villa at Dusk · Architectural Illumination',
  },
  'exterieurs-v1night': {
    fr: 'Ambiance nocturne sur la piscine & les terrasses',
    en: 'Night Ambiance over the Pool & Terraces',
  },
  'rdc-salon-2-v1': {
    fr: 'Le Grand Salon de réception · Double hauteur & lumière',
    en: 'Grand Reception Living Room · Double-Height Ceilings',
  },
  'rdc-salon-2-v2': {
    fr: "Salon d'apparat ouvert sur le jardin",
    en: 'State Living Room opening onto the Garden',
  },
  'rdc-salon-2-v3': {
    fr: 'Baies vitrées panoramiques & lumière naturelle',
    en: 'Floor-to-Ceiling Windows & Natural Sunlight',
  },
  'rdc-salon-1-v1': {
    fr: "Salon contemporain · Mobilier d'architecte",
    en: 'Contemporary Lounge · Curated Architecture',
  },
  'rdc-salon-1-v2': {
    fr: 'Espace séjour intimiste & finitions chaleureuses',
    en: 'Intimate Living Space & Warm Refined Finishes',
  },
  'rdc-kitchen-1-v1': {
    fr: 'Cuisine de réception & grand îlot en marbre',
    en: 'Gourmet Kitchen & Marble Island',
  },
  'rdc-kitchen-1-v2': {
    fr: 'Salle à manger contemporaine baignée de soleil',
    en: 'Contemporary Sun-Drenched Dining Area',
  },
  'rdc-kitchen-1-v3': {
    fr: 'Lignes pures et menuiseries sur mesure',
    en: 'Clean Architectural Lines & Custom Cabinetry',
  },
  'rdc-hall-1-v2': {
    fr: "Vestibule d'honneur & perspective traversante",
    en: 'Grand Entrance Foyer & Through-Light Vista',
  },
  'rdc-hall-1-v1': {
    fr: "Galerie d'entrée rez-de-chaussée",
    en: 'Ground Floor Entrance Gallery',
  },
  'rdc-hall-1-v3': {
    fr: "Écrin d'accueil et lumière zénithale",
    en: 'Welcoming Hallway & Ambient Overhead Light',
  },
  'rdc-stairs-1-v1': {
    fr: 'Escalier sculptural en pierre et garde-corps verre',
    en: 'Sculptural Stone Staircase with Glass Balustrade',
  },
  'etage-stairs-v1-2': {
    fr: "Arrivée sur la coursive du premier étage",
    en: 'First Floor Landing & Open Gallery Walkway',
  },
  'etage-hall-v1-2': {
    fr: "Salon privé de l'étage & espace de lecture",
    en: 'First Floor Private Lounge & Library Space',
  },
  'etage-hall-v2': {
    fr: 'Galerie de distribution lumineuse vers les suites',
    en: 'Sunlit Gallery leading to Private Suites',
  },
  'etage-bedroom-1-v1': {
    fr: 'Suite Master · Vue panoramique sur le domaine',
    en: 'Master Suite · Panoramic Estate Views',
  },
  'etage-bedroom-1-v2-2': {
    fr: 'Suite Master · Espace nuit feutré & matières nobles',
    en: 'Master Suite · Peaceful Bedroom & Noble Textiles',
  },
  'etage-dressingroom-1-v1-2': {
    fr: 'Dressing sur-mesure en chêne teinté',
    en: 'Custom Dressing Room & Integrated Wardrobes',
  },
  'etage-bathroom-1-v1': {
    fr: 'Salle de bain Master en marbre & double vasque',
    en: 'Master Marble Bathroom & Double Vanity',
  },
  'etage-bedroom-2-v1-2': {
    fr: 'Deuxième Suite · Confort feutré & tons naturels',
    en: 'Second Bedroom Suite · Natural Tones & Comfort',
  },
  'etage-bathroom-2-v1': {
    fr: "Salle d'eau contemporaine & douche à l'italienne",
    en: 'Contemporary Bathroom & Walk-in Rain Shower',
  },
  'etage-bedroom-3-v1-2': {
    fr: 'Troisième Suite · Accès terrasse privative',
    en: 'Third Suite · Private Terrace Access',
  },
  'etage-bedroom-3-v2': {
    fr: 'Troisième Suite · Lumière douce & volumes apaisants',
    en: 'Third Suite · Soft Light & Peaceful Volumes',
  },
  'etage-bedroom-4-v2-2': {
    fr: "Suite d'invités · Lignes épurées",
    en: 'Guest Suite · Minimalist Serenity',
  },
  'etage-bedroom-4-v3-2': {
    fr: "Suite d'invités · Perspective & lumière matinale",
    en: 'Guest Suite · Morning Light Perspective',
  },
  'rdc-bedroom-1v1': {
    fr: 'Suite rez-de-chaussée (Configuration optionnelle)',
    en: 'Ground Floor Guest Suite (Optional Configuration)',
  },
  'rdc-bathroom-1-v1': {
    fr: 'Salle de bain rez-de-chaussée',
    en: 'Ground Floor Full Bathroom',
  },
  'etage-terrace-1-v1': {
    fr: "Terrasse solarium & vue panoramique sur l'Atlas",
    en: 'Upper Solarium Terrace & Atlas Mountain Panorama',
  },
};

// Carefully curated walkthrough order
const orderedIds = [
  'exterieurs-v2day',
  'exterieurs-v1day',
  'exterieurs-v2night',
  'exterieurs-v1night',
  'rdc-salon-2-v1',
  'rdc-salon-2-v2',
  'rdc-salon-2-v3',
  'rdc-salon-1-v1',
  'rdc-salon-1-v2',
  'rdc-kitchen-1-v1',
  'rdc-kitchen-1-v2',
  'rdc-kitchen-1-v3',
  'rdc-hall-1-v2',
  'rdc-hall-1-v1',
  'rdc-hall-1-v3',
  'rdc-stairs-1-v1',
  'etage-stairs-v1-2',
  'etage-hall-v1-2',
  'etage-hall-v2',
  'etage-bedroom-1-v1',
  'etage-bedroom-1-v2-2',
  'etage-dressingroom-1-v1-2',
  'etage-bathroom-1-v1',
  'etage-bedroom-2-v1-2',
  'etage-bathroom-2-v1',
  'etage-bedroom-3-v1-2',
  'etage-bedroom-3-v2',
  'etage-bedroom-4-v2-2',
  'etage-bedroom-4-v3-2',
  'rdc-bedroom-1v1',
  'rdc-bathroom-1-v1',
  'etage-terrace-1-v1',
];

const excludedGalleryIds = new Set(['rdc-salon-2-v1', 'rdc-stairs-1-v1', 'etage-hall-v2']);

export const gallery: GalleryItem[] = media
  .filter(x => x.category !== 'plans' && !excludedGalleryIds.has(x.id))
  .map(x => {
    const desc = descriptions[x.id] || { fr: x.original, en: x.original };
    return {
      ...x,
      alt: desc.fr,
      altFr: desc.fr,
      altEn: desc.en,
    };
  })
  .sort((a, b) => {
    const ai = orderedIds.indexOf(a.id);
    const bi = orderedIds.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

// Single film for backward compatibility
export const film: GalleryItem = {
  id: 'film-hero',
  src: '/media/exterieurs-v2day.png',
  alt: 'Le film signature de Marrakech Palace',
  altFr: 'Le film signature de Marrakech Palace',
  altEn: 'The Signature Film of Marrakech Palace',
  category: 'films',
  width: 1672,
  height: 941,
  video: '/media/hero.mp4',
};

// Full collection of 10 cinematic films
export const films: GalleryItem[] = [
  {
    id: 'film-hero',
    src: '/media/exterieurs-v2day.png',
    alt: 'Film architectural signature de Marrakech Palace',
    altFr: 'Film architectural signature de Marrakech Palace',
    altEn: 'Signature Architectural Film of Marrakech Palace',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/hero.mp4',
  },
  {
    id: 'film-domaine',
    src: '/media/exterieurs-v1day.png',
    alt: 'Le calme pour adresse · Film du domaine',
    altFr: 'Le calme pour adresse · Film du domaine',
    altEn: 'Tranquility as Your Address · Estate Film',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/cttd.mp4',
  },
  {
    id: 'film-nuit',
    src: '/media/exterieurs-v2night.png',
    alt: 'Nuit étoilée sur Marrakech Palace',
    altFr: 'Nuit étoilée sur Marrakech Palace',
    altEn: 'Starry Night over Marrakech Palace',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/magnific_smooth-movement-lock-geom_4R07ieG9Aa.mp4',
  },
  {
    id: 'film-salon',
    src: '/media/video-interior-salon-thumb.png',
    alt: 'Chambre 1er étage · Vue apaisante & lumière naturelle',
    altFr: 'Chambre 1er étage · Vue apaisante & lumière naturelle',
    altEn: '1st Floor Bedroom · Serene Atmosphere & Natural Light',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-salon.mp4',
  },
  {
    id: 'film-living',
    src: '/media/rdc-salon-1-v1.png',
    alt: 'Séjour contemporain & vue sur jardin',
    altFr: 'Séjour contemporain & vue sur jardin',
    altEn: 'Contemporary Living Room & Garden Views',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-living.mp4',
  },
  {
    id: 'film-dining',
    src: '/media/rdc-kitchen-1-v2.png',
    alt: 'Salle à manger baignée de soleil',
    altFr: 'Salle à manger baignée de soleil',
    altEn: 'Sunlight Moving across Dining Table',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-dining.mp4',
  },
  {
    id: 'film-kitchen',
    src: '/media/rdc-kitchen-1-v1.png',
    alt: 'Cuisine moderne & îlot de réception en marbre',
    altFr: 'Cuisine moderne & îlot de réception en marbre',
    altEn: 'Modern Kitchen & Marble Reception Island',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-kitchen.mp4',
  },
  {
    id: 'film-bedroom',
    src: '/media/etage-bedroom-1-v1.png',
    alt: 'Suite parentale & atmosphère feutrée',
    altFr: 'Suite parentale & atmosphère feutrée',
    altEn: 'Master Suite & Peaceful Atmosphere',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-bedroom.mp4',
  },
  {
    id: 'film-bathroom',
    src: '/media/etage-bathroom-1-v1.png',
    alt: 'Salle de bain d’exception en marbre',
    altFr: 'Salle de bain d’exception en marbre',
    altEn: 'Luxury Architectural Marble Bathroom',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-bathroom.mp4',
  },
  {
    id: 'film-terrace',
    src: '/media/etage-terrace-1-v1.png',
    alt: 'Terrasse solarium & panorama sur l’Atlas',
    altFr: 'Terrasse solarium & panorama sur l’Atlas',
    altEn: 'Solarium Terrace & Atlas Mountain Panorama',
    category: 'films',
    width: 1920,
    height: 1080,
    video: '/media/video-interior-terrace.mp4',
  },
];

export const plans: Record<string, GalleryItem> = {
  salon: {
    id: 'plan-salon',
    src: '/media/plans-rdc2.png',
    alt: 'Rez-de-chaussée — Configuration Grand Salon',
    altFr: 'Rez-de-chaussée — Configuration Grand Salon',
    altEn: 'Ground Floor — Grand Salon Layout',
    category: 'plans',
    width: 1254,
    height: 1254,
    plan: true,
  },
  chambre: {
    id: 'plan-chambre',
    src: '/media/plans-rdc1.png',
    alt: 'Rez-de-chaussée — Option Suite d’invités',
    altFr: 'Rez-de-chaussée — Option Suite d’invités',
    altEn: 'Ground Floor — Guest Suite Option',
    category: 'plans',
    width: 1254,
    height: 1254,
    plan: true,
  },
  etage: {
    id: 'plan-etage',
    src: '/media/plans-1et.png',
    alt: 'Plan du Premier Étage — 4 Suites & Terrasses',
    altFr: 'Plan du Premier Étage — 4 Suites & Terrasses',
    altEn: 'First Floor Plan — 4 Suites & Terraces',
    category: 'plans',
    width: 1254,
    height: 1254,
    plan: true,
  },
};

export const plansList: GalleryItem[] = [
  plans.salon,
  plans.chambre,
  plans.etage,
];
