/* eslint-disable @next/next/no-img-element */
'use client';

import { Shelf } from '@/appwrite/shelf/model';
import { AddBookModal } from './AddBookModal';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { CardButton } from './ShelfCard';
import { ModalType, useModal } from '@/store/modal';
import { ShareModal } from './ShareModal';
import { useState } from 'react';
import { useAuth } from '@/store/auth';
import { useToast } from '@/store/toast';
import { toast } from 'react-toastify';

export const ShelfDetailCard: React.FC<{ shelf: Shelf }> = (props: {
  shelf: Shelf;
}) => {
  const { shelf } = props;
  const [showShareModal, setShowShareModal] = useState(false);
  const { handleOpen } = useModal();
  const user = useAuth();
  const { showToast } = useToast();

  const openAddBookModal = () => {
    handleOpen(ModalType.ADD_BOOK);
  };

  const handleShare = async () => {
    if (user?.$id === shelf.createdBy) {
      setShowShareModal(true);
      return;
    }
    await navigator.clipboard.writeText(
      `http://localhost:3000/shelf/browse/${shelf.$id}`
    );
    showToast('Link copied to clipboard.', toast.TYPE.SUCCESS);
  };

  return (
    <div className="p-2 md:p-4 lg:p-8 flex justify-center ">
      <AddBookModal />
      <ShareModal
        shelf={shelf}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      <div className="p-4 border border-gray-200 shadow rounded-lg flex md:w-2/3 lg:w-1/2 flex-col items-center md:flex-row md:items-start">
        <div className="w-[300px] h-[400px] flex justify-center">
          <img
            src={shelf!.bannerUrl}
            alt=""
            className="rounded-lg shadow-lg w-full h-full"
          />
        </div>
        <div className="ml-8 flex flex-col h-full">
          <h1 className="text-primaryBlue text-3xl font-bold">{shelf!.name}</h1>
          <p className="text-textGray">{shelf!.description}</p>
          <div className="mt-auto flex justify-around items-center md:w-3/4">
            <button
              className="px-4 py-2 bg-primaryBlue rounded-lg text-white text-sm w-[100px]"
              onClick={openAddBookModal}
            >
              Add Book
            </button>
            <CardButton handleClick={handleShare}>
              <AiOutlineShareAlt />
            </CardButton>
            {user?.id !== shelf.createdBy && (
              <CardButton handleClick={() => setShowShareModal(false)}>
                <FaRegBookmark />
              </CardButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
