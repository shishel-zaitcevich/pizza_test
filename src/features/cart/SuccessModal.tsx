import { Button, Flex, Text } from '@chakra-ui/react';
import { BaseModal } from '../../components/ui/BaseModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessModal = ({ isOpen, onClose }: Props) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Заказ успешно оформлен!"
      footer={
        <Button
          colorScheme="green"
          onClick={onClose}
          w="100%"
          width={160}
          h={42}
          borderRadius={10}
          border={'none'}
          cursor={'pointer'}
        >
          ОК
        </Button>
      }
    >
      <Flex direction="column" justify={'center'} align={'center'} gap={4} w={'100%'}>
        <Text fontSize="25" color="gray.600">
          Спасибо за Ваш заказ!
        </Text>
        <Text fontSize="md">Менеджер свяжется с Вами в ближайшее время.</Text>
        <Text fontSize="18" color="gray.500" fontWeight={600}>
          Номер заказа: #{Math.floor(Math.random() * 10000)}
        </Text>
      </Flex>
    </BaseModal>
  );
};
