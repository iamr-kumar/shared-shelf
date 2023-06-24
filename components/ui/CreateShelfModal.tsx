'use client';

import { ModalType, useModal } from '@/store/modal';
import { Modal } from './Modal';

export const CreateShelfModal: React.FC = () => {
  const { type, handleClose } = useModal();

  return (
    <Modal
      isOpen={type === ModalType.CREATE_SHELF}
      onClose={() => handleClose()}
    >
      <h1>Create Shelf Modal</h1>
    </Modal>
  );
};
