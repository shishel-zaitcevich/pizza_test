import { Input, Stack, Text } from '@chakra-ui/react';

export const PersonalDataStep = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  comment,
  setComment,
  total,
  formatPhone,
}: {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
  comment: string;
  setComment: (comment: string) => void;
  total: number;
  formatPhone: (val: string) => string;
}) => {
  return (
    <Stack gap={10}>
      <Input
        placeholder="Имя *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isRequired
        borderColor={!name ? 'red.300' : 'gray.200'}
        borderRadius={8}
        border={'none'}
        p={10}
      />
      <Input
        placeholder="Телефон *"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        isRequired
        borderColor={!phone || phone.length < 18 ? 'red.300' : 'gray.200'}
        borderRadius={8}
        border={'none'}
        p={10}
      />
      <Input
        placeholder="Адрес доставки *"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        isRequired
        borderColor={!address ? 'red.300' : 'gray.200'}
        borderRadius={8}
        border={'none'}
        p={10}
      />
      <Input
        placeholder="Комментарий (опционально)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        borderRadius={8}
        border={'none'}
        p={10}
      />
      <Text fontSize="sm" color="red.500">
        * - обязательные поля
      </Text>
      <Text fontWeight="bold">Общая сумма: {total} руб.</Text>
    </Stack>
  );
};
