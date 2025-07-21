"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const OurCollection = () => {

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Curated For You
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            From essential daily care to transformative treatments, our collections are a celebration of effective, feel-good beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={cardVariant}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="skincare products"
              alt="Luxe skincare collection"
              width={600}
              height={400}
              className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-bold mb-2">Skincare</h3>
              <p className="mb-4 opacity-90">Nourish, protect, and rejuvenate with formulas that love your skin.</p>
              <a href="/shop" className="font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore Skincare <ArrowRight className="w-4 h-4"/>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={cardVariant}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="makeup products"
              alt="Luxe makeup collection"
              width={600}
              height={400}
              className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-bold mb-2">Makeup</h3>
              <p className="mb-4 opacity-90">Express your artistry with vibrant, long-lasting color that cares.</p>
               <a href="/shop" className="font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Discover Makeup <ArrowRight className="w-4 h-4"/>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurCollection;
