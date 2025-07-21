
"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../common/ProductCard";
import SideBar from "./SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../CartContext";
import { Filters } from "@/types/shop";
import { Product } from "@/types/product";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filterActive, setFilterActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    ratings: [],
    onSale: false,
    priceRange: [0, 300],
    sort: "newest",
  });
  const [isFiltering, setIsFiltering] = useState(false);

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        const productsData = (response.data?.data && Array.isArray(response.data.data)) ? response.data.data : Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
        setFilteredProducts(productsData); 
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    const applyFilters = async () => {
      let tempProducts = [...products];

      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        try {
          const categoryResponses = await Promise.all(
            filters.categories.map(cat =>
              axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/search/category?term=${cat}`)
            )
          );
          const categoryProducts = categoryResponses.flatMap(res => res.data?.data || (Array.isArray(res.data) ? res.data : []));
          const uniqueIds = new Set(categoryProducts.map(p => p.product_id));
          tempProducts = products.filter(p => uniqueIds.has(p.product_id));
        } catch(e) {
            console.error("Failed to filter by category", e);
        }
      }

      // Price range
      if (filters.priceRange) {
        tempProducts = tempProducts.filter(
          p => p.selling_price >= filters.priceRange![0] && p.selling_price <= filters.priceRange![1]
        );
      }

      // Rating
      if (filters.ratings && filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        tempProducts = tempProducts.filter(p => parseFloat(p.rating) >= minRating);
      }

      // On Sale
      if (filters.onSale) {
        tempProducts = tempProducts.filter(p => p.special_promo > 0);
      }

      // Sorting
      if (filters.sort) {
        tempProducts.sort((a, b) => {
          switch (filters.sort) {
            case "price_asc": return a.selling_price - b.selling_price;
            case "price_desc": return b.selling_price - a.selling_price;
            case "newest": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case "oldest": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            default: return 0;
          }
        });
      }
      
      setFilteredProducts(tempProducts);
      setTimeout(() => setIsFiltering(false), 300);
    };

    applyFilters();
  }, [filters, products]);
  
  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find(p => p.product_id === productId);
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
    toast.success(`${productToAdd.display_name || productToAdd.product_name} added to cart!`);
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const handleFilterChange = (filterType: string, value: unknown) => {
    if (filterType === "resetAll") {
      setFilters({
        categories: [],
        brands: [],
        ratings: [],
        onSale: false,
        priceRange: [0, 300],
        sort: "newest",
      });
      return;
    }
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "tween", ease: "easeInOut", duration: 0.3 } },
    closed: { x: "-100%", transition: { type: "tween", ease: "easeInOut", duration: 0.3 } },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Our Collection
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Explore our curated selection of premium cosmetics. Your new beauty favorites are waiting.
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setFilterActive(true)}
            className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-gray-800 dark:text-gray-200">{filteredProducts.length}</span> of <span className="font-bold text-gray-800 dark:text-gray-200">{products.length}</span> products
          </p>
        </div>

        <AnimatePresence>
          {filterActive && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterActive(false)}
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar */}
          <motion.div
            className="hidden lg:block lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
              <SideBar onFilterChange={handleFilterChange} activeFilters={filters} />
            </div>
          </motion.div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {filterActive && (
              <motion.div
                className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-900">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
                  <button onClick={() => setFilterActive(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="p-4">
                  <SideBar onFilterChange={handleFilterChange} activeFilters={filters} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-pink-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={JSON.stringify(filters)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ${isFiltering ? 'opacity-50' : 'opacity-100'} transition-opacity`}
                >
                  {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <motion.div key={product.product_id} variants={itemVariants}>
                          <ProductCard
                            product={product}
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={handleToggleWishlist}
                            isInWishlist={wishlist.includes(product.product_id)}
                          />
                        </motion.div>
                      ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Products Found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters to find what you&apos;re looking for.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </div>
  );
};

export default Shop;

    