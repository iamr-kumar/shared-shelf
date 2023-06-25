'use client';

import { ModalType, useModal } from '@/store/modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputController } from '../form/InputController';
import { Modal } from './Modal';
import { useToast } from '@/store/toast';

interface CreateShelfState {
  name: string;
  bannerUrl: string;
  isPrivate: boolean;
}

export const CreateShelfModal: React.FC = () => {
  const { type, handleClose } = useModal();
  const { showToast } = useToast();

  const [createShelfState, setCreateShelfState] = useState<CreateShelfState>({
    name: '',
    bannerUrl: '',
    isPrivate: false,
  });

  const handleInputChange = (name: string, value: string) => {
    if (name === 'isPrivate') {
      setCreateShelfState({
        ...createShelfState,
        isPrivate: value === 'private',
      });
      return;
    }
    setCreateShelfState({
      ...createShelfState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // const shelf: Shelf = await axios.post('/api/shelf', createShelfState);
      const shelf = true;
      if (shelf) {
        showToast('Shelf created successfully.', toast.TYPE.SUCCESS);
        handleClose();
      }
    } catch (err) {
      showToast('Shelf created successfully.', toast.TYPE.ERROR);
    }
  };

  return (
    <Modal
      isOpen={type === ModalType.CREATE_SHELF}
      onClose={() => handleClose()}
    >
      <h1 className="text-xl font-bold mb-6">Create New Shelf</h1>

      <form>
        <div className="mb-2">
          <InputController
            name="name"
            label="Name"
            placeholder="Must read YA books"
            handleChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <InputController
            name="bannerUrl"
            label="Banner URL"
            placeholder="https://unsplash.com/photos/..."
            handleChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Visibility
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={createShelfState.isPrivate ? 'private' : 'public'}
            onChange={(e) => handleInputChange('isPrivate', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <button
            className="mt-4 bg-primaryBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
            onClick={handleSubmit}
          >
            Create{' '}
          </button>
        </div>
      </form>
    </Modal>
  );
};
