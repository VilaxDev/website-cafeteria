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
import {
  registerUser,
  validateEmail,
  validatePassword,
  type UserRegistration,
} from "@/lib/cafe-data";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
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
    // Validar campos requeridos
    if (!formData.firstName.trim()) {
      setMessage({ type: "error", content: "El nombre es requerido" });
      return false;
    }

    if (!formData.lastName.trim()) {
      setMessage({ type: "error", content: "El apellido es requerido" });
      return false;
    }

    // Validar email
    if (!validateEmail(formData.email)) {
      setMessage({
        type: "error",
        content: "El formato del email no es válido",
      });
      return false;
    }

    // Validar contraseña
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setMessage({ type: "error", content: passwordValidation.message });
      return false;
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", content: "Las contraseñas no coinciden" });
      return false;
    }

    // Validar términos
    if (!acceptTerms) {
      setMessage({
        type: "error",
        content: "Debes aceptar los términos y condiciones",
      });
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
      // Preparar datos de registro
      const registrationData: UserRegistration = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: acceptTerms,
      };

      // Intentar registrar usuario
      const result = registerUser(registrationData);

      if (result.success) {
        setMessage({
          type: "success",
          content: "¡Cuenta creada exitosamente! Bienvenido a Café Aroma.",
        });

        // Limpiar formulario
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setAcceptTerms(false);

        // Redirigir después de un momento (en una app real usarías router)
        setTimeout(() => {
          console.log("Redireccionar al dashboard o página principal");
          window.location.href = "/admin"; // Para navegación real
        }, 2000);
      } else {
        setMessage({ type: "error", content: result.message });
      }
    } catch (error) {
      console.error("Error en registro:", error);
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
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-200/15 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Header con logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-800 to-stone-700 rounded-full shadow-2xl mb-4">
            <Coffee className="w-10 h-10 text-amber-50" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Café Aroma</h1>
        </div>

        {/* Card de registro */}
        <Card className="backdrop-blur-sm bg-stone-50/95 border border-stone-200 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-stone-800 flex items-center justify-center gap-2 mb-2">
              <User className="w-6 h-6 text-amber-700" />
              Crear Cuenta
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-stone-700 font-medium"
                  >
                    Nombre
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-amber-700" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="pl-9 bg-white border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-600 focus:ring-amber-600 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-stone-700 font-medium"
                  >
                    Apellido
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-amber-700" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Tu apellido"
                      className="pl-9 bg-white border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-600 focus:ring-amber-600 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

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

              {/* Contraseña */}
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

              {/* Confirmar Contraseña */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-stone-700 font-medium"
                >
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-amber-700" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-white border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-600 focus:ring-amber-600 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-amber-700 hover:text-amber-800 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start space-x-3 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded border-stone-400 bg-white text-amber-700 focus:ring-amber-600"
                  disabled={isLoading}
                />
                <label
                  htmlFor="terms"
                  className="text-stone-600 leading-relaxed"
                >
                  Acepto los{" "}
                  <a
                    href="#"
                    className="text-amber-700 hover:text-amber-800 underline"
                  >
                    Términos y Condiciones
                  </a>{" "}
                  y la{" "}
                  <a
                    href="#"
                    className="text-amber-700 hover:text-amber-800 underline"
                  >
                    Política de Privacidad
                  </a>
                </label>
              </div>

              {/* Botón de registro */}
              <Button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className="w-full bg-gradient-to-r from-amber-800 to-stone-700 hover:from-amber-900 hover:to-stone-800 text-amber-50 font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-amber-100 border-t-transparent rounded-full animate-spin"></div>
                    Creando cuenta...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Crear Cuenta
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-stone-600">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="font-semibold text-amber-700 hover:text-amber-800 hover:underline transition-colors"
              >
                Inicia sesión aquí
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
