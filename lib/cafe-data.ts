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
