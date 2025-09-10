import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartPizza } from '../features/cart/cartTypes';
import { CartContext } from './CartContext';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartPizza[]>('cart', []);

  const clearCart = () => {
    console.log('[CartProvider] Очистка корзины');
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart }}>{children}</CartContext.Provider>
  );
}
