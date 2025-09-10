import { Card, Image, Text, Button, Stack, Box } from '@chakra-ui/react';
import type { Pizza } from '../../features/data/pizzasData';

import cardImg from '../../assets/1.png';

type Props = {
  pizza: Pizza;
  onAdd: (pizza: Pizza) => void;
};

export const PizzaCard = ({ pizza, onAdd }: Props) => {
  return (
    <Card
      maxWidth={400}
      border="0.5px solid"
      borderColor="gray.600"
      backdropFilter="blur(20px)"
      borderRadius={10}
      p={20}
      position="relative"
      overflow="hidden"
      bgColor={'#531e33ff'}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${cardImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        zIndex: -2,
        backdropFilter: 'blur(80px)',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1,
      }}
    >
      <Card>
        <Stack gap={1}>
          <Text fontWeight="bold" fontSize="22px">
            {pizza.name}
          </Text>
          <Image src={pizza.image} alt={pizza.name} borderRadius="16px" />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            w={'100%'}
            mt={20}
          >
            <Text color="gray.600">{pizza.price} руб.</Text>

            <Button
              colorScheme="teal"
              onClick={() => onAdd(pizza)}
              h={42}
              maxW={160}
              borderRadius={10}
              border={'none'}
              cursor={'pointer'}
            >
              Добавить в корзину
            </Button>
          </Box>
        </Stack>
      </Card>
    </Card>
  );
};
