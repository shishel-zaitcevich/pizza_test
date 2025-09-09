import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepSeparator,
  StepIcon,
  Box,
  Button,
  Stack,
  Input,
  Text,
  useToast,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CartPizza } from './cartTypes';
import { CartItem } from '../../components/cart/CartItem';

type Props = { clearCart: () => void };

export const CartStepper = ({ clearCart }: Props) => {
  const steps = ['Заказ', 'Данные', 'Подтверждение'];
  const [cart, setCart] = useLocalStorage<CartPizza[]>('cart', []);
  const [step, setStep] = useSessionStorage('step', 0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const toast = useToast();

  const handleIngredientsChange = useCallback(
    (id: number, ingredients: CartPizza['ingredients']) => {
      setCart((prevCart) => prevCart.map((p) => (p.id === id ? { ...p, ingredients } : p)));
    },
    [setCart],
  );

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.basePrice + item.ingredients.reduce((s, i) => s + i.price, 0),
        0,
      ),
    [cart],
  );

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    let res = '+7 ';
    if (digits.length > 1) res += `(${digits.slice(1, 4)}`;
    if (digits.length >= 4) res += `) ${digits.slice(4, 7)}`;
    if (digits.length >= 7) res += `-${digits.slice(7, 9)}`;
    if (digits.length >= 9) res += `-${digits.slice(9, 11)}`;
    return res;
  };

  const handleConfirm = () => {
    toast({ title: 'Заказ оформлен!', status: 'success', duration: 3000 });
    clearCart();
    setStep(0);
  };

  const defaultPizzaImage =
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&fit=crop';

  return (
    <Box
      mt={6}
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      minHeight="100px"
      w={'100%'}
    >
      <Stepper
        index={step}
        size="lg"
        orientation="horizontal"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w={400}
        gap={20}
        margin={'0 auto'}
        mb={40}
      >
        {steps.map((title, index) => (
          <Step
            key={title}
            w={130}
            p={10}
            border="1px solid white"
            borderRadius={10}
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            alignItems="center"
            sx={{
              '[data-status=active] &': {
                bg: 'green.500',
              },
            }}
          >
            <StepIndicator
              sx={{
                '[data-status=active] &': {
                  bg: 'teal.500',
                  borderColor: 'teal.500',
                },
                '[data-status=active] .chakra-step__icon': {
                  color: 'white',
                },
              }}
            >
              <StepStatus complete={<StepIcon />} incomplete={<StepIcon />} active={<StepIcon />} />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle
                sx={{
                  color: step === index ? 'teal.500' : 'gray.500',
                  fontWeight: step === index ? 'bold' : 'normal',
                }}
              >
                {title}
              </StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {step === 0 && (
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
                    onChange={handleIngredientsChange}
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
        )}
        {step === 1 && (
          <Stack gap={3}>
            <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />
            <Input
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              placeholder="Комментарий (опционально)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Text fontWeight="bold">Общая сумма: {total} руб.</Text>
          </Stack>
        )}
        {step === 2 && (
          <Box>
            <Text fontWeight="bold">Ваш заказ:</Text>
            {cart.map((p) => (
              <CartItem
                key={p.id}
                id={p.id}
                name={p.name}
                basePrice={p.basePrice}
                ingredients={p.ingredients}
                onChange={handleIngredientsChange}
              />
            ))}
            <Text mt={2}>Имя: {name}</Text>
            <Text>Телефон: {phone}</Text>
            <Text>Адрес: {address}</Text>
            {comment && <Text>Комментарий: {comment}</Text>}
            <Text fontWeight="bold" mt={3}>
              Итог: {total} руб.
            </Text>
          </Box>
        )}
      </Box>

      <Stack direction="row" mt={4} gap={3}>
        {step > 0 && (
          <Button onClick={() => setStep(step - 1)} w={120} h={42} borderRadius={10}>
            Назад
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button
            colorScheme="teal"
            onClick={() => setStep(step + 1)}
            isDisabled={cart.length === 0}
            w={120}
            h={42}
            borderRadius={10}
          >
            Далее
          </Button>
        )}
        {step === steps.length - 1 && (
          <Button
            colorScheme="green"
            onClick={handleConfirm}
            isDisabled={cart.length === 0}
            w={120}
            h={42}
            borderRadius={10}
          >
            Подтвердить
          </Button>
        )}
      </Stack>
    </Box>
  );
};
