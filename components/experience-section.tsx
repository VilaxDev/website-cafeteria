"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Coffee, Award, Heart } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface ExperienceSectionProps {
  data: CafeData
}

export function ExperienceSection({ data }: ExperienceSectionProps) {
  const experiences = [
    {
      icon: <Coffee className="h-12 w-12 text-primary" />,
      title: "Origen Premium",
      description:
        "Seleccionamos los mejores granos de café de fincas sostenibles en Colombia y Etiopía, garantizando calidad excepcional en cada taza.",
    },
    {
      icon: <Leaf className="h-12 w-12 text-primary" />,
      title: "Proceso Artesanal",
      description:
        "Tostamos nuestros granos en pequeños lotes usando métodos tradicionales que realzan los sabores únicos de cada variedad.",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Calidad Garantizada",
      description:
        "Cada bebida es preparada por baristas certificados que dominan el arte del café, asegurando consistencia y excelencia.",
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: "Pasión por el Café",
      description:
        "Más que una bebida, el café es nuestra pasión. Compartimos esta experiencia única con cada cliente que nos visita.",
    },
  ]

  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">Nuestra Experiencia</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              En {data.info.name}, cada taza cuenta una historia. Desde la selección cuidadosa de nuestros granos hasta
              el momento en que llega a tus manos, cada paso está diseñado para ofrecerte una experiencia única e
              inolvidable.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestro compromiso con la calidad y la sostenibilidad nos ha convertido en el destino favorito de los
              amantes del café que buscan algo más que una simple bebida.
            </p>
          </div>

          {/* Experience cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experiences.map((experience, index) => (
              <Card
                key={index}
                className="glass-card hover:shadow-lg transition-all duration-300 animate-slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{experience.icon}</div>
                  <h3 className="font-playfair text-xl font-bold mb-3">{experience.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
