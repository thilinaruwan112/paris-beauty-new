
"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  ChevronRight,
  CheckCircle,
  Truck,
  ShieldCheck,
  Send,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Image from "next/image";

import { CartItem } from "@/types/CartItem";
import { useCart } from "./CartContext";
import { FormattedProduct, ProductReview } from "@/types/ViewProduct";

const getImagePath = (imagePath: string): string => {
  if (!imagePath || imagePath.includes("placeholder")) {
    return "/assets/product/No_Image_Available.jpg";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  if (imagePath.startsWith("/assets/product/")) {
    return imagePath;
  }

  const filename = imagePath.split('/').pop();
  return `/assets/product/${filename}`;
};

export default function ProductView({ product }: { product: FormattedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews || []);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewUser, setReviewUser] = useState("");
  
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    if (product && product.images) {
      const uniqueImages = Array.from(new Set(product.images.filter(img => img && !img.includes('placeholder'))));
      const validImages = uniqueImages.map(getImagePath);
      
      while(validImages.length < 4 && validImages.length > 0) {
        validImages.push(validImages[0]);
      }

      setProcessedImages(validImages.length > 0 ? validImages : ['/assets/product/No_Image_Available.jpg']);
      setSelectedImage(0);
    }
  }, [product]);
  
  useEffect(() => {
    setReviews(product.reviews || []);
  }, [product.reviews]);

  const handleImageError = (index: number) => {
    setProcessedImages((current) => {
      const updated = [...current];
      updated[index] = "/assets/product/No_Image_Available.jpg";
      return updated;
    });
  };

  const handleAddToCart = () => {
    const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: processedImages[0] || "/assets/product/No_Image_Available.jpg",
    };
    addToCart(newCartItem);
    toast.success(`${product.name} added to cart!`);
    openCart();
    setQuantity(1);
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0 || !reviewComment.trim() || !reviewUser.trim() || !reviewTitle.trim()) {
        toast.error("Please fill all review fields and select a rating.");
        return;
    }
    const newReview: ProductReview = {
        id: reviews.length + 1,
        user: reviewUser,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        date: new Date().toISOString().split("T")[0],
        verified: true, // Assuming verification for this simulation
        helpful: 0,
    };
    // Prepend the new review to the list for immediate feedback
    setReviews([newReview, ...reviews]);

    // Reset form
    setReviewRating(0);
    setReviewTitle("");
    setReviewComment("");
    setReviewUser("");
    toast.success("Thank you! Your review has been submitted.");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            {product.breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="h-4 w-4" />}
                <Link href={index === 0 ? "/" : "/shop"} className="hover:text-pink-600 transition-colors">
                  {crumb}
                </Link>
              </React.Fragment>
            ))}
             <ChevronRight className="h-4 w-4" />
             <span className="text-gray-800 dark:text-gray-200 font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <Image
                  src={processedImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  width={800}
                  height={800}
                  onError={() => handleImageError(selectedImage)}
                  priority
                />
              </div>
              {processedImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {processedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-pink-500 shadow-md"
                          : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                        onError={() => handleImageError(index)}
                      />
                       <div className={`absolute inset-0 transition-all ${selectedImage === index ? 'bg-black/10' : 'bg-black/40 group-hover:bg-black/20'}`}></div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <span className="inline-block bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {product.rating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
              
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                LKR {product.price.toFixed(2)}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 dark:text-gray-400 hover:text-pink-600 transition-colors" aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 dark:text-gray-400 hover:text-pink-600 transition-colors" aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500"/>
                    <span className="text-gray-700 dark:text-gray-300">In Stock & Ready to Ship</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-500"/>
                    <span className="text-gray-700 dark:text-gray-300">Free Shipping on orders over LKR 5000</span>
                </div>
              </div>

            </div>
          </div>

          {/* Details Tabs */}
          <div className="mt-16 lg:mt-24">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8" role="tablist">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`py-4 px-1 border-b-2 font-semibold text-sm capitalize transition-all ${
                      activeTab === tab
                        ? "border-pink-600 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="py-8">
              {activeTab === "description" && (
                <div className="prose prose-pink dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p className="whitespace-pre-line">{product.longDescription || product.description}</p>
                </div>
              )}
              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{key.replace(/_/g, ' ')}</dt>
                      <dd className="mt-1 text-gray-900 dark:text-white font-semibold">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </dd>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-6">
                                <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg">
                                        {review.user.charAt(0)}
                                    </div>
                                <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                                            </div>
                                            <div className="flex items-center" aria-label={`Rated ${review.rating} out of 5 stars`}>
                                                {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <h5 className="font-semibold mt-2 mb-1">{review.title}</h5>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                                </div>
                                </div>
                            </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No reviews yet. Be the first to share your thoughts!</p>
                        )}
                    </div>
                    <div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                           <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Write a Review</h3>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="reviewUser" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                                    <input type="text" id="reviewUser" value={reviewUser} onChange={(e) => setReviewUser(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Rating</label>
                                    <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button type="button" key={star} onClick={() => setReviewRating(star)} className="focus:outline-none">
                                            <Star className={`h-6 w-6 cursor-pointer transition-colors ${reviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />
                                        </button>
                                    ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Review Title</label>
                                    <input type="text" id="reviewTitle" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                                </div>
                                <div>
                                    <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Review</label>
                                    <textarea id="reviewComment" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={4} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <Send className="h-4 w-4" />
                                    <span>Submit Review</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}
