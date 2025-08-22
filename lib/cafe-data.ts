export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface UsersData {
  users: User[];
  currentUser: User | null;
}

// Default users data
export const defaultUsersData: UsersData = {
  users: [
    {
      id: "1",
      firstName: "Admin",
      lastName: "Café Aroma",
      email: "admin@cafearoma.com",
      password: "admin123", // En producción esto debería estar hasheado
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
    },
  ],
  currentUser: null,
};

// Local storage utilities para usuarios
export const getUsersData = (): UsersData => {
  if (typeof window === "undefined") return defaultUsersData;

  try {
    const stored = localStorage.getItem("usersData");
    return stored ? JSON.parse(stored) : defaultUsersData;
  } catch {
    return defaultUsersData;
  }
};

export const setUsersData = (data: UsersData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("usersData", JSON.stringify(data));
};

// Utilidades para manejo de usuarios
export const createUser = (registrationData: UserRegistration): User => {
  const newUser: User = {
    id: generateUserId(),
    firstName: registrationData.firstName,
    lastName: registrationData.lastName,
    email: registrationData.email,
    password: registrationData.password, // En producción debería ser hasheado
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  return newUser;
};

export const registerUser = (
  registrationData: UserRegistration
): { success: boolean; message: string; user?: User } => {
  const usersData = getUsersData();

  // Verificar si el email ya existe
  const existingUser = usersData.users.find(
    (user) => user.email === registrationData.email
  );
  if (existingUser) {
    return {
      success: false,
      message: "Este correo electrónico ya está registrado",
    };
  }

  // Verificar que las contraseñas coincidan
  if (registrationData.password !== registrationData.confirmPassword) {
    return {
      success: false,
      message: "Las contraseñas no coinciden",
    };
  }

  // Verificar términos aceptados
  if (!registrationData.acceptTerms) {
    return {
      success: false,
      message: "Debes aceptar los términos y condiciones",
    };
  }

  // Crear nuevo usuario
  const newUser = createUser(registrationData);

  // Actualizar datos
  const updatedUsersData: UsersData = {
    users: [...usersData.users, newUser],
    currentUser: newUser,
  };

  setUsersData(updatedUsersData);

  return {
    success: true,
    message: "Usuario registrado exitosamente",
    user: newUser,
  };
};

export const loginUser = (
  authData: UserAuth
): { success: boolean; message: string; user?: User } => {
  const usersData = getUsersData();

  // Buscar usuario por email
  const user = usersData.users.find(
    (u) => u.email === authData.email && u.isActive
  );

  if (!user) {
    return {
      success: false,
      message: "Usuario no encontrado",
    };
  }

  // Verificar contraseña (en producción usar hash comparison)
  if (user.password !== authData.password) {
    return {
      success: false,
      message: "Contraseña incorrecta",
    };
  }

  // Actualizar último login
  const updatedUser: User = {
    ...user,
    lastLogin: new Date().toISOString(),
  };

  // Actualizar datos
  const updatedUsersData: UsersData = {
    users: usersData.users.map((u) => (u.id === user.id ? updatedUser : u)),
    currentUser: updatedUser,
  };

  setUsersData(updatedUsersData);

  return {
    success: true,
    message: "Inicio de sesión exitoso",
    user: updatedUser,
  };
};

export const logoutUser = (): void => {
  const usersData = getUsersData();
  const updatedUsersData: UsersData = {
    ...usersData,
    currentUser: null,
  };
  setUsersData(updatedUsersData);
};

export const getCurrentUser = (): User | null => {
  const usersData = getUsersData();
  return usersData.currentUser;
};

export const deleteUser = (
  userId: string
): { success: boolean; message: string } => {
  const usersData = getUsersData();

  const updatedUsersData: UsersData = {
    users: usersData.users.filter((u) => u.id !== userId),
    currentUser:
      usersData.currentUser?.id === userId ? null : usersData.currentUser,
  };

  setUsersData(updatedUsersData);

  return {
    success: true,
    message: "Usuario eliminado exitosamente",
  };
};

// Utilidad para generar IDs únicos
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validaciones
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string
): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return {
      isValid: false,
      message: "La contraseña debe contener al menos una letra minúscula",
    };
  }

  if (!/(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: "La contraseña debe contener al menos un número",
    };
  }

  return {
    isValid: true,
    message: "Contraseña válida",
  };
};

// Estadísticas de usuarios (para admin)
export const getUserStats = () => {
  const usersData = getUsersData();

  return {
    totalUsers: usersData.users.length,
    activeUsers: usersData.users.filter((u) => u.isActive).length,
    recentRegistrations: usersData.users.filter((u) => {
      const userDate = new Date(u.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return userDate > weekAgo;
    }).length,
  };
};

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "bebida" | "postre";
  image: string;
  sizes?: { name: string; price: number }[];
  featured?: boolean;
  badge?: string;
}

