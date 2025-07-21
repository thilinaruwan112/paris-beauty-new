
"use client";
import React, { useState, useEffect } from "react";
import ContactForm from "@/components/CheckOut/ContactForm";
import DeliveryForm from "@/components/CheckOut/DeliveryForm";
import PaymentOptions from "@/components/CheckOut/PaymentOptions";
import BillingAddressForm from "@/components/CheckOut/BillingAddressForm";
import OrderSummary from "@/components/CheckOut/OrderSummary";
import { useCart } from "@/components/CartContext";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Address, OrderData, ContactDetails } from "@/types/Checkout";
import { CartItem } from "@/types/CartItem";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart, getTotalAmount } = useCart();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card");
  const [deliveryAddress, setDeliveryAddress] = useState<Address>({} as Address);
  const [billingAddress, setBillingAddress] = useState<Address>({} as Address);
  const [finalAmount, setFinalPayAmount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [shippingFee] = useState<number>(0); // Assuming free shipping for now
  const [sameAddressStatus, setSameAddressStatus] = useState<number>(1);
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    email: "",
    subscribe: false,
  });
  const [promoCode, setPromoCode] = useState<string | number>(0);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    const cartTotal = getTotalAmount();
    setFinalPayAmount(cartTotal);
  }, [cartItems, getTotalAmount]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlePayment = async (): Promise<void> => {
    if (processing) return;

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.", { position: "top-right" });
      return;
    }

    if (!contactDetails.email || !validateEmail(contactDetails.email)) {
      toast.error("Please enter a valid email address.", { position: "top-right" });
      return;
    }

    if (!deliveryAddress.firstName || !deliveryAddress.lastName || !deliveryAddress.address || !deliveryAddress.city || !deliveryAddress.postalCode) {
      toast.error("Please fill all required delivery address fields.", { position: "top-right" });
      return;
    }

    if (sameAddressStatus === 0 && (!billingAddress.firstName || !billingAddress.lastName || !billingAddress.address || !billingAddress.city || !billingAddress.postalCode)) {
      toast.error("Please fill all required billing address fields.", { position: "top-right" });
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method.", { position: "top-right" });
      return;
    }

    setProcessing(true);

    const orderData: OrderData = {
      items: cartItems as CartItem[],
      totalAmount: finalAmount,
      discountAmount: discountAmount,
      shippingFee: shippingFee,
      promoCode: promoCode,
      paymentMethod: selectedPaymentMethod,
      contactDetails: contactDetails,
      shippingAddress: deliveryAddress,
      billingAddress: sameAddressStatus === 1 ? deliveryAddress : billingAddress,
      sameAddressStatus: sameAddressStatus,
    };

    try {
      const endpoint = selectedPaymentMethod === "cod"
        ? `${config.API_BASE_URL}/payment/initiate-cod-invoice`
        : `${config.API_BASE_URL}/payment/initiate-payment`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (selectedPaymentMethod === "cod") {
        if (response.status === 201) {
          const data = await response.json();
          toast.success("Order placed successfully!", { position: "top-right" });
          clearCart();
          window.location.href = `/order-confirmation?order_id=${data.invoice_id || data.order_id}`;
        } else {
          throw new Error("Failed to create COD invoice.");
        }
      } else {
        if (!response.ok) throw new Error("Order creation failed");
        const html = await response.text();
        const iframeContainer = document.createElement("div");
        iframeContainer.innerHTML = html;
        const form = iframeContainer.querySelector("form");
        if (form) {
          document.body.appendChild(form);
          form.submit();
        } else {
          toast.error("Failed to initiate payment.", { position: "top-right" });
        }
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      toast.error("There was an issue processing your order.", { position: "top-right" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {cartItems.length === 0 ? (
           <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/shop">
              <span className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors">
                Continue Shopping
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Column: Forms */}
            <div className="lg:col-span-7 space-y-8">
              <ContactForm setContactDetails={setContactDetails} />
              <DeliveryForm setDeliveryAddress={setDeliveryAddress} />
              <BillingAddressForm
                shippingAddress={deliveryAddress}
                setBillingAddress={setBillingAddress}
                setSameAddressStatus={setSameAddressStatus}
              />
            </div>
            
            {/* Right Column: Summary & Payment */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-8">
                <OrderSummary
                  cart={cartItems}
                  finalAmount={finalAmount}
                  shippingFee={shippingFee}
                  setPromoCode={setPromoCode}
                  setFinalPayAmount={setFinalPayAmount}
                  setDiscountAmount={setDiscountAmount}
                />
                <PaymentOptions
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                />
                <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full px-6 py-4 text-white rounded-lg text-center font-semibold bg-pink-600 hover:bg-pink-700 transition-colors disabled:bg-pink-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Processing...
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    By clicking &quot;Pay now&quot;, you agree to our Terms of Service and Privacy Policy. All transactions are secure and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </section>
  );
};

export default CheckoutPage;

    