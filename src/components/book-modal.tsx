'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export interface DocumentInfo {
  id: 'brochure' | 'cps';
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  totalPages: number;
  pdfPath: string;
  folder: string;
  pageWidth: number;
  pageHeight: number;
}

export const documentsData: Record<'brochure' | 'cps', DocumentInfo> = {
  brochure: {
    id: 'brochure',
    titleFr: 'Brochure officielle · Marrakech Palace',
    titleEn: 'Official Brochure · Marrakech Palace',
    subtitleFr: 'Le domaine, les villas et l’art de vivre',
    subtitleEn: 'The estate, villas and private living',
    totalPages: 14,
    pdfPath: '/documents/marrakech-palace-brochure.pdf',
    folder: '/documents/brochure',
    pageWidth: 840,
    pageHeight: 594,
  },
  cps: {
    id: 'cps',
    titleFr: 'Cahier des prestations (CPS) · Marrakech Palace',
    titleEn: 'Specifications (CPS) · Marrakech Palace',
    subtitleFr: 'Prestations architecturales et finitions de prestige',
    subtitleEn: 'Architectural specifications and luxury finishes',
    totalPages: 52,
    pdfPath: '/documents/marrakech-palace-cps.pdf',
    folder: '/documents/cps',
    pageWidth: 700,
    pageHeight: 588,
  },
};

interface BookModalProps {
  docId: 'brochure' | 'cps' | null;
  onClose: () => void;
}

