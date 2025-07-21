export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: 'Skincare' | 'Makeup' | 'Haircare' | 'Fragrance';
  image: string;
  images: string[];
  ingredients: string[];
  usage: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
