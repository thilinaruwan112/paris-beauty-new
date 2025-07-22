"use client";
import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const JoinOur = () => {
  return (
    <section className="py-16 lg:py-24 bg-pink-500">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Become a Paris Beauty Insider
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join our vibrant community for exclusive content, early access to new products, and a celebration of all things beauty. Let&apos;s connect!
        </p>

        <div className="flex justify-center space-x-3 sm:space-x-4 mb-10">
            {[FaInstagram, FaFacebookF, FaTwitter, FaTiktok].map((Icon, index) => (
                 <a
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                    aria-label="Social media link"
                >
                    <Icon className="w-5 h-5" />
                </a>
            ))}
        </div>

        <a
            href="/shop"
            className="group inline-flex items-center justify-center gap-2 bg-white text-pink-600 font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
            Shop The Collections
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default JoinOur;
