"use client";
import React from "react";
import Image from "next/image";

const OurCollection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Each product line is thoughtfully crafted to meet your skin&apos;s unique needs, combining the best of nature and science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="skincare products"
                alt="Luxe skincare collection"
                width={600}
                height={400}
                className="w-full h-80 object-cover transition duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                 <h3 className="text-2xl font-bold text-white">Skincare</h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Our skincare line features gentle, effective formulations designed to nourish and protect. From hydrating serums to blemish-fighting treatments, discover your path to radiant skin.
            </p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="makeup products"
                alt="Luxe makeup collection"
                width={600}
                height={400}
                className="w-full h-80 object-cover transition duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-6">
                 <h3 className="text-2xl font-bold text-white">Makeup</h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Express yourself with our range of makeup that offers brilliant color and reliable performance without compromising on ingredients. Let your natural beauty shine through.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCollection;
