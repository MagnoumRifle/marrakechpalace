'use client';
import Image from 'next/image';
import { useEffect,useRef,useState } from 'react';
import { ChevronLeft,ChevronRight,Minus,Plus,X,Maximize2 } from 'lucide-react';
import type { GalleryItem } from '@/lib/gallery';

export function Lightbox({items,index,onClose,onIndex}:{items:GalleryItem[];index:number|null;onClose:()=>void;onIndex:(n:number)=>void}){
  const ref=useRef<HTMLDialogElement>(null);const [zoom,setZoom]=useState(false);
  const item=index===null?undefined:items[index];
  useEffect(()=>{const dialog=ref.current;if(index!==null && !dialog?.open)dialog?.showModal();if(index===null && dialog?.open)dialog.close();},[index]);
  function close(){setZoom(false);onClose();}
  function change(delta:number){if(index===null)return;setZoom(false);onIndex((index+delta+items.length)%items.length);}
  return <dialog ref={ref} className="lightbox" onCancel={close} onClose={close} aria-label={item?.alt||'Vue agrandie'} onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>{if((e.key==='ArrowRight'||e.key==='ArrowLeft') && !item?.video){e.preventDefault();change(e.key==='ArrowRight'?1:-1);}}}>
    {item&&<><div className="lightbox-top"><span className="eyebrow"><span className="the-seasons">Marrakech Palace</span> <span> / {String((index??0)+1).padStart(2,'0')} — {String(items.length).padStart(2,'0')}</span></span><div>{!item.video&&<button onClick={()=>setZoom(!zoom)} className="icon-button" aria-label={zoom?'Réduire l’image':'Zoomer dans l’image'}>{zoom?<Minus/>:<Plus/>}</button>}<button onClick={close} className="icon-button" aria-label="Fermer la vue agrandie"><X/></button></div></div><div className={`lightbox-stage ${zoom?'zoomed':''}`} key={item.id}>{item.video?<video src={item.video} controls playsInline preload="metadata" poster={item.src} aria-label={item.alt}/>:<div className={`lightbox-image ${item.plan?'is-plan':''}`}><Image src={item.src} alt={item.alt} fill sizes="100vw"/></div>}</div><div className="lightbox-bottom"><p>{item.alt}</p>{items.length>1&&<div><button onClick={()=>change(-1)} aria-label="Image précédente" className="icon-button"><ChevronLeft/></button><button onClick={()=>change(1)} aria-label="Image suivante" className="icon-button"><ChevronRight/></button></div>}</div></>}
  </dialog>;
}
export function ZoomImage({src,alt}:{src:string;alt:string}){
  const [index,setIndex]=useState<number|null>(null);
  const items:GalleryItem[]=[{id:'zoom',src,alt,category:'plans',width:1600,height:1400,plan:true}];
  return <><button className="zoom-image" onClick={()=>setIndex(0)} aria-label={`Agrandir : ${alt}`}><Image src={src} alt={alt} width={1600} height={1400} sizes="(max-width: 760px) 100vw, 60vw"/><span><Maximize2 size={16}/> Agrandir le plan</span></button><Lightbox items={items} index={index} onIndex={setIndex} onClose={()=>setIndex(null)}/></>;
}
