"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto aspect-square object-cover"
            data-ai-hint="cosmetics"
          />
        </Link>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full bg-white/70 backdrop-blur-sm"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-5 w-5", isWishlisted ? "fill-primary text-primary" : "text-gray-500")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <CardTitle className="text-lg font-body font-bold mt-1 leading-tight hover:text-primary">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <div className="flex items-center mt-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-accent fill-accent' : 'text-gray-300'}`} />
                ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">({product.reviewCount})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
