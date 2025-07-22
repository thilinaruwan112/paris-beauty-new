"use client";
import React, { useState, useEffect } from "react";
import config from "@/config";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { PromoCodeData, ApplicableProductData, OrderSummaryProps } from "@/types";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  shippingFee,
  setPromoCode,
  setFinalPayAmount,
  setDiscountAmount,
}) => {
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const newFinalAmount = totalPrice + shippingFee - discount;
    setFinalPayAmount(newFinalAmount);
  }, [totalPrice, shippingFee, discount, setFinalPayAmount]);

  const validateCoupon = async (): Promise<void> => {
    if (!coupon) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    setLoading(true);
    setCouponError("");

    try {
      const promoResponse = await fetch(`${config.API_BASE_URL}/promo_codes/by_code/${coupon}`);
      if(!promoResponse.ok) {
        setCouponError("Invalid coupon code.");
        setLoading(false);
        return;
      }
      const promoData: PromoCodeData = await promoResponse.json();

      if (!promoData.is_active) {
        setCouponError("This promo code is not active.");
        setLoading(false);
        return;
      }

      const now = new Date();
      const startDate = new Date(promoData.start_date);
      const endDate = new Date(promoData.end_date);

      if (now < startDate || now > endDate) {
        setCouponError("This promo code has expired.");
        setLoading(false);
        return;
      }

      if (totalPrice < parseFloat(promoData.min_order_value)) {
        setCouponError(`Minimum order value of LKR ${promoData.min_order_value} is required.`);
        setLoading(false);
        return;
      }

      const applicableProductsResponse = await fetch(`${config.API_BASE_URL}/promo-code-products/get-by-promo-code-active/${coupon}`);
      if (!applicableProductsResponse.ok) throw new Error("Failed to fetch applicable products.");

      const applicableProductsData: ApplicableProductData[] = await applicableProductsResponse.json();
      const applicableProductIds = applicableProductsData.map((p) => p.product_id);

      if (applicableProductIds.length > 0) {
        const notEligibleProducts = cart.filter((item) => !applicableProductIds.includes(item.id));
        if (notEligibleProducts.length > 0) {
          const productNames = notEligibleProducts.slice(0, 2).map((p) => p.name).join(", ");
          const moreMessage = notEligibleProducts.length > 2 ? ` and ${notEligibleProducts.length - 2} more` : "";
          setCouponError(`Coupon not valid for: ${productNames}${moreMessage}.`);
          setLoading(false);
          return;
        }
      }

      const discountValue =
        promoData.discount_type === "percentage"
          ? (totalPrice * parseFloat(promoData.discount_value)) / 100
          : parseFloat(promoData.discount_value);

      const cappedDiscount = promoData.max_discount_value ? Math.min(discountValue, parseFloat(promoData.max_discount_value)) : discountValue;

      setDiscount(cappedDiscount);
      setPromoCode(coupon);
      setDiscountAmount(cappedDiscount);
      setFinalPayAmount(totalPrice + shippingFee - cappedDiscount);
      setCouponError("");
    } catch (error) {
      console.error(error);
      setCouponError("Failed to validate the coupon code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
      
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
        {cart.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <Image
                src={item.image || "/assets/product/placeholder.jpg"}
                alt={item.name}
                width={64}
                height={64}
                className="object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{item.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">LKR {item.price.toFixed(2)}</p>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              LKR {(item.quantity * item.price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Discount code"
            className="w-full p-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={validateCoupon}
            disabled={loading}
            className="px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-r-md font-semibold text-sm transition-colors disabled:bg-gray-500 flex items-center justify-center w-28"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Apply"}
          </button>
        </div>
        {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
        {discount > 0 && <p className="text-green-600 text-xs mt-1">Coupon applied successfully!</p>}
      </div>

      <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>LKR {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Shipping</span>
          <span>{shippingFee > 0 ? `LKR ${shippingFee.toFixed(2)}` : "Free"}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- LKR {discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
        <div className="flex justify-between items-center font-bold text-lg text-gray-900 dark:text-white">
          <span>Total</span>
          <span>LKR {(totalPrice + shippingFee - discount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
