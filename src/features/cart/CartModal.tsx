import { BaseModal } from '../../components/ui/BaseModal';
import { CartStepper } from './CartStepper';
import { useCart } from '../../context/CartContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal = ({ isOpen, onClose }: Props) => {
  const { clearCart } = useCart();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Корзина">
      <CartStepper clearCart={clearCart} onCloseCart={onClose} />
    </BaseModal>
  );
};
