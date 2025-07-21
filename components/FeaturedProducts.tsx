"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FeaturedProductCard from "./common/FeaturedProductCard";
import TitleHeader from "@/components/TitleHeader";
import { useCart } from "./CartContext";
import { Product } from "@/types/product"; 
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );

        let productsData = response.data;

        if (!Array.isArray(productsData)) {
            if (productsData?.data && Array.isArray(productsData.data)) {
                productsData = productsData.data;
            } else {
                 throw new Error("Unexpected response format");
            }
        }
        
        const validProducts = (productsData as unknown[]).filter(
          (product): product is Product => {
            return (
              typeof product === "object" &&
              product !== null &&
              "product_id" in product &&
              ("product_name" in product || "display_name" in product)
            );
          }
        ).slice(0, 4); // Take first 4 as featured

        setProducts(validProducts);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find(
      (product) => product.product_id === productId
    );
    if (!productToAdd) return;

    const newCartItem = {
      id: productId,
      name: productToAdd.display_name || productToAdd.product_name,
      price: productToAdd.selling_price,
      quantity: 1,
      image: `/assets/product/${productToAdd.image_path}`,
    };

    addToCart(newCartItem);
    openCart();
    toast.success(
      `${productToAdd.display_name || productToAdd.product_name} added to cart!`
    );
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-12 flex justify-center items-center">
          <div className="animate-pulse text-lg text-gray-500">Loading featured products...</div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="py-12 text-center text-red-600 dark:text-red-400">
          {error}
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="py-12 text-center text-gray-500">
            No featured products available at this time.
        </div>
      );
    }

    return (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
            {products.map((product) => (
                <motion.div key={product.product_id} variants={itemVariants}>
                    <FeaturedProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                        isInWishlist={wishlist.includes(product.product_id)}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
  };


  return (
    <section className="py-16 lg:py-24 bg-rose-50/30 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TitleHeader
          title="Featured Products"
          description="Shop premium cosmetics at Paris Beauty. Explore top skincare and makeup products from trusted beauty brands."
        />
        {renderContent()}
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  );
}
