import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { CartPizza } from '../../../features/cart/cartTypes';
import { CartItem } from '../CartItem';

export const CartStep = ({
  cart,
  total,
  onIngredientsChange,
  onRemovePizza,
}: {
  cart: CartPizza[];
  total: number;
  onIngredientsChange: (id: number, ingredients: CartPizza['ingredients']) => void;
  onRemovePizza: (id: number) => void;
}) => {
  const defaultPizzaImage =
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&fit=crop';

  return (
    <Box>
      {cart.map((p) => (
        <Flex
          key={p.id}
          direction="row"
          gap={2}
          justifyContent={'center'}
          alignItems="center"
          mb={4}
          borderBottom={'1px solid #fff'}
        >
          <Box flex="1">
            <CartItem
              id={p.id}
              name={p.name}
              basePrice={p.basePrice}
              ingredients={p.ingredients}
              onChange={onIngredientsChange}
              onRemove={onRemovePizza}
            />
          </Box>
          <Image
            src={p.image || defaultPizzaImage}
            alt={p.name}
            maxW="200px"
            maxH="150px"
            borderRadius="16"
            objectFit="cover"
            fallback={<Text fontSize="sm">Изображение недоступно</Text>}
            mr={20}
          />
        </Flex>
      ))}
      <Text fontWeight="bold" mt={3}>
        Общая сумма: {total} руб.
      </Text>
    </Box>
  );
};
