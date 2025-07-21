"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/common/ProductCard";
import { Product, ProductCategoryViewProps } from "@/types";
import CollectionHeader from "@/components/CollectionHeader";
import { motion } from "framer-motion";

export default function ProductCategoryView({
  searchTerm = "serum",
  categoryName,
  toggleBgColor = 0,
}: ProductCategoryViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/search/category?term=${searchTerm}`
        );

        let productsData = response.data;
        if (productsData?.success && Array.isArray(productsData.data)) {
          productsData = productsData.data;
        } else if (!Array.isArray(productsData)) {
            productsData = [];
        }

        setProducts(productsData.slice(0, 4)); // Limit to 4 products
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }
    if (products.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-300">
            No products found for &quot;{searchTerm}&quot;.
          </p>
        </div>
      );
    }
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {products.map((product) => (
          <motion.div key={product.product_id} className="h-full" variants={itemVariants}>
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={isInWishlist(product.product_id)}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <section
      className={`py-16 lg:py-24 transition-colors ${
        toggleBgColor
          ? "bg-rose-50/30 dark:bg-gray-900"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <CollectionHeader
            title={categoryName}
            description={`Explore our handpicked selection of ${categoryName.toLowerCase()} essentials.`}
          />
           <a href="/shop" className="hidden sm:inline-block bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition-colors font-semibold">
              View All
            </a>
        </div>
        {renderContent()}
      </div>
    </section>
  );
}
