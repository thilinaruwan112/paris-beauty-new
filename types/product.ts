import { JSX } from "react";

// =================================================================
// Product Types
// =================================================================

export interface Product {
  product_id: number;
  product_code: string;
  product_name: string;
  slug: string;
  display_name: string;
  name_si: string;
  name_ti: string;
  print_name: string;
  section_id: number;
  department_id: number;
  category_id: number;
  brand_id: number;
  measurement: string;
  reorder_level: number;
  lead_days: number;
  cost_price: number;
  selling_price: number;
  minimum_price: number;
  wholesale_price: number;
  price_2: number;
  item_type: string;
  item_location: string;
  image_path: string;
  created_by: string;
  created_at: string;
  active_status: number;
  generic_id: string | null;
  supplier_list: string;
  size_id: number;
  color_id: number | null;
  product_description: string;
  how_to_use: string | null;
  recipe_type: string;
  barcode: string;
  expiry_good: number;
  location_list: string;
  opening_stock: number;
  special_promo: number;
  special_promo_type: string;
  special_promo_message: string | null;
  rating: string;
  review: number;
  long_description: string;
  benefits: string;
  specifications: string;
  category: string;
  meta_description: string | null;
  reviews: string | null;
  hover_image: string | null;
}

export interface ProductSpecifications {
  ingredients?: string[];
  skin_type?: string[];
  [key: string]: string[] | string | undefined; 
}

export interface ProductReview {
  id?: number;
  user: string;
  rating: number;
  title?: string;
  comment: string;
  date?: string;
  timestamp?: string;
  verified?: boolean;
  helpful?: number;
}

export interface FormattedProduct {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  reviews: ProductReview[];
  description: string;
  longDescription: string;
  benefits: string[];
  specifications: ProductSpecifications;
  images: string[];
  breadcrumbs: string[];
}

// =================================================================
// Component Prop Types
// =================================================================

export interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
}

export interface ProductCategoryViewProps {
  categoryName: string;
  searchTerm?: string;
  initialData?: any;
  toggleBgColor: number
}

export interface TrendingProductCardProps {
  product: Product;
  onToggleWishlist?: (productId: number) => void;
  isInWishlist?: boolean;
  salesCount?: number;
}

// =================================================================
// Cart Types
// =================================================================

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getCartCount: () => number;
  getTotalAmount: () => number;
}

export interface CartRowProps {
  item: CartItem;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

// =================================================================
// Checkout Types
// =================================================================

export interface ContactDetails {
  email: string;
  subscribe: boolean;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
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

export interface BillingAddressFormProps {
  shippingAddress: Address;
  setBillingAddress: (address: Address) => void;
  setSameAddressStatus: (status: number) => void;
}

export interface DeliveryFormProps {
  setDeliveryAddress: (address: Address) => void;
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

// =================================================================
// Shop & Filter Types
// =================================================================

export interface Filters {
  priceRange?: [number, number];
  categories?: string[];
  brands?: string[];
  ratings?: number[];
  onSale?: boolean;
  sort?: string;
}

export interface ActiveFiltersProps {
  activeFilters: Filters;
  onRemoveFilter: (type: string, value?: string | number) => void;
}

export interface SideBarProps {
  onFilterChange: (filterType: string, value: any) => void;
  activeFilters: Filters;
}

export interface Category {
  icon: JSX.Element;
  label: string;
  count: number;
}

export interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

export interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange?: (value: [number, number]) => void;
}

export interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  count?: number;
  onToggle?: () => void;
}

export interface SortDropdownProps {
  onChange: (sortOption: string) => void;
  currentSort: string;
}