export interface CafeData {
  info: {
    name: string;
    slogan: string;
    phone: string;
    whatsapp: string;
    address: string;
    hours: string;
    email: string;
    social: {
      instagram: string;
      facebook: string;
    };
  };
  menu: MenuItem[];
  testimonials: {
    id: string;
    name: string;
    text: string;
    rating: number;
  }[];
  gallery: {
    id: string;
    url: string;
    alt: string;
  }[];
}

// Default café data
export const defaultCafeData: CafeData = {
  info: {
    name: "Café Aroma",
    slogan: "Donde cada taza cuenta una historia",
    phone: "+51927564707",
    whatsapp: "927564707",
    address: "Calle Principal 123, Centro",
    hours: "Lun-Dom: 7:00 AM - 10:00 PM",
    email: "hola@cafearoma.com",
    social: {
      instagram: "@cafearoma",
      facebook: "CafeAromaOficial",
    },
  },
  menu: [
    {
      id: "1",
      name: "Espresso Signature",
      description: "Nuestro blend exclusivo con notas de chocolate y caramelo",
      price: 4.5,
      category: "bebida",
      image: "/espresso-coffee-cup.png",
      sizes: [
        { name: "Simple", price: 4.5 },
        { name: "Doble", price: 6.0 },
      ],
      featured: true,
      badge: "Especialidad",
    },
    {
      id: "2",
      name: "Cappuccino Artesanal",
      description: "Espresso perfecto con espuma de leche cremosa y arte latte",
      price: 5.5,
      category: "bebida",
      image: "/cappuccino-latte-art.png",
      sizes: [
        { name: "Regular", price: 5.5 },
        { name: "Grande", price: 7.0 },
      ],
      featured: true,
    },
    {
      id: "3",
      name: "Cheesecake de Frutos Rojos",
      description: "Cremoso cheesecake con salsa de frutos rojos frescos",
      price: 6.5,
      category: "postre",
      image: "/berry-cheesecake-slice.png",
      featured: true,
      badge: "Favorito",
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "María González",
      text: "El mejor café de la ciudad. El ambiente es acogedor y el servicio excepcional.",
      rating: 5,
    },
    {
      id: "2",
      name: "Carlos Ruiz",
      text: "Los postres son increíbles y el café tiene un sabor único. Totalmente recomendado.",
      rating: 5,
    },
    {
      id: "3",
      name: "Ana López",
      text: "Mi lugar favorito para trabajar y disfrutar de un buen café. Ambiente perfecto.",
      rating: 5,
    },
  ],
  gallery: [
    {
      id: "1",
      url: "/cozy-cafe-interior.png",
      alt: "Interior acogedor del café",
    },
    {
      id: "2",
      url: "/coffee-beans-roasting.png",
      alt: "Granos de café tostándose",
    },
    {
      id: "3",
      url: "/barista-making-coffee.png",
      alt: "Barista preparando café",
    },
  ],
};

// Local storage utilities
export const getCafeData = (): CafeData => {
  if (typeof window === "undefined") return defaultCafeData;

  try {
    const stored = localStorage.getItem("cafeData");
    return stored ? JSON.parse(stored) : defaultCafeData;
  } catch {
    return defaultCafeData;
  }
};

export const setCafeData = (data: CafeData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cafeData", JSON.stringify(data));
};

// WhatsApp message formatter
export const formatWhatsAppMessage = (
  item: MenuItem,
  size?: string,
  quantity = 1,
  note?: string
): string => {
  const selectedSize = size || item.sizes?.[0]?.name;
  const price = size
    ? item.sizes?.find((s) => s.name === size)?.price || item.price
    : item.price;

  let message = `Hola, quiero pedir: ${item.category} - ${item.name}`;
  if (selectedSize) message += ` | Tamaño: ${selectedSize}`;
  message += ` | Cant: ${quantity} | Precio: $${(price * quantity).toFixed(2)}`;
  if (note) message += ` | Nota: ${note}`;

  return encodeURIComponent(message);
};

export const formatWhatsAppMessageEnhanced = (
  item: MenuItem,
  size?: string,
  quantity = 1,
  note?: string
): string => {
  const selectedSize = size || item.sizes?.[0]?.name;
  const unitPrice = size
    ? item.sizes?.find((s) => s.name === size)?.price || item.price
    : item.price;
  const totalPrice = unitPrice * quantity;

  let message = `🛒 *NUEVO PEDIDO*\n\n`;
  message += `📋 *Producto:* ${item.name}\n`;
  message += `🏷️ *Categoría:* ${
    item.category === "bebida" ? "Bebida" : "Postre"
  }\n`;

  if (selectedSize) {
    message += `📏 *Tamaño:* ${selectedSize}\n`;
  }

  message += `🔢 *Cantidad:* ${quantity}\n`;
  message += `💰 *Precio unitario:* $${unitPrice.toFixed(2)}\n`;
  message += `💵 *Total:* $${totalPrice.toFixed(2)}\n`;

  if (note) {
    message += `📝 *Nota especial:* ${note}\n`;
  }

  message += `\n¡Gracias por elegir nuestro café! ☕`;

  return encodeURIComponent(message);
};
