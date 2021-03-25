import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type IModal = {
  isOpen: boolean;
  onClose: () => void; // ain't sure...
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: IModal) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed top-0 left-0 w-screen h-screen bg-gray-600 bg-opacity-80'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
            onClick={onClose}
          />
          <motion.div
            className='fixed top-0 bottom-0 left-0 right-0 max-w-xs m-auto rounded-md shadow-md h-1/4 bg-gray-50'
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.4 } }}
            exit={{ scale: 0, transition: { delay: 0.4 } }}>
            <motion.div
              className='flex items-center justify-center h-full'
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.4, duration: 0.4 },
              }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
