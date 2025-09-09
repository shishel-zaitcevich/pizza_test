import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Image, Text, Button, Stack, Box } from '@chakra-ui/react';
export const PizzaCard = ({ pizza, onAdd }) => {
    return (_jsx(Card, { maxWidth: 400, border: "0.5px solid", borderColor: "gray.600", backdropFilter: "blur(20px)", borderRadius: 10, p: 20, position: "relative", overflow: "hidden", bgColor: '#531e33ff', _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/img/1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
            zIndex: -2,
            backdropFilter: 'blur(80px)',
        }, _after: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: -1,
        }, children: _jsx(Card, { children: _jsxs(Stack, { gap: 1, children: [_jsx(Text, { fontWeight: "bold", fontSize: "22px", children: pizza.name }), _jsx(Image, { src: pizza.image, alt: pizza.name, borderRadius: "16px" }), _jsxs(Box, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', w: '100%', mt: 20, children: [_jsxs(Text, { color: "gray.600", children: [pizza.price, " \u0440\u0443\u0431."] }), _jsx(Button, { colorScheme: "teal", onClick: () => onAdd(pizza), h: 42, maxW: 160, borderRadius: 10, cursor: 'pointer', children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })] })] }) }) }));
};
