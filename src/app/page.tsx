"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { mockProducts } from "@/lib/mock-data";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const allCategories = Array.from(new Set(mockProducts.map(p => p.category)));
const allBrands = Array.from(new Set(mockProducts.map(p => p.brand)));
const maxPrice = Math.max(...mockProducts.map(p => p.price));

export default function Home() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, maxPrice],
  });

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };
  
  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, maxPrice],
    });
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const { categories, brands, priceRange } = filters;
      const [minPrice, maxPrice] = priceRange;

      const categoryMatch = categories.length === 0 || categories.includes(product.category);
      const brandMatch = brands.length === 0 || brands.includes(product.brand);
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;

      return categoryMatch && brandMatch && priceMatch;
    });
  }, [filters]);

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center text-center text-white bg-pink-200">
        <Image 
          src="https://placehold.co/1600x800.png" 
          alt="Woman applying cosmetic product" 
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-50"
          data-ai-hint="cosmetics lifestyle"
        />
        <div className="relative z-10 p-4 bg-black bg-opacity-30 rounded-lg">
          <h1 className="font-headline text-5xl md:text-7xl">Elegance in Every Shade</h1>
          <p className="font-body text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            Discover our curated collection of premium cosmetics, designed to enhance your natural beauty.
          </p>
          <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/80">
            Shop Now
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex justify-between items-center">
                Filters
                <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Category</h3>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`cat-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Brand</h3>
                <div className="space-y-2">
                  {allBrands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Price Range</h3>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">No products match the current filters.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
