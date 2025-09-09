import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Checkbox, Stack, Text, Box } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { BaseModal } from '../../components/ui/BaseModal';
export const PizzaModal = ({ isOpen, onClose, pizza, onConfirm }) => {
    const [selected, setSelected] = useState([]);
    const handleCheckboxChange = (ingredientName, isChecked) => {
        if (isChecked) {
            setSelected((prev) => [...prev, ingredientName]);
        }
        else {
            setSelected((prev) => prev.filter((name) => name !== ingredientName));
        }
    };
    const additionalPrice = useMemo(() => {
        if (!pizza)
            return 0;
        return pizza.ingredients
            .filter((ing) => selected.includes(ing.name))
            .reduce((sum, ing) => sum + ing.price, 0);
    }, [pizza, selected]);
    const totalPrice = (pizza?.price || 0) + additionalPrice;
    if (!pizza)
        return null;
    const handleConfirm = () => {
        const selectedIngredients = pizza.ingredients.filter((ing) => selected.includes(ing.name));
        onConfirm(selectedIngredients);
        setSelected([]);
        onClose();
    };
    const handleClose = () => {
        setSelected([]);
        onClose();
    };
    return (_jsx(BaseModal, { isOpen: isOpen, onClose: handleClose, title: `Настройка пиццы: ${pizza.name}`, footer: _jsx(_Fragment, { children: _jsx(Button, { colorScheme: "teal", mr: 3, onClick: handleConfirm, w: 160, h: 42, borderRadius: 10, cursor: 'pointer', children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" }) }), children: _jsxs(Box, { children: [_jsxs(Box, { mb: 4, p: 3, bg: "gray.50", borderRadius: "md", children: [_jsx(Text, { fontWeight: "bold", fontSize: "20", mb: 1, children: pizza.name }), _jsxs(Text, { color: "gray.600", mb: 2, children: ["\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430: ", pizza.price, " \u0440\u0443\u0431."] })] }), _jsx(Text, { fontWeight: "semibold", mb: 3, fontSize: 18, children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B:" }), _jsx(Stack, { spacing: 1, mb: 4, children: pizza.ingredients.map((ingredient) => (_jsx(Checkbox, { isChecked: selected.includes(ingredient.name), onChange: (e) => handleCheckboxChange(ingredient.name, e.target.checked), borderColor: "gray.400", borderWidth: "2px", colorScheme: "blue", size: "lg", children: _jsxs(Text, { ml: 2, children: [ingredient.name, " (+", ingredient.price, " \u0440\u0443\u0431.)"] }) }, ingredient.name))) }), _jsxs(Box, { p: 3, pl: 20, bg: "green.50", borderRadius: "md", borderLeft: "4px solid", borderLeftColor: "green.400", children: [_jsxs(Text, { fontWeight: "bold", fontSize: "xl", color: "green.800", children: ["\u0418\u0442\u043E\u0433\u043E: ", totalPrice, " \u0440\u0443\u0431."] }), additionalPrice > 0 && (_jsxs(Text, { fontSize: "sm", color: "green.600", children: ["\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430: ", pizza.price, " \u0440\u0443\u0431. + \u0434\u043E\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F: ", additionalPrice, " \u0440\u0443\u0431."] }))] })] }) }));
};
