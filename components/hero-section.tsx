"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, MessageCircle } from "lucide-react";
import type { CafeData } from "@/lib/cafe-data";

interface HeroSectionProps {
  data: CafeData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 parallax"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4450327/pexels-photo-4450327.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          {data.info.name}
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
          {data.info.slogan}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver Bebidas
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg bg-transparent"
            onClick={() =>
              window.open(`https://wa.me/${data.info.whatsapp}`, "_blank")
            }
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Reservar por WhatsApp
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white/70" />
      </div>
    </section>
  );
}
