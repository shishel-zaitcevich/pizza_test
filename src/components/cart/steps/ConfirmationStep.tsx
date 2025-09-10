import { Box, Text } from '@chakra-ui/react';
import { CartPizza } from '../../../features/cart/cartTypes';
import { CartItem } from '../CartItem';

export const ConfirmationStep = ({
  cart,
  name,
  phone,
  address,
  comment,
  total,
  onIngredientsChange,
  onRemovePizza,
}: {
  cart: CartPizza[];
  name: string;
  phone: string;
  address: string;
  comment: string;
  total: number;
  onIngredientsChange: (id: number, ingredients: CartPizza['ingredients']) => void;
  onRemovePizza: (id: number) => void;
}) => {
  return (
    <Box>
      <Text fontWeight="bold" mb={4}>
        Ваш заказ:
      </Text>
      {cart.map((p) => (
        <CartItem
          key={p.id}
          id={p.id}
          name={p.name}
          basePrice={p.basePrice}
          ingredients={p.ingredients}
          onChange={onIngredientsChange}
          onRemove={onRemovePizza}
        />
      ))}
      <Box mt={4} p={4} bg="gray.50" borderRadius="md">
        <Text fontWeight="bold" mb={2}>
          Данные доставки:
        </Text>
        <Text>Имя: {name}</Text>
        <Text>Телефон: {phone}</Text>
        <Text>Адрес: {address}</Text>
        {comment && <Text>Комментарий: {comment}</Text>}
      </Box>
      <Text fontWeight="bold" mt={3} fontSize="lg">
        Итог: {total} руб.
      </Text>
    </Box>
  );
};
