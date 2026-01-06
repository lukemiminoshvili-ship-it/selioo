
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  name: string;
  model: string;
  price: number;
  description: string;
  specs: {
    system: string;
    cpu: string;
    core: string;
    gpu: string;
    ram: string;
    rom: string;
    type: string;
  };
  images: string[];
  videoUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}
