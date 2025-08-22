"use client"

import { Button } from "@/components/ui/button"
import { Coffee, Home, ExternalLink } from "lucide-react"

export function AdminNavbar() {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-primary" />
            <span className="font-playfair text-xl font-bold">Admin Panel</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              <Home className="mr-2 h-4 w-4" />
              Ver Sitio
            </Button>
            <Button variant="outline" onClick={() => window.open("/", "_blank")}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Nueva Pestaña
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
