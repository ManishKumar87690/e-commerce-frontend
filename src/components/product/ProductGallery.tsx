"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

interface ProductGalleryProps { images: string[]; productName: string; }

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
        <Image src={images[activeIndex]} alt={`${productName} - image ${activeIndex + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover cursor-zoom-in" onClick={() => setLightboxOpen(true)} priority />
        <Button variant="outline" size="icon" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80" onClick={() => setLightboxOpen(true)}><ZoomIn className="h-4 w-4" /></Button>
        {images.length > 1 && (
          <>
            <Button variant="outline" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button key={index} onClick={() => setActiveIndex(index)} className={cn("relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors", index === activeIndex ? "border-primary" : "border-transparent hover:border-muted-foreground/30")}>
              <Image src={image} alt={`${productName} thumbnail ${index + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="relative aspect-square">
            <Image src={images[activeIndex]} alt={`${productName} - fullsize`} fill className="object-contain" />
            {images.length > 1 && (
              <>
                <Button variant="outline" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
