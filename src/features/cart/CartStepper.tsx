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
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import type { CartPizza } from './cartTypes';
import { CartStep } from '../../components/cart/steps/CartStep';
import { ConfirmationStep } from '../../components/cart/steps/ConfirmationStep';
import { PersonalDataStep } from '../../components/cart/steps/PersonalDataStep';
import { SuccessModal } from './SuccessModal';
import { useCart } from '../../context/CartContext';

type Props = {
  clearCart: () => void;
  onCloseCart?: () => void;
};

export const CartStepper = ({ clearCart, onCloseCart }: Props) => {
  const steps = ['Заказ', 'Данные', 'Подтверждение'];
  const { cart, setCart } = useCart();
  const [step, setStep] = useSessionStorage('step', 0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleIngredientsChange = useCallback(
    (id: number, ingredients: CartPizza['ingredients']) => {
      console.log(`[CartStepper] Обновление ингредиентов для пиццы ${id}:`, ingredients);
      setCart((prevCart) => prevCart.map((p) => (p.id === id ? { ...p, ingredients } : p)));
    },
    [setCart],
  );

  const handleRemovePizza = useCallback(
    (id: number) => {
      console.log(`[CartStepper] Удаление пиццы ${id}`);
      setCart((prevCart) => {
        const newCart = prevCart.filter((p) => p.id !== id);
        console.log(`[CartStepper] Новая корзина после удаления:`, newCart);
        return newCart;
      });
      toast({ title: 'Пицца удалена из корзины', status: 'info', duration: 2000 });
    },
    [setCart, toast],
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

  const isFormValid = () => {
    return name.trim() !== '' && phone.length >= 18 && address.trim() !== '';
  };

  const handleNextStep = () => {
    if (step === 1 && !isFormValid()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    setStep(step + 1);
  };

  const handleConfirm = () => {
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    clearCart();
    setStep(0);
    setName('');
    setPhone('');
    setAddress('');
    setComment('');
    if (onCloseCart) {
      onCloseCart();
    }
    toast({ title: 'Заказ оформлен!', status: 'success', duration: 3000 });
  };

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

      <Box mt={4} overflowY="auto">
        {step === 0 && (
          <CartStep
            cart={cart}
            total={total}
            onIngredientsChange={handleIngredientsChange}
            onRemovePizza={handleRemovePizza}
          />
        )}
        {step === 1 && (
          <PersonalDataStep
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            comment={comment}
            setComment={setComment}
            total={total}
            formatPhone={formatPhone}
          />
        )}
        {step === 2 && (
          <ConfirmationStep
            cart={cart}
            name={name}
            phone={phone}
            address={address}
            comment={comment}
            total={total}
            onIngredientsChange={handleIngredientsChange}
            onRemovePizza={handleRemovePizza}
          />
        )}
      </Box>

      <Stack direction="row" mt={4} gap={3}>
        {step > 0 && (
          <Button
            onClick={() => setStep(step - 1)}
            w={120}
            h={42}
            borderRadius={10}
            border={'none'}
          >
            Назад
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button
            colorScheme="teal"
            onClick={handleNextStep}
            isDisabled={cart.length === 0}
            w={120}
            h={42}
            borderRadius={10}
            border={'none'}
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
            border={'none'}
          >
            Подтвердить
          </Button>
        )}
      </Stack>

      <SuccessModal isOpen={isOpen} onClose={handleModalClose} />
    </Box>
  );
};
