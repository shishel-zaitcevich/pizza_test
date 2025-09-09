import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text, Checkbox, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
export const CartItem = ({ id, name, basePrice, ingredients, onChange }) => {
    const [selected, setSelected] = useState(() => ingredients.map((i) => i.name));
    useEffect(() => {
        setSelected(ingredients.map((i) => i.name));
    }, [ingredients]);
    const handleCheckboxChange = (ingredientName, isChecked) => {
        const newSelected = isChecked
            ? [...selected, ingredientName]
            : selected.filter((name) => name !== ingredientName);
        setSelected(newSelected);
        if (onChange) {
            const selectedIngredients = ingredients.filter((i) => newSelected.includes(i.name));
            onChange(id, selectedIngredients);
        }
    };
    const additionalPrice = ingredients
        .filter((i) => selected.includes(i.name))
        .reduce((sum, i) => sum + i.price, 0);
    const total = basePrice + additionalPrice;
    return (_jsxs(Box, { borderWidth: "1px", borderRadius: "md", p: 4, mb: 2, children: [_jsx(Text, { fontWeight: "bold", mb: 3, fontSize: "20", children: name }), _jsxs(Text, { mb: 3, color: "gray.600", children: ["\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430: ", basePrice, " \u0440\u0443\u0431."] }), _jsx(Text, { fontWeight: "semibold", mb: 2, children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B:" }), _jsx(Stack, { direction: "column", spacing: 2, mb: 4, children: ingredients.length > 0 ? (ingredients.map((ingredient) => (_jsx(Checkbox, { isChecked: selected.includes(ingredient.name), onChange: (e) => handleCheckboxChange(ingredient.name, e.target.checked), borderColor: "gray.400", borderWidth: "2px", colorScheme: "blue", size: "lg", isDisabled: !onChange, children: _jsxs(Text, { ml: 2, children: [ingredient.name, " (+", ingredient.price, " \u0440\u0443\u0431.)"] }) }, ingredient.name)))) : (_jsx(Text, { color: "gray.500", fontStyle: "italic", children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u044B" })) }), _jsxs(Text, { fontWeight: "bold", fontSize: "xl", color: "green.600", children: ["\u0418\u0442\u043E\u0433\u043E: ", total, " \u0440\u0443\u0431."] })] }));
};
