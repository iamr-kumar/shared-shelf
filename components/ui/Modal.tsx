'use client';

import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { children, isOpen, onClose } = props;

  const handleOnClose = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 ${
        !isOpen ? 'hidden' : ''
      }`}
    >
      <div className="bg-white rounded-lg w-4/5 md:7/10 lg:w-3/5 px-2 md:px-4 py-6 relative h-3/4 overflow-scroll">
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
