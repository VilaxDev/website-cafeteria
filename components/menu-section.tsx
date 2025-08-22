"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Coffee, Cake, ShoppingCart } from "lucide-react";
import type { CafeData, MenuItem } from "@/lib/cafe-data";
import { OrderModal } from "@/components/order-modal";

interface MenuSectionProps {
  data: CafeData;
}

export function MenuSection({ data }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "bebida" | "postre"
  >("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMenu = data.menu.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const handleQuickOrder = (item: MenuItem) => {
    // For items without sizes, order directly
    if (!item.sizes || item.sizes.length === 0) {
      const message = `Hola, quiero pedir: ${item.category} - ${
        item.name
      } | Cant: 1 | Precio: $${item.price.toFixed(2)}`;
      window.open(
        `https://wa.me/${data.info.whatsapp}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
    } else {
      // For items with sizes, open modal
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const handleCustomOrder = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Nuestro Menú
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de bebidas premium y postres artesanales,
            preparados con los mejores ingredientes.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 rounded-2xl">
            <div className="flex space-x-2">
              <Button
                variant={activeCategory === "all" ? "default" : "ghost"}
                onClick={() => setActiveCategory("all")}
                className="rounded-xl"
              >
                Todo
              </Button>
              <Button
                variant={activeCategory === "bebida" ? "default" : "ghost"}
                onClick={() => setActiveCategory("bebida")}
                className="rounded-xl"
              >
                <Coffee className="mr-2 h-4 w-4" />
                Bebidas
              </Button>
              <Button
                variant={activeCategory === "postre" ? "default" : "ghost"}
                onClick={() => setActiveCategory("postre")}
                className="rounded-xl"
              >
                <Cake className="mr-2 h-4 w-4" />
                Postres
              </Button>
            </div>
          </div>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item, index) => (
            <Card
              key={item.id}
              className="glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  {item.badge && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-playfair text-xl mb-2">
                  {item.name}
                </CardTitle>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.sizes && (
                      <span className="text-sm text-muted-foreground ml-1">
                        desde
                      </span>
                    )}
                  </div>
                  {item.sizes && (
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        Tamaños disponibles
                      </div>
                      <div className="text-sm font-medium">
                        {item.sizes.length} opciones
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 space-y-2">
                {/* Quick order button for items without sizes */}
                {(!item.sizes || item.sizes.length === 0) && (
                  <Button
                    onClick={() => handleQuickOrder(item)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Pedir por WhatsApp
                  </Button>
                )}

                {/* Buttons for items with sizes */}
                {item.sizes && item.sizes.length > 0 && (
                  <div className="w-full space-y-2">
                    <Button
                      onClick={() => handleQuickOrder(item)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Pedir Rápido
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCustomOrder(item)}
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Personalizar
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Order Modal */}
        <OrderModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          whatsappNumber={data.info.whatsapp}
        />
      </div>
    </section>
  );
}
