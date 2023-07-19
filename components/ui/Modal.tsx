'use client';

import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  isSmall?: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { children, isOpen, onClose, isSmall = false } = props;

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 ${
        !isOpen ? 'hidden' : ''
      }`}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <div
        className={`bg-white rounded-lg px-2 md:px-4 py-6 relative  overflow-scroll ${
          isSmall
            ? 'w-4/5 md:w-2/3 lg:w-1/2 h-1/2'
            : 'w-4/5 md:w-7/10 lg:w-3/5 h-3/4'
        }`}
      >
        <div className="absolute top-5 right-5">
          <AiOutlineClose
            onClick={handleOnClose}
            className="hover:cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
};
