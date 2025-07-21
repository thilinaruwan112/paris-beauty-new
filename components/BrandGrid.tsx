import React from "react";
import Image from "next/image";
import TitleHeader from "@/components/TitleHeader";
import { motion } from "framer-motion";

const brands = [
  {
    name: "The Ordinary",
    logo: "/assets/logo/ordinary-logo.png",
  },
  {
    name: "L'Oréal Paris",
    logo: "/assets/logo/loral-logo.png",
  },
  {
    name: "CeraVe",
    logo: "/assets/logo/cerave-logo.png",
  },
  {
    name: "Cetaphil",
    logo: "/assets/logo/Cetaphil_Logo_285.png",
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function BrandGrid() {
  return (
    <div className="bg-white dark:bg-gray-950 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TitleHeader
          title="Our Trusted Brands"
          description="Discover premium beauty from brands that deliver exceptional results and quality you can trust."
        />

        <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          {brands.map((brand) => (
            <motion.div 
                key={brand.name} 
                className="group"
                variants={itemVariants}
            >
              <a href="#" className="block p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-pink-200 dark:hover:border-pink-700 hover:-translate-y-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative h-24 w-full mb-4 transition-transform duration-300 group-hover:scale-105">
                     <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-pink-600 dark:group-hover:text-pink-400">
                    {brand.name}
                  </h3>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
