
"use client";
import { useState, useEffect } from "react";
import { CreditCard, Truck } from "lucide-react";

interface PaymentOptionsProps {
  setSelectedPaymentMethod: (method: string) => void;
}

type PaymentMethod = "card" | "cod";

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  setSelectedPaymentMethod,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  useEffect(() => {
    setSelectedPaymentMethod(selectedMethod);
  }, [selectedMethod, setSelectedPaymentMethod]);

  const paymentMethods = [
    {
      id: "card",
      title: "Credit/Debit Card",
      description: "Pay securely with PayHere.",
      icon: <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay upon receiving your order.",
      icon: <Truck className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Payment Method</h2>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            onClick={() => setSelectedMethod(method.id as PaymentMethod)}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id as PaymentMethod)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <div className="ml-4 flex-1 flex items-start gap-4">
              {method.icon}
              <div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{method.title}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;

    