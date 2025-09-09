import { jsx as _jsx } from "react/jsx-runtime";
import { BaseModal } from '../../components/ui/BaseModal';
import { CartStepper } from './CartStepper';
export const CartModal = ({ isOpen, onClose, clearCart }) => {
    return (_jsx(BaseModal, { isOpen: isOpen, onClose: onClose, title: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430", children: _jsx(CartStepper, { clearCart: clearCart }) }));
};
