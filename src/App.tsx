import { Container, Heading, useDisclosure } from '@chakra-ui/react';
import { PizzaModal } from './features/pizza/PizzaModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { type Pizza, type Ingredient } from './features/data/pizzasData';
import type { CartPizza } from './features/cart/cartTypes';
import { CartButton } from './components/cart/CartButton';
import { PizzaList } from './features/pizza/PizzaList';
import { CartModal } from './features/cart/CartModal';

function App() {
  const pizzaModal = useDisclosure();
  const cartModal = useDisclosure();

  const [selectedPizza, setSelectedPizza] = useLocalStorage<Pizza | null>('selectedPizza', null);
  const [cart, setCart] = useLocalStorage<CartPizza[]>('cart', []);

  const handleAdd = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    pizzaModal.onOpen();
  };

  const handleConfirm = (ingredients: Ingredient[]) => {
    if (!selectedPizza) return;
    const cartItem: CartPizza = {
      id: Date.now(),
      name: selectedPizza.name,
      basePrice: selectedPizza.price,
      ingredients: ingredients,
      image: selectedPizza.image, // Include the image property
    };
    setCart([...cart, cartItem]);
  };

  const clearCart = () => setCart([]);

  return (
    <Container maxW="1440px" py={6} m={'0 auto'}>
      <Heading mb={40} textAlign={'center'} fontSize={36}>
        Конструктор пиццы 🍕
      </Heading>

      <PizzaList onAdd={handleAdd} />

      <PizzaModal
        isOpen={pizzaModal.isOpen}
        onClose={pizzaModal.onClose}
        pizza={selectedPizza}
        onConfirm={handleConfirm}
      />

      <CartButton onClick={cartModal.onOpen} />

      <CartModal isOpen={cartModal.isOpen} onClose={cartModal.onClose} clearCart={clearCart} />
    </Container>
  );
}

export default App;
