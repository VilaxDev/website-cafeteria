"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Heart } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface SpecialtiesSectionProps {
  data: CafeData
}

export function SpecialtiesSection({ data }: SpecialtiesSectionProps) {
  const specialties = data.menu.filter((item) => item.featured)

  const getIcon = (index: number) => {
    const icons = [Star, Award, Heart]
    const Icon = icons[index % icons.length]
    return <Icon className="h-8 w-8 text-primary" />
  }

  return (
    <section id="especialidades" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Especialidades de la Casa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestras creaciones más especiales, preparadas con técnicas artesanales y ingredientes premium seleccionados
            cuidadosamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <Card
              key={item.id}
              className="glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-in-left"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">{getIcon(index)}</div>
                <h3 className="font-playfair text-2xl font-bold mb-4">{item.name}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                {item.badge && (
                  <Badge variant="secondary" className="mb-4">
                    {item.badge}
                  </Badge>
                )}
                <div className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
