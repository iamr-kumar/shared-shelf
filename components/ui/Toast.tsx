'use client';

import { useToast } from '@/store/toast';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const Toast: React.FC = () => {
  const { message, type, dismissToast } = useToast();

  useEffect(() => {
    if (message) {
      toast(message, {
        type: type,
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => dismissToast(),
      });
    }
  }, [message, type, dismissToast]);

  return <ToastContainer />;
};
