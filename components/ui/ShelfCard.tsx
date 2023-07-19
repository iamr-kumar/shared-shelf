/* eslint-disable @next/next/no-img-element */
'use client';

import { Shelf } from '@/appwrite/shelf/model';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { ShareModal } from './ShareModal';
import { useToast } from '@/store/toast';
import { toast } from 'react-toastify';

export const CardButton: React.FC<{
  children: ReactNode;
  handleClick: () => void;
}> = ({
  children,
  handleClick,
}: {
  children: ReactNode;
  handleClick: () => void;
}) => {
  const showShareModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClick();
  };

  return (
    <button
      className="rounded-full border-2 border-primaryBlue p-2 hover:bg-secondaryBlue transition hover:border-white mr-2"
      onClick={showShareModal}
    >
      {children}
    </button>
  );
};

export const ShelfCard: React.FC<{ shelf: Shelf }> = (props: {
  shelf: Shelf;
}) => {
  const { shelf } = props;
  const [showShareModal, setShowShareModal] = useState(false);

  const user = useAuth();
  const router = useRouter();

  const { showToast } = useToast();

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
    <div
      onClick={() => router.push(`/shelf/browse/${shelf.$id}`)}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
    >
      <ShareModal
        shelf={shelf}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      <img
        width={200}
        height={400}
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={shelf.bannerUrl}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {shelf.name}
        </h5>
        <div className="px-4 py-1 flex justify-center mb-2 border-1 border-secondaryBlue bg-blue-500 text-white text-xs rounded-lg w-14">
          {shelf.isPrivate ? 'Private' : 'Public'}
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {shelf.description}
        </p>
        <div className="flex mt-2 items-center justify-around w-1/2">
          <CardButton handleClick={handleShare}>
            <AiOutlineShareAlt />
          </CardButton>
          {user?.id === shelf.createdBy && (
            <CardButton handleClick={() => setShowShareModal(false)}>
              <FaRegBookmark />
            </CardButton>
          )}
        </div>
      </div>
    </div>
  );
};
