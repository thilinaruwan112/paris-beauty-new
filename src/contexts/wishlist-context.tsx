"use client";

import React, { createContext, useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const localData = localStorage.getItem("glamify-wishlist");
      if (localData) {
        setWishlist(JSON.parse(localData));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("glamify-wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage", error);
    }
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
    toast({
      title: "Added to wishlist!",
      description: `${product.name} is now in your wishlist.`,
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    toast({
        title: "Removed from wishlist",
        variant: "destructive"
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}
