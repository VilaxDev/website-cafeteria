"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Navigation } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface LocationSectionProps {
  data: CafeData
}

export function LocationSection({ data }: LocationSectionProps) {
  return (
    <section id="ubicacion" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">Ubicación & Horarios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visítanos en nuestro acogedor local en el corazón de la ciudad. Te esperamos con los brazos abiertos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <div className="animate-fade-in-up">
            <Card className="glass-card overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground">Mapa Interactivo</p>
                  <p className="text-muted-foreground">{data.info.address}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Location info */}
          <div className="space-y-6 animate-slide-in-left">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-2">Dirección</h3>
                    <p className="text-muted-foreground">{data.info.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-2">Horarios</h3>
                    <p className="text-muted-foreground">{data.info.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                const address = encodeURIComponent(data.info.address)
                window.open(`https://maps.google.com/maps?q=${address}`, "_blank")
              }}
            >
              <Navigation className="mr-2 h-5 w-5" />
              Cómo Llegar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