export function BookModal({ docId, onClose }: BookModalProps) {
  const { lang } = useLanguage();
  const doc = docId ? documentsData[docId] : null;

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [, setIsLoaded] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const stageInnerRef = useRef<HTMLDivElement>(null);
  const pageFlipInstanceRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sound ref to avoid re-triggering flipbook useEffect on mute toggle
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Current page & zoom refs for transform updates
  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Initialize sound once
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/media/flip.mp3');
      audio.volume = 0.35;
      audio.preload = 'auto';
      audioRef.current = audio;
    }
  }, []);

  const playFlipSound = useCallback(() => {
    if (!soundEnabledRef.current || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch {
      // Audio play blocked or not ready
    }
  }, []);

  // Center the book container when closed (page 0 or last page) and apply zoom
  const updateStageTransform = useCallback((pageIndex: number, total: number, zoomLevel: number) => {
    if (!stageInnerRef.current) return;
    const isPortrait = window.innerWidth < 768;
    let translateX = 0;
    if (!isPortrait) {
      if (pageIndex === 0) {
        translateX = -25;
      } else if (pageIndex >= total - 1) {
        translateX = 25;
      }
    }
    stageInnerRef.current.style.transform = `translateX(${translateX}%) scale(${zoomLevel})`;
  }, []);

  // Update transform whenever zoom or page changes
  useEffect(() => {
    if (doc) {
      updateStageTransform(currentPage, doc.totalPages, zoom);
    }
  }, [doc, currentPage, zoom, updateStageTransform]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(Number((prev + 0.2).toFixed(1)), 1.8));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(Number((prev - 0.2).toFixed(1)), 1.0));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1.0);
  }, []);

  // Initialize StPageFlip (ONLY re-runs when `doc` changes!)
  useEffect(() => {
    if (!doc || !bookContainerRef.current) return;

    let isMounted = true;
    setIsLoaded(false);
    setCurrentPage(0);
    setZoom(1.0);
    setTotalPages(doc.totalPages);

    // Dynamically import PageFlip
    import('page-flip')
      .then(({ PageFlip }) => {
        if (!isMounted || !bookContainerRef.current) return;

        // Destroy any existing instance
        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch {
            // Ignore destruction error
          }
          pageFlipInstanceRef.current = null;
        }

        const isPortrait = window.innerWidth < 768;

        const flipBook = new PageFlip(bookContainerRef.current, {
          width: doc.pageWidth,
          height: doc.pageHeight,
          size: 'stretch',
          minWidth: 400,
          maxWidth: 1600,
          minHeight: 280,
          maxHeight: 1200,
          maxShadowOpacity: 0.6,
          showCover: true,
          drawShadow: true,
          flippingTime: 800,
          usePortrait: isPortrait,
          startZIndex: 1,
          autoSize: true,
          useMouseEvents: true,
          swipeDistance: 25,
          showPageCorners: true,
        });

        const pageElements = bookContainerRef.current.querySelectorAll('.st-page-item');
        if (pageElements.length > 0) {
          flipBook.loadFromHTML(pageElements as any);
        }

        flipBook.on('flip', (e: any) => {
          if (!isMounted) return;
          const newPageIndex = typeof e.data === 'number' ? e.data : 0;
          setCurrentPage(newPageIndex);
          updateStageTransform(newPageIndex, doc.totalPages, zoomRef.current);
          playFlipSound();
        });

        flipBook.on('init', () => {
          if (!isMounted) return;
          setIsLoaded(true);
          updateStageTransform(0, doc.totalPages, 1.0);
        });

        pageFlipInstanceRef.current = flipBook;
      })
      .catch((err) => {
        console.error('Failed to load StPageFlip:', err);
      });

    return () => {
      isMounted = false;
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch {
          // Ignore destruction error
        }
        pageFlipInstanceRef.current = null;
      }
    };
  }, [doc, playFlipSound, updateStageTransform]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (doc) {
        updateStageTransform(currentPageRef.current, doc.totalPages, zoomRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [doc, updateStageTransform]);

  // Flip navigation
  const handlePrev = useCallback(() => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipPrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipNext();
    }
  }, []);

  const handleScrubberChange = useCallback((pageIndex: number) => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.turnToPage(pageIndex);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!docId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        setSoundEnabled((prev) => !prev);
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docId, onClose, handleNext, handlePrev, handleZoomIn, handleZoomOut, handleResetZoom]);

  // Prevent background scroll
  useEffect(() => {
    if (docId) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [docId]);

  const toggleFullscreen = () => {
    if (!modalRef.current) return;
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!docId || !doc) return null;

  const title = lang === 'fr' ? doc.titleFr : doc.titleEn;
  const subtitle = lang === 'fr' ? doc.subtitleFr : doc.subtitleEn;

  // Format page label
  const formatPageLabel = () => {
    if (currentPage === 0) {
      return lang === 'fr' ? `Couverture · Page 1 / ${totalPages}` : `Cover · Page 1 / ${totalPages}`;
    }
    if (currentPage >= totalPages - 1) {
      return lang === 'fr'
        ? `Quatrième de couverture · ${totalPages} / ${totalPages}`
        : `Back cover · ${totalPages} / ${totalPages}`;
    }
    const leftPage = currentPage;
    const rightPage = Math.min(currentPage + 1, totalPages);
    return `Pages ${leftPage} – ${rightPage} / ${totalPages}`;
  };

  return (
    <div
      ref={modalRef}
      className="st-flipbook-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Top Luxury Toolbar */}
      <header className="st-flipbook-toolbar">
        <div className="st-flipbook-title-group">
          <span className="st-flipbook-star-badge" aria-hidden="true">
            <Sparkles size={14} />
          </span>
          <div className="st-flipbook-text-info">
            <h2 className="st-flipbook-title">{title}</h2>
            <p className="st-flipbook-subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="st-flipbook-actions">
          {/* Zoom Controls */}
          <div className="st-flipbook-zoom-group">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1.0}
              className="st-flipbook-tool-btn zoom-btn"
              title={lang === 'fr' ? 'Zoom arrière (-)' : 'Zoom out (-)'}
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="st-flipbook-zoom-badge"
              title={lang === 'fr' ? 'Réinitialiser le zoom (0)' : 'Reset zoom (0)'}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 1.8}
              className="st-flipbook-tool-btn zoom-btn"
              title={lang === 'fr' ? 'Zoom avant (+)' : 'Zoom in (+)'}
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Sound Toggle (Does NOT cause re-render of flipbook!) */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="st-flipbook-tool-btn"
            title={
              soundEnabled
                ? lang === 'fr'
                  ? 'Couper le son de papier (M)'
                  : 'Mute page sound (M)'
                : lang === 'fr'
                ? 'Activer le son de papier (M)'
                : 'Enable page sound (M)'
            }
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Direct PDF Download */}
          <a
            href={doc.pdfPath}
            download
            className="st-flipbook-tool-btn"
            title={lang === 'fr' ? 'Télécharger le PDF haute définition' : 'Download High-Res PDF'}
            aria-label="Download PDF"
          >
            <Download size={17} />
          </a>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="st-flipbook-tool-btn"
            title={
              isFullscreen
                ? lang === 'fr'
                  ? 'Quitter le plein écran (F)'
                  : 'Exit fullscreen (F)'
                : lang === 'fr'
                ? 'Plein écran (F)'
                : 'Fullscreen (F)'
            }
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>

          {/* Close Modal */}
          <button
            type="button"
            onClick={onClose}
            className="st-flipbook-close-btn"
            title={lang === 'fr' ? 'Fermer (Échap)' : 'Close (Esc)'}
            aria-label="Close flipbook"
          >
            <X size={19} />
          </button>
        </div>
      </header>

      {/* Main 3D Book Stage */}
      <main className="st-flipbook-stage-wrapper">
        {/* Soft Ambient Shadow at Book Base */}
        <div className="st-flipbook-ground-shadow" aria-hidden="true" />

        {/* Floating Luxury Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="st-flipbook-nav-arrow prev"
          aria-label={lang === 'fr' ? 'Page précédente' : 'Previous page'}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Centered Moving Stage Inner (Expanded for Large Readable Display + Zoom) */}
        <div ref={stageInnerRef} className="st-flipbook-stage-inner">
          <div ref={bookContainerRef} className="st-flipbook-instance">
            {/* Render all pages with hard covers and soft flexible interior */}
            {Array.from({ length: doc.totalPages }, (_, index) => {
              const pageNum = index + 1;
              const isCover = pageNum === 1;
              const isBackCover = pageNum === doc.totalPages;
              const density = isCover || isBackCover ? 'hard' : 'soft';

              return (
                <div
                  key={`page-${pageNum}`}
                  className={`st-page-item ${isCover ? '--cover-front' : ''} ${
                    isBackCover ? '--cover-back' : ''
                  }`}
                  data-density={density}
                >
                  <div className="st-page-inner-content">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${doc.folder}/page-${pageNum}.webp`}
                      alt={
                        isCover
                          ? lang === 'fr'
                            ? 'Première de couverture'
                            : 'Front Cover'
                          : isBackCover
                          ? lang === 'fr'
                            ? 'Quatrième de couverture'
                            : 'Back Cover'
                          : `Page ${pageNum}`
                      }
                      loading={pageNum <= 4 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Luxury Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="st-flipbook-nav-arrow next"
          aria-label={lang === 'fr' ? 'Page suivante' : 'Next page'}
        >
          <ChevronRight size={28} />
        </button>
      </main>

      {/* Bottom Floating Scrubber Bar */}
      <footer className="st-flipbook-bottom-bar">
        <span className="st-flipbook-page-badge">{formatPageLabel()}</span>

        <input
          type="range"
          min={0}
          max={totalPages - 1}
          value={currentPage}
          onChange={(e) => handleScrubberChange(parseInt(e.target.value, 10))}
          className="st-flipbook-scrubber"
          aria-label="Parcourir les pages"
        />

        <div className="st-flipbook-hint-badge">
          <span className="st-flipbook-hint-dot" />
          {lang === 'fr'
            ? 'Glisser les coins ou utiliser les flèches ← →'
            : 'Peel corners or use arrow keys ← →'}
        </div>
      </footer>
    </div>
  );
}
