import Link from 'next/link';
export default function NotFound(){return <section className="container not-found"><p className="eyebrow">404 · Page introuvable</p><h1>Retrouvons<br/>votre <em>horizon.</em></h1><p>Cette page n’existe pas ou a changé d’adresse.</p><Link href="/" className="button">Revenir à l’accueil</Link></section>;}
