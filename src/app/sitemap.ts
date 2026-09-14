import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap {const origin=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');if(!origin)return [];return ['','/le-domaine','/les-villas','/galerie','/localisation','/documents','/contact'].map(path=>({url:origin+path,changeFrequency:'monthly',priority:path?0.7:1}));}
