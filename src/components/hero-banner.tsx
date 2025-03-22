import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export function HeroBanner({
  title,
  description,
  imageUrl,
  buttonText,
  buttonLink,
}: HeroBannerProps) {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl mb-8 text-white/90">{description}</p>
          <Link href={buttonLink}>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 