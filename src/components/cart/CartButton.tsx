import { Button } from '@chakra-ui/react';
import cartImg from '../assets/Безымянный.png';

type Props = {
  onClick: () => void;
};

export const CartButton = ({ onClick }: Props) => {
  return (
    <Button
      position={'fixed'}
      right={40}
      top={40}
      w={60}
      background={'transparent'}
      border={'none'}
      onClick={onClick}
      cursor={'pointer'}
    >
      <img src={cartImg} alt="cart" width={60} />;
    </Button>
  );
};
