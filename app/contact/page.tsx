"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface StatusMessage {
  type: "success" | "error";
  text: string;
}

function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.message) {
      setStatusMessage({
        type: "error",
        text: "Please fill all required fields.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-us`,
        formData
      );

      if (response.status === 201) {
        setStatusMessage({
          type: "success",
          text: "Message sent successfully! We'll be in touch soon.",
        });
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setStatusMessage({
          type: "error",
          text: error.response.data.error,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-rose-50/50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We&apos;re here to help and answer any question you might have. We look forward to hearing from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-gray-800/50 p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50">
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Contact Information</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <div className="space-y-6">
              <a href="tel:0712375455" className="flex items-center group">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-full group-hover:bg-rose-500 transition-colors">
                  <Phone className="h-5 w-5 text-rose-500 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4">
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">071 2 375 455</span>
                </div>
              </a>

              <a href="mailto:info@parisbeauty.lk" className="flex items-center group">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-full group-hover:bg-rose-500 transition-colors">
                  <Mail className="h-5 w-5 text-rose-500 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4">
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">info@parisbeauty.lk</span>
                </div>
              </a>
              
              <div className="flex items-start group">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-full">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    135, West Tower, World Trade Center, Colombo 01, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full name*"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                  required
                />
                 <input
                  type="email"
                  name="email"
                  placeholder="Email address*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                  required
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              />

              <textarea
                name="message"
                placeholder="Your Message*"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-all duration-300 disabled:bg-rose-400 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="h-4 w-4" />}
              </button>

              {statusMessage && (
                <p
                  className={`text-sm text-center mt-4 ${
                    statusMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {statusMessage.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsPage;
