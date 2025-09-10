import { SimpleGrid } from '@chakra-ui/react';
import { motion, type Variants } from 'framer-motion';
import { pizzas, type Pizza } from '../data/pizzasData';
import { PizzaCard } from '../../components/pizza/PizzaCard';

type Props = {
  onAdd: (pizza: Pizza) => void;
};

export const PizzaList = ({ onAdd }: Props) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -90,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <SimpleGrid columns={[1, 2, 3]} gap={30}>
        {pizzas.map((p) => (
          <motion.div
            key={p.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <PizzaCard pizza={p} onAdd={onAdd} />
          </motion.div>
        ))}
      </SimpleGrid>
    </motion.div>
  );
};
