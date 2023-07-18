'use client';

import { ModalType, useModal } from '@/store/modal';
import { Modal } from './Modal';
import { Shelf } from '@/appwrite/shelf/model';

interface ShareModalProps {
  shelf: Shelf;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = (
  props: ShareModalProps
) => {
  const { isOpen, onClose, shelf } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1>{shelf.name}</h1>
    </Modal>
  );
};
