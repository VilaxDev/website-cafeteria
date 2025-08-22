"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Upload,
  RotateCcw,
  Users,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Database,
  UserCheck,
  User,
} from "lucide-react";
import type { CafeData } from "@/lib/cafe-data";
import { getUsersData, getUserStats, type User } from "@/lib/cafe-data";

interface DataManagerProps {
  data: CafeData;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function DataManager({ data, onExport, onImport }: DataManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSecurityUnlocked, setIsSecurityUnlocked] = useState(false);
  const [securityPassword, setSecurityPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [securityError, setSecurityError] = useState("");
  const [usersData, setUsersData] = useState<{ users: User[]; stats: any }>({
    users: [],
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      recentRegistrations: 0,
    },
  });

  const SECURITY_PASSWORD = "vilax.dev@gmail.com";

  useEffect(() => {
    if (isSecurityUnlocked) {
      loadUsersData();
    }
  }, [isSecurityUnlocked]);

  const loadUsersData = () => {
    try {
      const userData = getUsersData();
      const stats = getUserStats();
      setUsersData({ users: userData.users || [], stats });
    } catch (error) {
      console.error("Error loading users data:", error);
      setUsersData({
        users: [],
        stats: {
          totalUsers: 0,
          activeUsers: 0,
          recentRegistrations: 0,
        },
      });
    }
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityPassword === SECURITY_PASSWORD) {
      setIsSecurityUnlocked(true);
      setSecurityError("");
    } else {
      setSecurityError("Contraseña de seguridad incorrecta");
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const resetToDefaults = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres restaurar todos los datos a los valores por defecto? Esta acción no se puede deshacer."
      )
    ) {
      // En lugar de usar localStorage directamente, usar una función que maneje el reset
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.removeItem("cafeData");
          localStorage.removeItem("cafeUsers");
        }
        window.location.reload();
      } catch (error) {
        console.error("Error resetting data:", error);
        // Fallback si localStorage no está disponible
        window.location.reload();
      }
    }
  };

  const exportUsersData = () => {
    try {
      const usersDataToExport = getUsersData();
      const dataStr = JSON.stringify(usersDataToExport, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `usuarios_cafe_aroma_${
        new Date().toISOString().split("T")[0]
      }.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Error exporting users data:", error);
      alert("Error al exportar los datos de usuarios");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  // Pantalla de seguridad
  if (!isSecurityUnlocked) {
    return (
      <div className="space-y-6">
        <h2 className="font-playfair text-2xl font-bold">Gestión de Datos</h2>

        <Card className="glass-card border-amber-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-amber-800">
              Área de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-center">
              Esta sección contiene datos sensibles. Ingresa la contraseña de
              seguridad para continuar.
            </p>

            {securityError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {securityError}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSecuritySubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="securityPassword"
                  className="text-stone-700 font-medium"
                >
                  Contraseña de Seguridad
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 w-5 h-5 text-amber-700" />
                  <Input
                    id="securityPassword"
                    type={showPassword ? "text" : "password"}
                    value={securityPassword}
                    onChange={(e) => {
                      setSecurityPassword(e.target.value);
                      setSecurityError("");
                    }}
                    placeholder="Ingresa la contraseña de seguridad"
                    className="pl-10 pr-10 bg-white border-stone-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800"
              >
                <Shield className="mr-2 h-4 w-4" />
                Desbloquear
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-2xl font-bold">Gestión de Datos</h2>
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Área desbloqueada</span>
        </div>
      </div>

      <Tabs defaultValue="cafe" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cafe" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Datos del Café
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cafe" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Exportar Datos del Café</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Descarga una copia de seguridad de todos los datos de tu
                  cafetería en formato JSON.
                </p>
                <Button onClick={onExport} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Backup del Café
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Importar Datos del Café</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Restaura los datos desde un archivo JSON previamente
                  exportado.
                </p>
                <Button
                  onClick={handleImportClick}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Seleccionar Archivo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">
                Zona de Peligro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Restaurar todos los datos a los valores por defecto. Esta acción
                eliminará toda la información personalizada.
              </p>
              <Button
                onClick={resetToDefaults}
                variant="destructive"
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restaurar Valores por Defecto
              </Button>
            </CardContent>
          </Card>

          {/* Data Preview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vista Previa de Datos del Café</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-muted-foreground">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* Estadísticas de usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Usuarios
                    </p>
                    <p className="text-2xl font-bold">
                      {usersData.stats.totalUsers || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <UserCheck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Usuarios Activos
                    </p>
                    <p className="text-2xl font-bold">
                      {usersData.stats.activeUsers || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Registros Recientes
                    </p>
                    <p className="text-2xl font-bold">
                      {usersData.stats.recentRegistrations || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acciones de usuarios */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Descarga una copia de seguridad de todos los datos de usuarios
                registrados.
              </p>
              <Button
                onClick={exportUsersData}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar Datos de Usuarios
              </Button>
            </CardContent>
          </Card>

          {/* Lista de usuarios */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Lista de Usuarios Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              {usersData.users.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No hay usuarios registrados
                </p>
              ) : (
                <div className="space-y-4">
                  {usersData.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Registrado: {formatDate(user.createdAt)}
                          </p>
                          {user.lastLogin && (
                            <p className="text-xs text-muted-foreground">
                              Último acceso: {formatDate(user.lastLogin)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isActive ? "Activo" : "Inactivo"}
                        </span>
                        {user.email === "admin@cafearoma.com" && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vista previa de datos de usuarios */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vista Previa de Datos de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-muted-foreground">
                  {JSON.stringify(usersData.users, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
