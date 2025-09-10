import { Box, Text, Checkbox, Stack, HStack, Button } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import type { Ingredient } from '../../features/data/pizzasData';

import trash from '../../assets/trash.png';

type Props = {
  id: number;
  name: string;
  basePrice: number;
  ingredients: Ingredient[];
  onChange?: (id: number, selected: Ingredient[]) => void;
  onRemove?: (id: number) => void;
};

export const CartItem = ({ id, name, basePrice, ingredients, onChange, onRemove }: Props) => {
  const [selected, setSelected] = useState<string[]>(() => ingredients.map((i) => i.name));

  useEffect(() => {
    setSelected(ingredients.map((i) => i.name));
  }, [ingredients]);

  const handleCheckboxChange = (ingredientName: string, isChecked: boolean) => {
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

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={2}>
      <HStack gap={20} mb={3}>
        <Text fontWeight="bold" fontSize="20">
          {name}
        </Text>
        {onRemove && (
          <Button
            onClick={() => {
              console.log(`[CartItem] Удаление пиццы с id: ${id}`);
              onRemove(id);
            }}
            cursor={'pointer'}
            border={'none'}
            bgColor={'transparent'}
          >
            <img aria-label="Удалить пиццу" src={`${trash}`} width={30} />
          </Button>
        )}
      </HStack>

      <Text mb={3} color="gray.600">
        Базовая цена: {basePrice} руб.
      </Text>

      <Text fontWeight="semibold" mb={2}>
        Дополнительные ингредиенты:
      </Text>

      <Stack direction="column" spacing={2} mb={4}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient) => (
            <Checkbox
              key={ingredient.name}
              isChecked={selected.includes(ingredient.name)}
              onChange={(e) => handleCheckboxChange(ingredient.name, e.target.checked)}
              borderColor="gray.400"
              borderWidth="2px"
              colorScheme="blue"
              size="lg"
              isDisabled={!onChange}
            >
              <Text ml={2}>
                {ingredient.name} (+{ingredient.price} руб.)
              </Text>
            </Checkbox>
          ))
        ) : (
          <Text color="gray.500" fontStyle="italic">
            Дополнительные ингредиенты не выбраны
          </Text>
        )}
      </Stack>

      <Text fontWeight="bold" fontSize="xl" color="green.600">
        Итого: {total} руб.
      </Text>
    </Box>
  );
};
