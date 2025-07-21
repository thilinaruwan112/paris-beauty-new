"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import OurPromise from './OurPromise';
import JoinOur from './JoinOur';
import OurCollection from './OurCollection';
import { Leaf, Heart, TestTube, Sparkles } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://placehold.co/1920x1080.png"
            data-ai-hint="cosmetics flatlay"
            alt="Beautiful cosmetics flatlay" 
            layout="fill"
            objectFit="cover" 
            quality={100} 
            className="opacity-20 dark:opacity-10"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10">
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
          >
            Beauty with a Conscience
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            We believe in cosmetics that are as honest and natural as your own beauty. Discover our story and what makes us different.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section 
        id="story" 
        className="py-16 lg:py-24 bg-rose-50/50 dark:bg-rose-900/10"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <Image 
                src="https://placehold.co/600x400.png"
                data-ai-hint="cosmetics production"
                alt="The creation of Luxe cosmetics" 
                className="rounded-2xl shadow-xl w-full"
                width={600}
                height={400}
              />
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.5 }}
              className="md:w-1/2"
            >
              <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold mb-6">Our Journey to Pure Beauty</motion.h2>
              <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-4">
                Luxe was born from a simple yet powerful idea: beauty shouldn&apos;t come with compromises. Founded in 2021 by friends frustrated with misleading claims and harsh ingredients, we set out to create something different.
              </motion.p>
              <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300">
                Our journey began with a passion for transparent, genuinely natural solutions. We believe everyone deserves cosmetics that are effective, affordable, and above all, honest.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        className="py-16 lg:py-24"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">Our principles guide every product we create and every decision we make.</motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Leaf, title: "Natural Ingredients", text: "We source the highest quality natural ingredients, ensuring each product is pure and effective." },
              { icon: Heart, title: "Cruelty-Free", text: "We never test on animals. Our commitment to kindness is certified and unwavering." },
              { icon: TestTube, title: "Science-Backed", text: "We blend nature with science to create safe, effective formulas you can trust." },
              { icon: Sparkles, title: "Radiant Results", text: "Our goal is simple: to help you achieve a healthy, radiant glow that feels as good as it looks." }
            ].map((value, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OurPromise/>
      <OurCollection/>
      <JoinOur/>
    </div>
  );
};

export default AboutUsPage;
