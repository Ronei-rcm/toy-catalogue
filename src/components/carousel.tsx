'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const carouselImages = [
  {
    id: 1,
    image: '/images/carousel/1.png',
    alt: 'Brinquedos Educativos'
  },
  {
    id: 2,
    image: '/images/carousel/2.png',
    alt: 'Jogos de Tabuleiro'
  },
  {
    id: 3,
    image: '/images/carousel/3.png',
    alt: 'Bonecas e Acessórios'
  },
  {
    id: 4,
    image: '/images/carousel/4.png',
    alt: 'Brinquedos de Montar'
  }
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-background shadow-xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselImages.map((item) => (
          <div
            key={item.id}
            className="relative w-full flex-shrink-0"
          >
            <div className="relative aspect-[2/1] w-full">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm h-10 w-10 p-0"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm h-10 w-10 p-0"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === index
                ? "bg-primary w-4"
                : "bg-primary/20 hover:bg-primary/40"
            )}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
          />
        ))}
      </div>
    </div>
  );
} 