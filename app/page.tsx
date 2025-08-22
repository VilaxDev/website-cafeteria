"use client";

import { useCafeData } from "@/hooks/use-cafe-data";
import { HeroSection } from "@/components/hero-section";
import { MenuSection } from "@/components/menu-section";
import { SpecialtiesSection } from "@/components/specialties-section";
import { ExperienceSection } from "@/components/experience-section";
import { LocationSection } from "@/components/location-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { GallerySection } from "@/components/gallery-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  const { data, isLoading } = useCafeData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar data={data} />
      <HeroSection data={data} />
      <MenuSection data={data} />
      <SpecialtiesSection data={data} />
      <ExperienceSection data={data} />
      <LocationSection data={data} />
      <TestimonialsSection data={data} />
      <GallerySection data={data} />
      <NewsletterSection />
      <ContactSection data={data} />
      <Footer data={data} />
    </main>
  );
}
