"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { mockProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!product) {
    notFound();
  }
  
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative rounded-lg overflow-hidden border">
                  <Image src={img} alt={`${product.name} image ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="cosmetics product" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="font-headline text-4xl">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-accent fill-accent' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-2">({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
          
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-muted-foreground mt-4">{product.description}</TabsContent>
            <TabsContent value="ingredients" className="text-muted-foreground mt-4 text-sm">
                <ul className="list-disc list-inside space-y-1">
                    {product.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
            </TabsContent>
            <TabsContent value="usage" className="text-muted-foreground mt-4">{product.usage}</TabsContent>
          </Tabs>

          <div className="flex items-center gap-4">
            <Button size="lg" className="flex-1" onClick={() => addToCart(product)}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleWishlistToggle}>
              <Heart className={cn("mr-2 h-5 w-5", isWishlisted && "fill-primary text-primary")} />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-24">
        <h2 className="font-headline text-3xl text-center mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p}/>
          ))}
        </div>
      </div>
    </div>
  );
}
