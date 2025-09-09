import { jsx as _jsx } from "react/jsx-runtime";
import { SimpleGrid } from '@chakra-ui/react';
import { pizzas } from '../data/pizzasData';
import { PizzaCard } from '../../components/pizza/PizzaCard';
export const PizzaList = ({ onAdd }) => {
    return (_jsx(SimpleGrid, { columns: [1, 2, 3], gap: 30, children: pizzas.map((p) => (_jsx(PizzaCard, { pizza: p, onAdd: onAdd }, p.id))) }));
};
