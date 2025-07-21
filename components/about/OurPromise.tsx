"use client";
import React from "react";
import { Leaf, Heart, TestTube, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const OurPromise = () => {
    
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</motion.h2>
          <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            These aren't just words; they're the principles we live by. They guide our formulations, our partnerships, and our promise to you.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Leaf, title: "Pure Ingredients", text: "Harnessing the power of nature, we select only the finest, ethically-sourced botanicals and actives." },
            { icon: Heart, title: "Absolute Kindness", text: "Our love for animals means we are, and always will be, 100% cruelty-free. No exceptions." },
            { icon: TestTube, title: "Proven Efficacy", text: "We unite nature with scientific innovation to deliver formulas that are both safe and remarkably effective." },
            { icon: Sparkles, title: "Authentic Radiance", text: "Our mission is to enhance your natural beauty, empowering you to feel confident and radiant in your own skin." }
          ].map((value, i) => (
            <motion.div 
              key={i} 
              variants={fadeIn} 
              className="group text-center p-6 transition-all duration-300"
            >
              <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-pink-500 group-hover:scale-110">
                    <value.icon className="w-8 h-8 text-pink-500 dark:text-pink-400 transition-colors duration-300 group-hover:text-white" />
                  </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurPromise;
