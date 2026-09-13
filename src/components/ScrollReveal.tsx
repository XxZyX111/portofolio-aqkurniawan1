import { motion } from 'framer-motion';

type ScrollRevealProps = {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  className?: string;
};

const ScrollReveal = ({ children, direction = 'up', className = '' }: ScrollRevealProps) => {
  const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  const animate: { opacity: number; x?: number; y?: number } = { opacity: 1 };

  if (direction === 'up') {
    initial.y = 40;
    animate.y = 0;
  } else if (direction === 'left') {
    initial.x = -40;
    animate.x = 0;
  } else if (direction === 'right') {
    initial.x = 40;
    animate.x = 0;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
