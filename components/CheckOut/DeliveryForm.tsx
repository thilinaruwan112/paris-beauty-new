
"use client";
import { useState, ChangeEvent } from "react";
import { DeliveryAddressData, DeliveryFormProps } from "@/types/Checkout";

export default function DeliveryForm({ setDeliveryAddress }: DeliveryFormProps) {
  const [formData, setFormData] = useState<DeliveryAddressData>({
    country: "Sri Lanka",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setDeliveryAddress(updatedFormData);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping Address</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country/Region</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="Sri Lanka">Sri Lanka</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="1234 Main St"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apartment, suite, etc. (optional)</label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

      </form>
    </div>
  );
}

    