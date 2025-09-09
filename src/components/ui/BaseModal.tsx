import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  children: ReactNode;
};

export const BaseModal = ({ isOpen, onClose, title, footer, children }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        maxW="720px"
        maxH={'80vh'}
        w="100%"
        h="100%"
        overflowY={'auto'}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        m={'auto'}
        mt={30}
        position={'relative'}
        p={20}
        borderRadius={16}
        gap={20}
      >
        <ModalHeader textAlign="center" fontSize={30}>
          {title}
        </ModalHeader>
        <ModalCloseButton
          position={'absolute'}
          top={20}
          right={20}
          cursor={'pointer'}
          borderRadius={6}
          p={5}
        />
        <ModalBody w="100%" flex="1" display="flex" gap={20} overflowY="auto">
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter w="100%" display="flex" justifyContent="center" gap={4}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
