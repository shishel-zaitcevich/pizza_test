import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@chakra-ui/react';
import cartImg from '../assets/Безымянный.png';
export const CartButton = ({ onClick }) => {
    return (_jsxs(Button, { position: 'fixed', right: 40, top: 40, w: 60, background: 'transparent', border: 'none', onClick: onClick, cursor: 'pointer', children: [_jsx("img", { src: cartImg, alt: "cart", width: 60 }), ";"] }));
};
