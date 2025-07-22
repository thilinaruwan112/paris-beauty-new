"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { ProductCardProps } from "@/types"; 

const FeaturedProductCard: React.FC<ProductCardProps> = ({
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
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700/50 hover:border-pink-100 dark:hover:border-pink-800/50">
      <div className="relative w-full h-[270px] sm:h-[220px] md:h-[270px] overflow-hidden bg-gray-50 dark:bg-gray-800">
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
        <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 backdrop-blur-sm">
              {product.category}
            </span>
        </div>
        <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist(product.product_id);
            }}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm transition-all hover:scale-110 hover:bg-white dark:hover:bg-gray-900"
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

        <button
            onClick={(e) => {
                e.preventDefault();
                onAddToCart(product.product_id);
            }}
            className="absolute -bottom-10 group-hover:bottom-3 right-3 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
            <ShoppingBag className="h-4 w-4" />
            <span>Add</span>
        </button>
      </div>

        <div className="p-4 flex flex-col">
            <Link href={`/products/${product.slug}`} className="block">
                <p className="text-sm font-medium text-pink-600 dark:text-pink-400 uppercase truncate mb-1">
                    {getBrandName(product.brand_id)}
                </p>

                <h3 className="text-base font-bold text-gray-800 dark:text-white line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-colors">
                    {product.display_name || product.product_name}
                </h3>
            </Link>

          <div className="mt-auto pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  LKR {product.selling_price.toFixed(2)}
                </span>
              </div>
          </div>
        </div>
    </div>
  );
};

export default FeaturedProductCard;
