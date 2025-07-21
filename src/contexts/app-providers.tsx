"use client";

import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
}
