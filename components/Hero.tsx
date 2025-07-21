"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Define the type for each slide
interface Slide {
  id: number;
  image: string;
  mini_image: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  promotion: string;
  discount: string;
  link: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize); // update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides: Slide[] = [
    {
      id: 1,
      image: "https://placehold.co/1920x680.png",
      mini_image: "https://placehold.co/600x800.png",
      title: "Discover Your",
      titleAccent: "Natural Beauty",
      subtitle:
        "Elevate your skincare and makeup game with our premium, naturally-derived cosmetics — curated for glow and grace.",
      promotion: "NEW ARRIVALS",
      discount: "Up to 30% OFF",
      link: "/products/the-ordinary-nicinamide",
    },
    {
      id: 2,
      image: "https://placehold.co/1920x680.png",
      mini_image: "https://placehold.co/600x800.png",
      title: "Luxury",
      titleAccent: "Skincare Collection",
      subtitle:
        "Transform your daily routine with our scientifically-formulated skincare essentials for radiant, healthy-looking skin.",
      promotion: "BESTSELLER",
      discount: "Limited Time Only",
      link: "/shop",
    },
    {
      id: 3,
      image: "https://placehold.co/1920x680.png",
      mini_image: "https://placehold.co/600x800.png",
      title: "Professional",
      titleAccent: "Makeup Line",
      subtitle:
        "Create stunning looks with our high-performance makeup collection designed by professionals for everyday elegance.",
      promotion: "EXCLUSIVE",
      discount: "Buy 2 Get 1 Free",
      link: "/shop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[50vh] sm:h-[650px] w-full overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={isMobile ? slide.mini_image : slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            data-ai-hint="beautiful woman cosmetics"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10"></div>
        </div>
      ))}

      <div className="relative z-10 h-full container mx-auto px-6 sm:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-fade-in-up">
              {slides[currentSlide].promotion}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-2xl mb-4 animate-fade-in">
            {slides[currentSlide].title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              {slides[currentSlide].titleAccent}
            </span>
          </h1>

          <p className="text-gray-200 text-md sm:text-lg mb-8 leading-relaxed drop-shadow-lg max-w-lg animate-fade-in-up animation-delay-300">
            {slides[currentSlide].subtitle}
          </p>

          <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 animate-fade-in-up animation-delay-500">
            <Link href={slides[currentSlide].link}>
              <button className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-base font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
