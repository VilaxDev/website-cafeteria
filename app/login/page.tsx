"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Coffee,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { loginUser, validateEmail, type UserAuth } from "@/lib/cafe-data";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar mensaje cuando el usuario empiece a escribir
    if (message.content) {
      setMessage({ type: "", content: "" });
    }
  };

  const validateForm = () => {
    // Validar email
    if (!formData.email.trim()) {
      setMessage({
        type: "error",
        content: "El correo electrónico es requerido",
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      setMessage({
        type: "error",
        content: "El formato del email no es válido",
      });
      return false;
    }

    // Validar contraseña
    if (!formData.password.trim()) {
      setMessage({ type: "error", content: "La contraseña es requerida" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      // Preparar datos de autenticación
      const authData: UserAuth = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      // Intentar iniciar sesión
      const result = loginUser(authData);

      if (result.success) {
        setMessage({
          type: "success",
          content: `¡Bienvenido de vuelta, ${result.user?.firstName}!`,
        });

        // Limpiar formulario
        setFormData({
          email: "",
          password: "",
        });

        // Redirigir después de un momento (en una app real usarías router)
        setTimeout(() => {
          console.log("Redireccionar al dashboard o página principal");
          console.log("Usuario logueado:", result.user);
          window.location.href = "/admin"; // Para navegación real
        }, 1500);
      } else {
        setMessage({ type: "error", content: result.message });
      }
    } catch (error) {
      console.error("Error en login:", error);
      setMessage({
        type: "error",
        content: "Ocurrió un error inesperado. Por favor intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4349959/pexels-photo-4349959.jpeg')",
        }}
      >
        {/* Overlay suave para mantener la estética beige */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-stone-100/70 to-amber-100/80"></div>

        {/* Elementos decorativos en tonos tierra */}
        <div className="absolute top-40 right-32 w-48 h-48 bg-amber-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-stone-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-amber-100/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header con logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-800 to-stone-700 rounded-full shadow-2xl mb-4">
            <Coffee className="w-10 h-10 text-amber-50" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Café Aroma</h1>
          <p className="text-stone-600 text-lg">Bienvenido de vuelta</p>
        </div>

        {/* Card de login con colores acordes al sitio */}
        <Card className="backdrop-blur-sm bg-stone-50/95 border border-stone-200 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-stone-800 flex items-center justify-center gap-2 mb-2">
              <User className="w-6 h-6 text-amber-700" />
              Iniciar Sesión
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Mensaje de estado */}
            {message.content && (
              <Alert
                className={`mb-4 ${
                  message.type === "success"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription
                  className={
                    message.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {message.content}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-700 font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-amber-700" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="pl-10 bg-white border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-600 focus:ring-amber-600 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-stone-700 font-medium"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-amber-700" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-white border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-600 focus:ring-amber-600 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-amber-700 hover:text-amber-800 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Recordarme y olvide contraseña */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-400 bg-white text-amber-700 focus:ring-amber-600"
                    disabled={isLoading}
                  />
                  <span>Recordarme</span>
                </label>
                <a
                  href="#"
                  className="text-amber-700 hover:text-amber-800 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de login con el color marrón del sitio */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-800 to-stone-700 hover:from-amber-900 hover:to-stone-800 text-amber-50 font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-amber-100 border-t-transparent rounded-full animate-spin"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Iniciar Sesión
                  </div>
                )}
              </Button>
            </form>

            {/* Footer 
            <div className="mt-6 text-center text-sm text-stone-600">
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="font-semibold text-amber-700 hover:text-amber-800 hover:underline transition-colors"
              >
                Regístrate aquí
              </a>
            </div>
          */}
          
            {/* Credenciales de prueba (solo para desarrollo) */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800 font-medium mb-1">
                Credenciales de prueba:
              </p>
              <p className="text-xs text-amber-700">
                Email: admin@cafearoma.com
              </p>
              <p className="text-xs text-amber-700">Contraseña: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
