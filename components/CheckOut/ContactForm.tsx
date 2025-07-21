
"use client";

import React, { useState, ChangeEvent } from "react";
import { ContactDetails } from "@/types/Checkout";
import Link from "next/link";

interface ContactFormProps {
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
}

const ContactForm: React.FC<ContactFormProps> = ({ setContactDetails }) => {
  const [email, setEmail] = useState<string>("");
  const [subscribe, setSubscribe] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setContactDetails((prevDetails) => ({ ...prevDetails, email: newEmail }));
  };

  const handleSubscribeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSubscribeStatus = e.target.checked;
    setSubscribe(newSubscribeStatus);
    setContactDetails((prevDetails) => ({ ...prevDetails, subscribe: newSubscribeStatus }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Have an account? <Link href="/login" className="text-pink-600 hover:underline">Log in</Link>
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="subscribe"
            checked={subscribe}
            onChange={handleSubscribeChange}
            className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
          />
          <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Email me with news and offers
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

    