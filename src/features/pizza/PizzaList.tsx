import { SimpleGrid } from '@chakra-ui/react';
import { pizzas, type Pizza } from '../data/pizzasData';
import { PizzaCard } from '../../components/pizza/PizzaCard';

type Props = {
  onAdd: (pizza: Pizza) => void;
};

export const PizzaList = ({ onAdd }: Props) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={30}>
      {pizzas.map((p) => (
        <PizzaCard key={p.id} pizza={p} onAdd={onAdd} />
      ))}
    </SimpleGrid>
  );
};
