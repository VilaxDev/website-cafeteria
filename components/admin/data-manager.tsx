"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Upload, RotateCcw } from "lucide-react"
import type { CafeData } from "@/lib/cafe-data"

interface DataManagerProps {
  data: CafeData
  onExport: () => void
  onImport: (file: File) => void
}

export function DataManager({ data, onExport, onImport }: DataManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImport(file)
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const resetToDefaults = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres restaurar todos los datos a los valores por defecto? Esta acción no se puede deshacer.",
      )
    ) {
      localStorage.removeItem("cafeData")
      window.location.reload()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-2xl font-bold">Gestión de Datos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Exportar Datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Descarga una copia de seguridad de todos los datos de tu cafetería en formato JSON.
            </p>
            <Button onClick={onExport} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar Backup
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Importar Datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Restaura los datos desde un archivo JSON previamente exportado.</p>
            <Button onClick={handleImportClick} variant="outline" className="w-full bg-transparent">
              <Upload className="mr-2 h-4 w-4" />
              Seleccionar Archivo
            </Button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Restaurar todos los datos a los valores por defecto. Esta acción eliminará toda la información
            personalizada.
          </p>
          <Button onClick={resetToDefaults} variant="destructive" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restaurar Valores por Defecto
          </Button>
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Vista Previa de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-xs text-muted-foreground">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
