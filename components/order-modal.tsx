"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, MessageCircle } from "lucide-react"
import type { MenuItem } from "@/lib/cafe-data"
import { formatWhatsAppMessageEnhanced } from "@/lib/cafe-data"

interface OrderModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  whatsappNumber: string
}

export function OrderModal({ item, isOpen, onClose, whatsappNumber }: OrderModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState("")

  if (!item) return null

  // Reset state when modal opens with new item
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setSelectedSize("")
      setQuantity(1)
      setNote("")
    } else if (item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0].name)
    }
  }

  const getCurrentPrice = () => {
    if (selectedSize && item.sizes) {
      const size = item.sizes.find((s) => s.name === selectedSize)
      return size ? size.price : item.price
    }
    return item.price
  }

  const getTotalPrice = () => {
    return getCurrentPrice() * quantity
  }

  const handleWhatsAppOrder = () => {
    const message = formatWhatsAppMessageEnhanced(item, selectedSize || undefined, quantity, note || undefined)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
    onClose()
  }

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md glass-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Personalizar Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item info */}
          <div className="flex space-x-4">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-playfair text-xl font-semibold">{item.name}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
              {item.badge && (
                <Badge variant="secondary" className="mt-2">
                  {item.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Size selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <Label className="text-base font-semibold">Tamaño</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {item.sizes.map((size) => (
                  <Button
                    key={size.name}
                    variant={selectedSize === size.name ? "default" : "outline"}
                    onClick={() => setSelectedSize(size.name)}
                    className="justify-between"
                  >
                    <span>{size.name}</span>
                    <span className="text-sm">${size.price.toFixed(2)}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <Label className="text-base font-semibold">Cantidad</Label>
            <div className="flex items-center space-x-4 mt-2">
              <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
              <Button variant="outline" size="sm" onClick={incrementQuantity} disabled={quantity >= 10}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Note */}
          <div>
            <Label htmlFor="note" className="text-base font-semibold">
              Nota especial (opcional)
            </Label>
            <Textarea
              id="note"
              placeholder="Ej: Sin azúcar, extra caliente, etc."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Price summary */}
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total:</span>
              <span className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ${getCurrentPrice().toFixed(2)} × {quantity} {quantity > 1 ? "unidades" : "unidad"}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => handleOpenChange(false)} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button onClick={handleWhatsAppOrder} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            <MessageCircle className="mr-2 h-4 w-4" />
            Pedir por WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
