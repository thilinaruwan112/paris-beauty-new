"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { ProductCardProps } from "@/types";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const getBrandName = (brandId: number) => {
    switch (brandId) {
      case 1: return "CeraVe";
      case 2: return "L'Oréal";
      case 3: return "Garnier";
      default: return "Paris Beauty";
    }
  };

  const imageBasePath = "/assets/product/";
  const primaryImage = `${imageBasePath}${product.image_path}`;
  const hoverImage = product.hover_image ? `${imageBasePath}${product.hover_image}` : primaryImage;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col border border-gray-100 dark:border-gray-700/50">
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-50 dark:bg-gray-800">
            <Link href={`/products/${product.slug}`} className="block h-full">
                <Image
                    src={primaryImage}
                    alt={product.product_name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                    src={hoverImage}
                    alt={`${product.product_name} hover`}
                    fill
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
            </Link>
            <button
                onClick={(e) => {
                e.preventDefault();
                onToggleWishlist(product.product_id);
                }}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm transition-all hover:scale-110 hover:bg-white dark:hover:bg-gray-900"
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart
                className={`h-5 w-5 ${
                    isInWishlist
                    ? "text-pink-600 fill-pink-600"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-pink-500"
                }`}
                />
            </button>
        </div>

        <div className="p-3 flex flex-col flex-grow">
          <Link href={`/products/${product.slug}`} className="block">
            <p className="text-xs font-medium text-pink-600 dark:text-pink-400 uppercase truncate mb-1">
                {getBrandName(product.brand_id)}
            </p>

            <h3 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-2 min-h-[2.5rem] group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-colors">
                {product.display_name || product.product_name}
            </h3>
          </Link>
          <div className="mt-auto pt-2 flex items-end justify-between">
              <span className="text-md font-bold text-gray-900 dark:text-white">
                {product.selling_price.toFixed(2)}
              </span>
               <button
                onClick={(e) => {
                    e.preventDefault();
                    onAddToCart(product.product_id);
                }}
                className="flex items-center justify-center bg-gray-100 dark:bg-gray-700/80 hover:bg-pink-500 dark:hover:bg-pink-600 text-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-full transition-all"
            >
                <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
