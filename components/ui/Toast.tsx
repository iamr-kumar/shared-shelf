'use client';

import { useToast } from '@/store/toast';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const Toast: React.FC = () => {
  const { message, type, dismissToast } = useToast();

  useEffect(() => {
    if (message) {
      toast(message, { type: type, onClose: () => dismissToast() });
    }
  }, [message, type, dismissToast]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
