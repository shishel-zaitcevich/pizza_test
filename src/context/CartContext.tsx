import { createContext, useContext } from 'react';
import type { CartPizza } from '../features/cart/cartTypes';

export type CartContextType = {
  cart: CartPizza[];
  setCart: (cart: CartPizza[] | ((prev: CartPizza[]) => CartPizza[])) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
