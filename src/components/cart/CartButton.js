import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@chakra-ui/react';
export const CartButton = ({ onClick }) => {
    return (_jsx(Button, { position: 'fixed', right: 40, top: 40, w: 60, background: 'transparent', border: 'none', onClick: onClick, cursor: 'pointer', children: _jsx("img", { src: "/img/\u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439.png", alt: "cart", width: 60 }) }));
};
