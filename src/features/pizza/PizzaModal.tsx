import { Button, Checkbox, Stack, Text, Box } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import type { Pizza } from '../data/pizzasData';
import { BaseModal } from '../../components/ui/BaseModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  pizza: Pizza | null;
  onConfirm: (ingredients: Pizza['ingredients']) => void;
};

export const PizzaModal = ({ isOpen, onClose, pizza, onConfirm }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxChange = (ingredientName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelected((prev) => [...prev, ingredientName]);
    } else {
      setSelected((prev) => prev.filter((name) => name !== ingredientName));
    }
  };

  const additionalPrice = useMemo(() => {
    if (!pizza) return 0;
    return pizza.ingredients
      .filter((ing) => selected.includes(ing.name))
      .reduce((sum, ing) => sum + ing.price, 0);
  }, [pizza, selected]);

  const totalPrice = (pizza?.price || 0) + additionalPrice;

  if (!pizza) return null;

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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Настройка пиццы: ${pizza.name}`}
      footer={
        <>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={handleConfirm}
            w={160}
            h={42}
            borderRadius={10}
            border={'none'}
            cursor={'pointer'}
          >
            Добавить в корзину
          </Button>
        </>
      }
    >
      <Box>
        <Box mb={4} p={3} bg="gray.50" borderRadius="md">
          <Text fontWeight="bold" fontSize="20" mb={1}>
            {pizza.name}
          </Text>
          <Text color="gray.600" mb={2}>
            Базовая цена: {pizza.price} руб.
          </Text>
        </Box>

        <Text fontWeight="semibold" mb={3} fontSize={18}>
          Дополнительные ингредиенты:
        </Text>

        <Stack spacing={1} mb={4}>
          {pizza.ingredients.map((ingredient) => (
            <Checkbox
              key={ingredient.name}
              isChecked={selected.includes(ingredient.name)}
              onChange={(e) => handleCheckboxChange(ingredient.name, e.target.checked)}
              borderColor="gray.400"
              borderWidth="2px"
              colorScheme="blue"
              size="lg"
            >
              <Text ml={2}>
                {ingredient.name} (+{ingredient.price} руб.)
              </Text>
            </Checkbox>
          ))}
        </Stack>

        <Box
          p={3}
          pl={20}
          bg="green.50"
          borderRadius="md"
          borderLeft="4px solid"
          borderLeftColor="green.400"
        >
          <Text fontWeight="bold" fontSize="xl" color="green.800">
            Итого: {totalPrice} руб.
          </Text>
          {additionalPrice > 0 && (
            <Text fontSize="sm" color="green.600">
              Базовая цена: {pizza.price} руб. + дополнения: {additionalPrice} руб.
            </Text>
          )}
        </Box>
      </Box>
    </BaseModal>
  );
};
