"use client"

import { useState } from "react"
import { useCafeData } from "@/hooks/use-cafe-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { MenuManager } from "@/components/admin/menu-manager"
import { InfoManager } from "@/components/admin/info-manager"
import { TestimonialsManager } from "@/components/admin/testimonials-manager"
import { GalleryManager } from "@/components/admin/gallery-manager"
import { DataManager } from "@/components/admin/data-manager"
import { Menu, Info, MessageSquare, ImageIcon, Database, Save } from "lucide-react"

export default function AdminPage() {
  const { data, updateData, exportData, importData, isLoading } = useCafeData()
  const [hasChanges, setHasChanges] = useState(false)

  const handleDataChange = (newData: typeof data) => {
    updateData(newData)
    setHasChanges(true)
  }

  const handlePublishChanges = () => {
    // In a real app, this would sync with a backend
    setHasChanges(false)
    alert("¡Cambios publicados exitosamente! El sitio web se ha actualizado.")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">Panel Administrativo</h1>
            <p className="text-muted-foreground">Gestiona el contenido de tu cafetería</p>
          </div>

          {hasChanges && (
            <Button onClick={handlePublishChanges} size="lg" className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-5 w-5" />
              Publicar Cambios
            </Button>
          )}
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Menú</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Información</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Testimonios</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Datos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <MenuManager data={data} onDataChange={handleDataChange} />
          </TabsContent>

          <TabsContent value="info">
            <InfoManager data={data} onDataChange={handleDataChange} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager data={data} onDataChange={handleDataChange} />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager data={data} onDataChange={handleDataChange} />
          </TabsContent>

          <TabsContent value="data">
            <DataManager data={data} onExport={exportData} onImport={importData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
