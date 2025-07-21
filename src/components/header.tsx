"use client";

import Link from "next/link";
import { Search, Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { CartSheet } from "./cart-sheet";
import { useState } from "react";

export function SiteHeader() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl sm:inline-block">
              Glamify
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
            Shop
          </Link>
          <Link href="/#categories" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Categories
          </Link>
          <Link href="/#new-arrivals" className="transition-colors hover:text-foreground/80 text-foreground/60">
            New Arrivals
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                 <Badge variant="destructive" className="absolute top-1 right-1 h-4 w-4 justify-center p-0 text-xs">
                    {wishlist.length}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
                 <Badge variant="destructive" className="absolute top-1 right-1 h-4 w-4 justify-center p-0 text-xs">
                    {cartItemCount}
                </Badge>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Button>
        </div>
      </div>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
