import { BaseModal } from '../../components/ui/BaseModal';
import { CartStepper } from './CartStepper';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  clearCart: () => void;
};

export const CartModal = ({ isOpen, onClose, clearCart }: Props) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Корзина">
      <CartStepper clearCart={clearCart} />
    </BaseModal>
  );
};
