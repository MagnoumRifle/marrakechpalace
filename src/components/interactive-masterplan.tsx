'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export interface VillaLot {
  num: number;
  lotSurface: number; // Surface du lot en m²
  groundSurface: number; // Surface bâti au sol en m²
  floorSurface: number; // Surface bâti à l'étage en m²
  totalCoveredSurface: number; // Totale surface couvert m²
  x: number; // percentage left
  y: number; // percentage top
}

export const villaLots: VillaLot[] = [
  { num: 1, lotSurface: 1502, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 70.0, y: 48.0 },
  { num: 2, lotSurface: 1429, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 58.33, y: 51.54 },
  { num: 3, lotSurface: 1414, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 47.92, y: 55.0 },
  { num: 4, lotSurface: 1423, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 42.92, y: 43.11 },
  { num: 5, lotSurface: 1903, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 15.42, y: 22.3 },
  { num: 6, lotSurface: 1527, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 17.92, y: 37.17 },
  { num: 7, lotSurface: 1512, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 20.0, y: 51.04 },
  { num: 8, lotSurface: 1525, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 21.25, y: 62.93 },
  { num: 9, lotSurface: 1603, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 20.0, y: 75.82 },
  { num: 10, lotSurface: 1601, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 35.42, y: 77.8 },
  { num: 11, lotSurface: 1515, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 49.17, y: 75.82 },
  { num: 12, lotSurface: 1753, groundSurface: 204, floorSurface: 218, totalCoveredSurface: 422, x: 60.83, y: 74.33 },
];

function formatNumber(num: number, lang: string): string {
  if (lang === 'fr') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return num.toLocaleString('en-US');
}

export function InteractiveMasterplan({ className = '' }: { className?: string }) {
  const { lang } = useLanguage();
  const [activeVilla, setActiveVilla] = useState<VillaLot | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`interactive-masterplan-wrapper ${className}`} ref={containerRef}>
      <div className="masterplan-stage">
        {/* Masterplan Base Image */}
        <Image
          src="/media/plan-domaine.webp"
          alt={
            lang === 'fr'
              ? 'Plan de masse interactif du domaine et ses 12 parcelles'
              : 'Interactive masterplan of the estate and its 12 plots'
          }
          width={1200}
          height={1009}
          className="masterplan-image"
          priority
        />

        {/* Hint */}
        <div className="masterplan-hint">
          <span>
            {lang === 'fr'
              ? 'Cliquez sur une villa pour découvrir ses contenances'
              : 'Click on a villa to explore plot details'}
          </span>
        </div>

        {/* 12 Interactive Hotspot Pins */}
        {villaLots.map(v => {
          const isSelected = activeVilla?.num === v.num;
          return (
            <button
              key={v.num}
              type="button"
              className={`villa-hotspot-pin ${isSelected ? 'is-active' : ''}`}
              style={{ left: `${v.x}%`, top: `${v.y}%` }}
              onClick={() => setActiveVilla(activeVilla?.num === v.num ? null : v)}
              aria-label={`${lang === 'fr' ? 'Villa' : 'Villa'} ${v.num} — ${formatNumber(
                v.lotSurface,
                lang
              )} m²`}
            >
              <span className="pin-pulse" aria-hidden="true" />
              <span className="pin-core">{v.num}</span>
            </button>
          );
        })}

        {/* Floating Info Card on Hover/Selection */}
        {activeVilla && (
          <div
            className={`villa-hover-card ${
              activeVilla.x > 50 ? 'position-left' : 'position-right'
            } ${activeVilla.y > 60 ? 'position-top' : 'position-bottom'}`}
            style={{
              left: `${activeVilla.x}%`,
              top: `${activeVilla.y}%`,
            }}
            role="dialog"
            aria-label={`Détails Villa ${activeVilla.num}`}
          >
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-lot-eyebrow">
                  {lang === 'fr' ? `LOT N° ${activeVilla.num}` : `PLOT N° ${activeVilla.num}`}
                </span>
                <h4 className="card-villa-title the-seasons">
                  Villa {String(activeVilla.num).padStart(2, '0')}
                </h4>
              </div>
              <button
                type="button"
                className="card-close-button"
                onClick={e => {
                  e.stopPropagation();
                  setActiveVilla(null);
                }}
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="card-body">
              {/* Primary Metric: Surface du lot */}
              <div className="card-primary-metric">
                <span className="metric-label">
                  {lang === 'fr' ? 'Surface du terrain' : 'Plot surface'}
                </span>
                <strong className="metric-value gold-text">
                  {formatNumber(activeVilla.lotSurface, lang)} m²
                </strong>
              </div>

              {/* Metric Breakdown Table */}
              <div className="card-metrics-grid">
                <div className="metric-cell">
                  <span className="metric-label">
                    {lang === 'fr' ? 'Surface couverte' : 'Covered area'}
                  </span>
                  <strong className="metric-value">
                    {formatNumber(activeVilla.totalCoveredSurface, lang)} m²
                  </strong>
                </div>
                <div className="metric-cell">
                  <span className="metric-label">
                    {lang === 'fr' ? 'Emprise au sol (RDC)' : 'Ground floor (GF)'}
                  </span>
                  <strong className="metric-value">
                    {formatNumber(activeVilla.groundSurface, lang)} m²
                  </strong>
                </div>
                <div className="metric-cell">
                  <span className="metric-label">
                    {lang === 'fr' ? 'Surface à l’étage' : 'First floor'}
                  </span>
                  <strong className="metric-value">
                    {formatNumber(activeVilla.floorSurface, lang)} m²
                  </strong>
                </div>
                <div className="metric-cell">
                  <span className="metric-label">
                    {lang === 'fr' ? 'Extérieurs' : 'Outdoor'}
                  </span>
                  <strong className="metric-value">
                    {lang === 'fr' ? 'Piscine & Jardin' : 'Pool & Garden'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <Link href="/les-villas" className="card-link">
                {lang === 'fr' ? 'Découvrir les plans' : 'Explore floorplans'}
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Touch Quick Selector Bar */}
      <div className="masterplan-selector-bar">
        <span className="selector-title">
          {lang === 'fr' ? 'Sélectionner une villa :' : 'Select a villa :'}
        </span>
        <div className="selector-pills">
          {villaLots.map(v => (
            <button
              key={v.num}
              type="button"
              className={`selector-pill ${activeVilla?.num === v.num ? 'is-active' : ''}`}
              onClick={() => setActiveVilla(activeVilla?.num === v.num ? null : v)}
            >
              N°{v.num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
