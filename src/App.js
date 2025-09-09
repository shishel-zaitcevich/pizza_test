import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Heading, useDisclosure } from '@chakra-ui/react';
import { PizzaModal } from './features/pizza/PizzaModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CartButton } from './components/cart/CartButton';
import { PizzaList } from './features/pizza/PizzaList';
import { CartModal } from './features/cart/CartModal';
function App() {
    const pizzaModal = useDisclosure();
    const cartModal = useDisclosure();
    const [selectedPizza, setSelectedPizza] = useLocalStorage('selectedPizza', null);
    const [cart, setCart] = useLocalStorage('cart', []);
    const handleAdd = (pizza) => {
        setSelectedPizza(pizza);
        pizzaModal.onOpen();
    };
    const handleConfirm = (ingredients) => {
        if (!selectedPizza)
            return;
        const cartItem = {
            id: Date.now(),
            name: selectedPizza.name,
            basePrice: selectedPizza.price,
            ingredients: ingredients,
            image: selectedPizza.image, // Include the image property
        };
        setCart([...cart, cartItem]);
    };
    const clearCart = () => setCart([]);
    return (_jsxs(Container, { maxW: "1440px", py: 6, m: '0 auto', children: [_jsx(Heading, { mb: 40, textAlign: 'center', fontSize: 36, children: "\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u043F\u0438\u0446\u0446\u044B \uD83C\uDF55" }), _jsx(PizzaList, { onAdd: handleAdd }), _jsx(PizzaModal, { isOpen: pizzaModal.isOpen, onClose: pizzaModal.onClose, pizza: selectedPizza, onConfirm: handleConfirm }), _jsx(CartButton, { onClick: cartModal.onOpen }), _jsx(CartModal, { isOpen: cartModal.isOpen, onClose: cartModal.onClose, clearCart: clearCart })] }));
}
export default App;
