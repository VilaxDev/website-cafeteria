"use client";

import { Coffee, Instagram, Facebook, Mail, Phone } from "lucide-react";
import type { CafeData } from "@/lib/cafe-data";

interface FooterProps {
  data: CafeData;
}

export function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-primary" />
              <span className="font-playfair text-2xl font-bold">
                {data.info.name}
              </span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              {data.info.slogan}. Ven y descubre por qué somos el lugar favorito
              de los amantes del café en la ciudad.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  window.open(
                    `https://instagram.com/${data.info.social.instagram.replace(
                      "@",
                      ""
                    )}`,
                    "_blank"
                  )
                }
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://facebook.com/${data.info.social.facebook}`,
                    "_blank"
                  )
                }
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </button>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#menu"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Menú
                </a>
              </li>
              <li>
                <a
                  href="#especialidades"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Especialidades
                </a>
              </li>
              <li>
                <a
                  href="#experiencia"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Experiencia
                </a>
              </li>
              <li>
                <a
                  href="#ubicacion"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Ubicación
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80 text-sm">
                  {data.info.phone}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80 text-sm">
                  {data.info.email}
                </span>
              </div>
              <div className="text-background/80 text-sm">
                <p>{data.info.address}</p>
                <p className="mt-1">{data.info.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © {currentYear} {data.info.name}. Todos los derechos reservados.
          </p>
          <p className="text-background/40 text-xs mt-2">
            Sitio web creado con amor y mucho café ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
