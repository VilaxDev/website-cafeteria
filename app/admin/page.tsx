"use client";

import { useState, useEffect } from "react";
import { useCafeData } from "@/hooks/use-cafe-data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { MenuManager } from "@/components/admin/menu-manager";
import { InfoManager } from "@/components/admin/info-manager";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { DataManager } from "@/components/admin/data-manager";
import {
  Menu,
  Info,
  MessageSquare,
  ImageIcon,
  Database,
  Save,
  Coffee,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { getCurrentUser, type User } from "@/lib/cafe-data";

export default function AdminPage() {
  const { data, updateData, exportData, importData, isLoading } = useCafeData();
  const [hasChanges, setHasChanges] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Verificar autenticación al cargar la página
    const checkAuthentication = () => {
      try {
        const user = getCurrentUser();

        if (!user) {
          // No hay usuario logueado, redirigir a home
          console.log("No hay usuario logueado, redirigiendo a home...");
          window.location.href = "/";
          return;
        }

        // Verificar si es admin (opcional - puedes agregar un campo isAdmin a tu User interface)
        // Por ahora, verificamos si es el usuario admin por email
       // if (user.email !== "admin@cafearoma.com") {
         //  console.log("Usuario no es administrador, redirigiendo a home...");
        //   alert("No tienes permisos de administrador");
        //   window.location.href = "/";
       //    return;
       //  }

        setCurrentUser(user);
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        window.location.href = "/";
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleDataChange = (newData: typeof data) => {
    updateData(newData);
    setHasChanges(true);
  };

  const handlePublishChanges = () => {
    // In a real app, this would sync with a backend
    setHasChanges(false);
    alert("¡Cambios publicados exitosamente! El sitio web se ha actualizado.");
  };

  // Pantalla de carga mientras verifica autenticación
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Shield className="h-12 w-12 text-primary mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold mb-2">
              Verificando acceso...
            </h2>
            <p className="text-muted-foreground text-center">
              Comprobando permisos de administrador
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mt-4"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de acceso denegado (fallback, no debería mostrarse normalmente)
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-96">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-red-600">
              Acceso Denegado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Necesitas iniciar sesión como administrador para acceder a esta
              página.
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => (window.location.href = "/login")}
                className="w-full"
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="w-full"
              >
                Volver al Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de carga de datos
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Coffee className="h-12 w-12 text-primary mb-4 animate-pulse" />
              <h2 className="text-xl font-semibold mb-2">Cargando datos...</h2>
              <p className="text-muted-foreground text-center">
                Preparando el panel de administración
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mt-4"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
              Panel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Gestiona el contenido de tu cafetería | Bienvenido,{" "}
              {currentUser.firstName}
            </p>
          </div>

          {hasChanges && (
            <Button
              onClick={handlePublishChanges}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
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
            <TabsTrigger
              value="testimonials"
              className="flex items-center gap-2"
            >
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
            <DataManager
              data={data}
              onExport={exportData}
              onImport={importData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
