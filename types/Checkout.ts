
import { CartItem } from "./CartItem";

export interface ContactDetails {
  email: string;
  subscribe: boolean;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state?: string;
  country?: string;
  postalCode: string;
  phone?: string;
}

export interface OrderData {
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  promoCode: string | number;
  paymentMethod: string;
  contactDetails: ContactDetails;
  shippingAddress: Address;
  billingAddress: Address;
  sameAddressStatus: number;
}

export interface AddressData {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state?: string;
  country?: string;
  postalCode: string;
  phone?: string;
}

export interface BillingAddressFormProps {
  shippingAddress: AddressData;
  setBillingAddress: (address: AddressData) => void;
  setSameAddressStatus: (status: number) => void;
}

export interface DeliveryAddressData {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface DeliveryFormProps {
  setDeliveryAddress: (address: DeliveryAddressData) => void;
}

export interface PromoCodeData {
  is_active: boolean;
  start_date: string;
  end_date: string;
  min_order_value: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  max_discount_value?: string;
}

export interface ApplicableProductData {
  product_id: string | number;
}

export interface OrderSummaryProps {
  cart: CartItem[];
  finalAmount: number;
  shippingFee: number;
  setPromoCode: (code: string) => void;
  setFinalPayAmount: (amount: number) => void;
  setDiscountAmount: (amount: number) => void;
}

    