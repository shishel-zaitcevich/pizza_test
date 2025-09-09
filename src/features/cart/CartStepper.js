import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepSeparator, StepIcon, Box, Button, Stack, Input, Text, useToast, Flex, Image, } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItem } from '../../components/cart/CartItem';
export const CartStepper = ({ clearCart }) => {
    const steps = ['Заказ', 'Данные', 'Подтверждение'];
    const [cart, setCart] = useLocalStorage('cart', []);
    const [step, setStep] = useSessionStorage('step', 0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const toast = useToast();
    const handleIngredientsChange = useCallback((id, ingredients) => {
        setCart((prevCart) => prevCart.map((p) => (p.id === id ? { ...p, ingredients } : p)));
    }, [setCart]);
    const total = useMemo(() => cart.reduce((sum, item) => sum + item.basePrice + item.ingredients.reduce((s, i) => s + i.price, 0), 0), [cart]);
    const formatPhone = (val) => {
        const digits = val.replace(/\D/g, '').slice(0, 11);
        let res = '+7 ';
        if (digits.length > 1)
            res += `(${digits.slice(1, 4)}`;
        if (digits.length >= 4)
            res += `) ${digits.slice(4, 7)}`;
        if (digits.length >= 7)
            res += `-${digits.slice(7, 9)}`;
        if (digits.length >= 9)
            res += `-${digits.slice(9, 11)}`;
        return res;
    };
    const handleConfirm = () => {
        toast({ title: 'Заказ оформлен!', status: 'success', duration: 3000 });
        clearCart();
        setStep(0);
    };
    const defaultPizzaImage = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&fit=crop';
    return (_jsxs(Box, { mt: 6, display: "flex", flexDirection: 'column', justifyContent: "center", minHeight: "100px", w: '100%', children: [_jsx(Stepper, { index: step, size: "lg", orientation: "horizontal", display: "flex", alignItems: "center", justifyContent: "space-between", w: 400, gap: 20, margin: '0 auto', mb: 40, children: steps.map((title, index) => (_jsxs(Step, { w: 130, p: 10, border: "1px solid white", borderRadius: 10, display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", sx: {
                        '[data-status=active] &': {
                            bg: 'green.500',
                        },
                    }, children: [_jsx(StepIndicator, { sx: {
                                '[data-status=active] &': {
                                    bg: 'teal.500',
                                    borderColor: 'teal.500',
                                },
                                '[data-status=active] .chakra-step__icon': {
                                    color: 'white',
                                },
                            }, children: _jsx(StepStatus, { complete: _jsx(StepIcon, {}), incomplete: _jsx(StepIcon, {}), active: _jsx(StepIcon, {}) }) }), _jsx(Box, { flexShrink: "0", children: _jsx(StepTitle, { sx: {
                                    color: step === index ? 'teal.500' : 'gray.500',
                                    fontWeight: step === index ? 'bold' : 'normal',
                                }, children: title }) }), _jsx(StepSeparator, {})] }, title))) }), _jsxs(Box, { mt: 4, children: [step === 0 && (_jsxs(Box, { children: [cart.map((p) => (_jsxs(Flex, { direction: "row", gap: 2, justifyContent: 'center', alignItems: "center", mb: 4, borderBottom: '1px solid #fff', children: [_jsx(Box, { flex: "1", children: _jsx(CartItem, { id: p.id, name: p.name, basePrice: p.basePrice, ingredients: p.ingredients, onChange: handleIngredientsChange }) }), _jsx(Image, { src: p.image || defaultPizzaImage, alt: p.name, maxW: "200px", maxH: "150px", borderRadius: "16", objectFit: "cover", fallback: _jsx(Text, { fontSize: "sm", children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E" }), mr: 20 })] }, p.id))), _jsxs(Text, { fontWeight: "bold", mt: 3, children: ["\u041E\u0431\u0449\u0430\u044F \u0441\u0443\u043C\u043C\u0430: ", total, " \u0440\u0443\u0431."] })] })), step === 1 && (_jsxs(Stack, { gap: 3, children: [_jsx(Input, { placeholder: "\u0418\u043C\u044F", value: name, onChange: (e) => setName(e.target.value) }), _jsx(Input, { placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", value: phone, onChange: (e) => setPhone(formatPhone(e.target.value)) }), _jsx(Input, { placeholder: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438", value: address, onChange: (e) => setAddress(e.target.value) }), _jsx(Input, { placeholder: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)", value: comment, onChange: (e) => setComment(e.target.value) }), _jsxs(Text, { fontWeight: "bold", children: ["\u041E\u0431\u0449\u0430\u044F \u0441\u0443\u043C\u043C\u0430: ", total, " \u0440\u0443\u0431."] })] })), step === 2 && (_jsxs(Box, { children: [_jsx(Text, { fontWeight: "bold", children: "\u0412\u0430\u0448 \u0437\u0430\u043A\u0430\u0437:" }), cart.map((p) => (_jsx(CartItem, { id: p.id, name: p.name, basePrice: p.basePrice, ingredients: p.ingredients, onChange: handleIngredientsChange }, p.id))), _jsxs(Text, { mt: 2, children: ["\u0418\u043C\u044F: ", name] }), _jsxs(Text, { children: ["\u0422\u0435\u043B\u0435\u0444\u043E\u043D: ", phone] }), _jsxs(Text, { children: ["\u0410\u0434\u0440\u0435\u0441: ", address] }), comment && _jsxs(Text, { children: ["\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439: ", comment] }), _jsxs(Text, { fontWeight: "bold", mt: 3, children: ["\u0418\u0442\u043E\u0433: ", total, " \u0440\u0443\u0431."] })] }))] }), _jsxs(Stack, { direction: "row", mt: 4, gap: 3, children: [step > 0 && (_jsx(Button, { onClick: () => setStep(step - 1), w: 120, h: 42, borderRadius: 10, children: "\u041D\u0430\u0437\u0430\u0434" })), step < steps.length - 1 && (_jsx(Button, { colorScheme: "teal", onClick: () => setStep(step + 1), isDisabled: cart.length === 0, w: 120, h: 42, borderRadius: 10, children: "\u0414\u0430\u043B\u0435\u0435" })), step === steps.length - 1 && (_jsx(Button, { colorScheme: "green", onClick: handleConfirm, isDisabled: cart.length === 0, w: 120, h: 42, borderRadius: 10, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C" }))] })] }));
};
