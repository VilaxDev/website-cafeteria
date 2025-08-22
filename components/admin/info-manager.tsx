"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface InfoManagerProps {
  data: CafeData
  onDataChange: (data: CafeData) => void
}

export function InfoManager({ data, onDataChange }: InfoManagerProps) {
  const [formData, setFormData] = useState(data.info)

  const handleSave = () => {
    onDataChange({ ...data, info: formData })
    alert("Información actualizada correctamente")
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSocialChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      social: { ...formData.social, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-2xl font-bold">Información General</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Café</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="slogan">Slogan</Label>
              <Input id="slogan" value={formData.slogan} onChange={(e) => handleChange("slogan", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="hours">Horarios</Label>
              <Input
                id="hours"
                value={formData.hours}
                onChange={(e) => handleChange("hours", e.target.value)}
                placeholder="Lun-Dom: 7:00 AM - 10:00 PM"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1234567890"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp (solo números)</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                placeholder="1234567890"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="hola@cafearoma.com"
              />
            </div>

            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.social.instagram}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                placeholder="@cafearoma"
              />
            </div>

            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.social.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                placeholder="CafeAromaOficial"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
