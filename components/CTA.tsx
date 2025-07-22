"use client";
import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

function CTA() {
  return (
    <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-black py-16 lg:py-24">
      <motion.div 
        className="container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join the Paris Beauty Club
          </h2>
          <p className="text-gray-600 dark:text-gray-300 sm:text-lg mb-8">
            Be the first to know about new arrivals, exclusive sales, and beauty tips. Subscribe to our newsletter and unlock your glow.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-lg">
          <form action="#" className="flex gap-2 items-center bg-white dark:bg-gray-800/50 p-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-700/50">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border-transparent bg-transparent p-3 pl-12 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="group flex-shrink-0 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="hidden sm:inline">Sign Up</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
