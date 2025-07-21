import React from "react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandGrid from "@/components/BrandGrid";
import TrendingProducts from "@/components/TrendingProducts";
import CategoryGrid from "@/components/CategoryGrid";
import CTA from "@/components/CTA";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Paris Beauty | Premium Beauty & Skincare Products Online",
  description:
    "Discover a wide range of premium beauty and skincare products at our Cosmetic Shop. Shop for makeup, skincare, haircare, and more with fast delivery and expert advice.",
  keywords:
    "cosmetic shop, beauty products, skincare, makeup, skincare products, premium cosmetics, online beauty store, skincare online, makeup online, beauty essentials",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <BrandGrid />
      <TrendingProducts />
      <CategoryGrid
        categoryName={"Eyes"}
        searchTerm={"Eyes"}
        toggleBgColor={0}
      />
      <CategoryGrid
        categoryName={"Skincare"}
        searchTerm={"Skincare"}
        toggleBgColor={1}
      />
      <CategoryGrid
        categoryName={"Moisturizers"}
        searchTerm={"Moisturizers"}
        toggleBgColor={0}
      />
      <CTA />
    </div>
  );
}
