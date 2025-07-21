import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Eye, Flame, Zap, ArrowRight } from "lucide-react";
import { TrendingProductCardProps } from "@/types/product"; 

const TrendingProductCard: React.FC<TrendingProductCardProps> = ({
  product,
  onToggleWishlist,
  isInWishlist = false,
  salesCount = Math.floor(Math.random() * 1000) + 1,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Create image array from product data
  const primaryImage = `/assets/product/${product.image_path}`;
  const hoverImage = product.hover_image ? `/assets/product/${product.hover_image}` : primaryImage;
  const hasMultipleImages = product.hover_image ? true : false;
  
  const discountPercent =
    product.special_promo === 1
      ? Math.round(
          ((product.price_2 - product.selling_price) / product.price_2) * 100
        )
      : Math.round(
          ((product.wholesale_price - product.selling_price) /
            product.wholesale_price) *
            100
        );

  const originalPrice =
    product.special_promo === 1 ? product.price_2 : product.wholesale_price;
  const currentPrice = product.selling_price;
  const rating = parseFloat(product.rating);

  return (
    <div
      className="group relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-pink-100 dark:hover:border-pink-800/50 h-full flex flex-col"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
         <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white py-1.5 px-3 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold">
              <Zap className="h-3 w-3" />
              <span>TRENDING</span>
            </div>
          </div>
        
        <Link href={`/products/${product.slug}`} className="block w-full h-72">
            <Image
                src={primaryImage}
                alt={product.display_name}
                fill
                className={`object-cover transform transition-all duration-500 ${
                    isHovering && hasMultipleImages
                    ? "opacity-0 scale-110"
                    : "opacity-100 scale-100"
                } group-hover:scale-105`}
            />
            {hasMultipleImages && (
            <Image
                src={hoverImage}
                alt={`${product.display_name} - alternate view`}
                fill
                className={`absolute inset-0 object-cover transform transition-all duration-500 ${
                isHovering ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
            />
            )}
        </Link>

        <div className="absolute top-3 right-3 z-20 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5 border border-white/20">
          <Flame className="h-4 w-4 text-orange-300" />
          <span>{salesCount} sold</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">
          {product.category}
        </span>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[3rem] group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-colors">
          {product.display_name}
        </h3>

        <div className="flex items-center gap-3 my-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {rating.toFixed(1)} ({product.review})
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Intl.NumberFormat("en-LK", {
                  style: "currency",
                  currency: "LKR",
                }).format(currentPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  {new Intl.NumberFormat("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  }).format(originalPrice)}
                </span>
              )}
            </div>

            <Link href={`/products/${product.slug}`}>
              <button className="group/btn bg-gray-100 dark:bg-gray-700 hover:bg-pink-500 dark:hover:bg-pink-600 text-gray-600 dark:text-gray-300 hover:text-white p-3 rounded-full transition-all">
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProductCard;
