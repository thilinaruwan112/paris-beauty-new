"use client";
import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from "react-icons/fa";
import Image from "next/image";

const JoinOur = () => {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src="https://placehold.co/1920x1080.png"
          data-ai-hint="beauty community"
          alt="Community of Luxe users"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-rose-50/50 dark:from-gray-900 dark:to-gray-800/80"></div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Be part of a community that believes beauty should be honest, fun, and empowering. Follow us for tips, news, and to share your journey.
          </p>

          <div className="flex justify-center space-x-4 mb-10">
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-110"
              aria-label="TikTok"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
          </div>

          <a
            href="/shop"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            Shop Our Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinOur;
