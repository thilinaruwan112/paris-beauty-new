"use client";
import React, { useState, ChangeEvent } from "react";
import { Address, BillingAddressFormProps } from "@/types";

export default function BillingAddressForm({
  shippingAddress,
  setBillingAddress,
  setSameAddressStatus,
}: BillingAddressFormProps) {
  const [useDifferentAddress, setUseDifferentAddress] = useState<boolean>(false);
  const [billingFormData, setBillingFormData] = useState<Address>({
    country: "Sri Lanka",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...billingFormData, [name]: value };
    setBillingFormData(updatedFormData);

    if (useDifferentAddress) {
      setBillingAddress(updatedFormData);
    }
  };

  const handleAddressToggle = (useDifferent: boolean) => {
    setUseDifferentAddress(useDifferent);
    if (!useDifferent) {
      setBillingAddress(shippingAddress);
      setSameAddressStatus(1);
    } else {
      setBillingAddress(billingFormData);
      setSameAddressStatus(0);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Billing Address</h2>
      <div className="space-y-4">
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            !useDifferentAddress ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <input
            type="radio"
            name="billingAddress"
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            checked={!useDifferentAddress}
            onChange={() => handleAddressToggle(false)}
          />
          <span className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-200">Same as shipping address</span>
        </label>
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            useDifferentAddress ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <input
            type="radio"
            name="billingAddress"
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            checked={useDifferentAddress}
            onChange={() => handleAddressToggle(true)}
          />
          <span className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-200">Use a different billing address</span>
        </label>
      </div>

      {useDifferentAddress && (
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="billing_country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country/Region</label>
            <select
              id="billing_country"
              name="country"
              value={billingFormData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="Sri Lanka">Sri Lanka</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="billing_firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
              <input
                type="text"
                id="billing_firstName"
                name="firstName"
                value={billingFormData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="billing_lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
              <input
                type="text"
                id="billing_lastName"
                name="lastName"
                value={billingFormData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="billing_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <input
              type="text"
              id="billing_address"
              name="address"
              value={billingFormData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="billing_city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
              <input
                type="text"
                id="billing_city"
                name="city"
                value={billingFormData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="billing_postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
              <input
                type="text"
                id="billing_postalCode"
                name="postalCode"
                value={billingFormData.postalCode}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
