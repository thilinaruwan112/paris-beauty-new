"use client";

import Link from "next/link";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Heart, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">My Wishlist</h1>
        <p className="text-muted-foreground mt-2">Your collection of must-have items.</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map(product => (
            <div key={product.id} className="group relative">
              <ProductCard product={product} />
              <div className="absolute top-16 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Button size="sm" variant="secondary" onClick={() => handleMoveToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" /> Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
           <div className="mx-auto h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-muted-foreground"/>
            </div>
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-4">
            Explore our products and save your favorites here.
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
