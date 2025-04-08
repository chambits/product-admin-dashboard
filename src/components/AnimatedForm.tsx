import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedFormProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedForm = ({ children, className }: AnimatedFormProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
