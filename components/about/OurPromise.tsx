"use client";
import React from "react";
import Image from "next/image";

const OurPromise = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Promise to You</h2>
        <div className="w-24 h-1 bg-pink-400 mx-auto mb-8"></div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic leading-relaxed">
          &quot;Every product is crafted with integrity. When we say natural, we mean it. When we claim a benefit, we&apos;ve tested it. We create products we use ourselves and proudly share with our friends and family.&quot;
        </p>

        <div className="flex justify-center mb-6">
           <Image
            src="/assets/content/LogoHorizontal-optimized.png"
            alt="Paris Beauty Logo"
            width={112}
            height={40}
            className="w-28"
            priority
          />
        </div>
        
        <p className="text-2xl font-light text-pink-600 dark:text-pink-400">
          Naturally Beautiful, Genuinely You.
        </p>
      </div>
    </section>
  );
};

export default OurPromise;
