declare module 'embla-carousel-react' {
  import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
  import { RefObject } from 'react'

  export interface UseEmblaCarouselType {
    (options?: EmblaOptionsType, plugins?: EmblaPluginType[]): [
      RefObject<HTMLDivElement>,
      EmblaCarouselType | undefined
    ]
  }

  export interface EmblaCarouselType {
    canScrollNext: () => boolean
    canScrollPrev: () => boolean
    scrollNext: () => void
    scrollPrev: () => void
    scrollTo: (index: number) => void
    selectedScrollSnap: () => number
    on: (eventName: string, callback: () => void) => void
    off: (eventName: string, callback: () => void) => void
  }

  const useEmblaCarousel: UseEmblaCarouselType
  export default useEmblaCarousel
} 