import { TypeOptions } from 'react-toastify';
import { create } from 'zustand';

export interface ToastState {
  message: string | null;
  type: TypeOptions | undefined;
}

export interface ToastAction {
  showToast: (message: string, type: TypeOptions) => void;
  dismissToast: () => void;
}

export const useToast = create<ToastState & ToastAction>((set) => ({
  message: null,
  type: undefined,
  showToast: (message, type) => set({ message, type }),
  dismissToast: () => set({ message: null, type: undefined }),
}));
