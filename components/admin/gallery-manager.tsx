"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface GalleryManagerProps {
  data: CafeData
  onDataChange: (data: CafeData) => void
}

export function GalleryManager({ data, onDataChange }: GalleryManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<any>(null)
  const [formData, setFormData] = useState({
    url: "",
    alt: "",
  })

  const openModal = (image?: any) => {
    if (image) {
      setEditingImage(image)
      setFormData({ url: image.url, alt: image.alt })
    } else {
      setEditingImage(null)
      setFormData({ url: "", alt: "" })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingImage(null)
    setFormData({ url: "", alt: "" })
  }

  const handleSave = () => {
    if (!formData.url || !formData.alt) return

    const newImage = {
      id: editingImage?.id || Date.now().toString(),
      url: formData.url,
      alt: formData.alt,
    }

    const newGallery = editingImage
      ? data.gallery.map((item) => (item.id === editingImage.id ? newImage : item))
      : [...data.gallery, newImage]

    onDataChange({ ...data, gallery: newGallery })
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      const newGallery = data.gallery.filter((item) => item.id !== id)
      onDataChange({ ...data, gallery: newGallery })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-2xl font-bold">Gestión de Galería</h2>
        <Button onClick={() => openModal()}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Imagen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.gallery.map((image) => (
          <Card key={image.id} className="glass-card">
            <CardHeader className="p-0">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">{image.alt}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => openModal(image)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(image.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingImage ? "Editar Imagen" : "Agregar Imagen"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="url">URL de la Imagen</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.url && (
                <div className="mt-2">
                  <img
                    src={formData.url || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="alt">Descripción de la Imagen</Label>
              <Input
                id="alt"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                placeholder="Descripción para accesibilidad"
              />
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
