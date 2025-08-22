"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Check } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card animate-fade-in-up">
          <CardContent className="p-8 sm:p-12 text-center">
            <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mb-4">Mantente Conectado</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Suscríbete a nuestro boletín y sé el primero en conocer nuestras nuevas bebidas, promociones especiales y
              eventos exclusivos.
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="h-6 w-6" />
                <span className="text-lg font-medium">¡Gracias por suscribirte!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Suscribirse
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
