'use client';

import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { children } = props;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg w-4/5 md:7/10 lg:w-3/5 p-2 md:p-4 relative">
        <div className="absolute top-5 right-5">
          <AiOutlineClose />
        </div>
        <h1>Modal</h1>
      </div>
    </div>
  );
};
