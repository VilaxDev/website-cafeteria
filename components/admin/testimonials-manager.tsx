"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Star } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface TestimonialsManagerProps {
  data: CafeData
  onDataChange: (data: CafeData) => void
}

export function TestimonialsManager({ data, onDataChange }: TestimonialsManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    rating: 5,
  })

  const openModal = (testimonial?: any) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      setFormData({ ...testimonial })
    } else {
      setEditingTestimonial(null)
      setFormData({ name: "", text: "", rating: 5 })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTestimonial(null)
    setFormData({ name: "", text: "", rating: 5 })
  }

  const handleSave = () => {
    if (!formData.name || !formData.text) return

    const newTestimonial = {
      id: editingTestimonial?.id || Date.now().toString(),
      name: formData.name,
      text: formData.text,
      rating: formData.rating,
    }

    const newTestimonials = editingTestimonial
      ? data.testimonials.map((item) => (item.id === editingTestimonial.id ? newTestimonial : item))
      : [...data.testimonials, newTestimonial]

    onDataChange({ ...data, testimonials: newTestimonials })
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este testimonio?")) {
      const newTestimonials = data.testimonials.filter((item) => item.id !== id)
      onDataChange({ ...data, testimonials: newTestimonials })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-2xl font-bold">Gestión de Testimonios</h2>
        <Button onClick={() => openModal()}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Testimonio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openModal(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">"{testimonial.text}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Editar Testimonio" : "Agregar Testimonio"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Cliente</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="text">Testimonio</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="rating">Calificación</Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 estrellas</SelectItem>
                  <SelectItem value="4">4 estrellas</SelectItem>
                  <SelectItem value="3">3 estrellas</SelectItem>
                  <SelectItem value="2">2 estrellas</SelectItem>
                  <SelectItem value="1">1 estrella</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
