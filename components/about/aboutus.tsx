"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import OurPromise from './OurPromise';
import JoinOur from './JoinOur';
import OurCollection from './OurCollection';
import { Leaf, Heart, TestTube, Sparkles, Milestone, Target, Users } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const timelineItem = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-sans bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-24 md:py-32 text-center bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-6 z-10">
          <p className="text-pink-500 font-semibold mb-2">THE PARIS BEAUTY STORY</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Beyond the Surface
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're crafting the future of beauty: a world where elegance, ethics, and efficacy exist in perfect harmony.
          </p>
        </div>
      </motion.section>

      {/* Intro Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <Image 
                src="https://placehold.co/600x400.png"
                data-ai-hint="elegant cosmetics"
                alt="Elegant product arrangement" 
                className="rounded-lg shadow-2xl w-full"
                width={600}
                height={400}
              />
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.5 }}
              className="lg:w-1/2 max-w-2xl text-center lg:text-left"
            >
              <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold mb-6">Redefining Beauty Standards</motion.h2>
              <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Paris Beauty began not just as a brand, but as a movement. A movement towards conscious beauty that empowers and inspires. We saw a world of complex ingredient lists and impossible standards, and we chose a different path.
              </motion.p>
              <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our philosophy is simple: create luxurious, high-performance cosmetics with uncompromising integrity. For us, true beauty is a reflection of your confidence, and our products are designed to let that shine.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 lg:py-24 bg-rose-50/50 dark:bg-rose-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400">From a bold idea to a beloved brand, our story has been one of passion and purpose.</p>
          </div>

          <div className="relative">
             {/* The vertical line */}
            <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-pink-200 dark:bg-pink-800/50 transform md:-translate-x-1/2"></div>
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              variants={staggerContainer}
              viewport={{ once: true }}
              className="space-y-16"
            >
              {[
                { icon: Milestone, year: "2021", title: "The Spark", text: "Paris Beauty is founded on the principle of 'Conscious Luxury', starting with our first signature serum." },
                { icon: Target, year: "2022", title: "Defining Our Mission", text: "We solidify our commitment to 100% cruelty-free and ethically sourced ingredients, earning our first certifications." },
                { icon: Users, year: "2023", title: "Community & Growth", text: "Our community grows to over 100,000 strong. We expand our line to include a full range of skincare and makeup." },
                { icon: Sparkles, year: "2024", title: "The Future of Beauty", text: "Launching our new eco-friendly packaging and refill programs, we continue to innovate for a more beautiful world." },
              ].map((item, index) => (
                <motion.div key={index} variants={timelineItem} className="relative flex items-start md:items-center gap-6">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5"/>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full">
                    <p className="text-pink-500 font-semibold mb-1">{item.year}</p>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <OurPromise/>
      <OurCollection/>
      <JoinOur/>
    </div>
  );
};

export default AboutUsPage;
