"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Coffee, Cake } from "lucide-react"
import type { CafeData, MenuItem } from "@/lib/cafe-data"

interface MenuManagerProps {
  data: CafeData
  onDataChange: (data: CafeData) => void
}

export function MenuManager({ data, onDataChange }: MenuManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<Partial<MenuItem>>({})

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({ ...item })
    } else {
      setEditingItem(null)
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "bebida",
        image: "",
        sizes: [],
        featured: false,
        badge: "",
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({})
  }

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.price) return

    const newItem: MenuItem = {
      id: editingItem?.id || Date.now().toString(),
      name: formData.name!,
      description: formData.description!,
      price: formData.price!,
      category: formData.category as "bebida" | "postre",
      image: formData.image || "",
      sizes: formData.sizes || [],
      featured: formData.featured || false,
      badge: formData.badge || "",
    }

    const newMenu = editingItem
      ? data.menu.map((item) => (item.id === editingItem.id ? newItem : item))
      : [...data.menu, newItem]

    onDataChange({ ...data, menu: newMenu })
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este item?")) {
      const newMenu = data.menu.filter((item) => item.id !== id)
      onDataChange({ ...data, menu: newMenu })
    }
  }

  const addSize = () => {
    const sizes = formData.sizes || []
    setFormData({
      ...formData,
      sizes: [...sizes, { name: "", price: 0 }],
    })
  }

  const updateSize = (index: number, field: "name" | "price", value: string | number) => {
    const sizes = [...(formData.sizes || [])]
    sizes[index] = { ...sizes[index], [field]: value }
    setFormData({ ...formData, sizes })
  }

  const removeSize = (index: number) => {
    const sizes = [...(formData.sizes || [])]
    sizes.splice(index, 1)
    setFormData({ ...formData, sizes })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-2xl font-bold">Gestión de Menú</h2>
        <Button onClick={() => openModal()}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.menu.map((item) => (
          <Card key={item.id} className="glass-card">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  {item.category === "bebida" ? (
                    <Coffee className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                  ) : (
                    <Cake className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                  )}
                </div>
                {item.featured && <Badge className="absolute top-2 right-2">Destacado</Badge>}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
              {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
              {item.sizes && item.sizes.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground">{item.sizes.length} tamaños disponibles</span>
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => openModal(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Editar Item" : "Agregar Item"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as "bebida" | "postre" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bebida">Bebida</SelectItem>
                    <SelectItem value="postre">Postre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio Base</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="badge">Badge (opcional)</Label>
                <Input
                  id="badge"
                  value={formData.badge || ""}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                value={formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured || false}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Destacar en especialidades</Label>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Tamaños (opcional)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSize}>
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar Tamaño
                </Button>
              </div>
              {formData.sizes?.map((size, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    placeholder="Nombre del tamaño"
                    value={size.name}
                    onChange={(e) => updateSize(index, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    value={size.price}
                    onChange={(e) => updateSize(index, "price", Number.parseFloat(e.target.value) || 0)}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeSize(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
