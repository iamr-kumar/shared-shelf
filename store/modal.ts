import { create } from 'zustand';

export enum ModalType {
  CREATE_SHELF = 'CREATE_SHELF',
}

export interface ModalState {
  type: ModalType | null;
}

export interface ModalStateAction {
  handleOpen: (type: ModalType) => void;
  handleClose: () => void;
}

export const useModal = create<ModalState & ModalStateAction>((set) => ({
  type: null,
  handleOpen: (type) => set({ type }),
  handleClose: () => set({ type: null }),
}));
