"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Coffee,
  Home,
  ExternalLink,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { getCurrentUser, logoutUser, type User } from "@/lib/cafe-data";

export function AdminNavbar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Obtener usuario actual al cargar el componente
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    try {
      logoutUser();
      setCurrentUser(null);

      // Redirigir al login (en una app real usarías router)
      console.log("Usuario deslogueado, redirigiendo al login...");
      window.location.href = "/login";

      // Mostrar mensaje de confirmación
      alert("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    }
  };

  const handleViewSite = () => {
    window.location.href = "/";
  };

  const handleOpenNewTab = () => {
    window.open("/", "_blank");
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-primary" />
            <span className="font-playfair text-xl font-bold">Admin Panel</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleViewSite}>
              <Home className="mr-2 h-4 w-4" />
              Ver Sitio
            </Button>

            <Button variant="outline" onClick={handleOpenNewTab}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Nueva Pestaña
            </Button>

            {/* Dropdown del usuario */}
            {currentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {currentUser.firstName} {currentUser.lastName}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    {currentUser.email}
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Fallback si no hay usuario logueado */}
            {!currentUser && (
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/login")}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
