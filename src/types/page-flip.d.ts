declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, options?: any);
    loadFromHTML(elements: NodeList | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    flip(page: number, corner?: 'top' | 'bottom'): void;
    turnToPage(page: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    on(event: string, callback: (e: any) => void): void;
    off(event: string): void;
    destroy(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): 'portrait' | 'landscape';
    update(): void;
  }
}
