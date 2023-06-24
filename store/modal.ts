import { User } from '@/appwrite/users/model';
import { create } from 'zustand';

type ModalState = {
  isOpen: boolean;
};

type ModalAction = {
  showModal: () => void;
  hideModal: () => void;
};

export const useModal = create<ModalState & ModalAction>((set) => ({
  isOpen: false,
  showModal: () => set({ isOpen: true }),
  hideModal: () => set({ isOpen: false }),
}));
