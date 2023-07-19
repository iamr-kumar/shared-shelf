'use client';

import { Shelf } from '@/appwrite/shelf/model';
import { Modal } from './Modal';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ErrorCard } from './ErrorCard';
import axios from 'axios';

interface ShareModalProps {
  shelf: Shelf;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = (
  props: ShareModalProps
) => {
  const { isOpen, onClose, shelf } = props;

  const [isPrivate, setIsPrivate] = useState(shelf.isPrivate);

  const [sharedEmails, setSharedEmails] = useState<string[]>([]);

  const [currentInput, setCurrentInput] = useState<string>('');

  const [error, setError] = useState<string>('');

  const [success, setSuccess] = useState<string>('');

  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const onPressedEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!emailRegex.test(currentInput)) {
        setError('Please enter a valid email.');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setSharedEmails([...sharedEmails, currentInput]);
      setCurrentInput('');
    }
  };

  const removeEmail = (email: string) => {
    const newSharedEmails = sharedEmails.filter((e) => e !== email);
    setSharedEmails(newSharedEmails);
  };

  const handleInputChange = (value: string) => {
    value === 'private' ? setIsPrivate(true) : setIsPrivate(false);
  };

  const handleShare = async () => {
    try {
      // update shelf visibility
      if (isPrivate !== shelf.isPrivate) {
        await axios.put(`http://localhost:3000/api/shelf/${shelf.$id}`, {
          isPrivate,
        });
      }

      // share shelf with users
      if (isPrivate && sharedEmails.length > 0) {
        await axios.post('http://localhost:3000/api/share', {
          shelfId: shelf.$id,
          isPrivate,
          userEmails: sharedEmails,
        });
      }
      setSuccess('Shelf Updated!');
      setSharedEmails([]);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.log(err);
      setError('Oops! Some error occurred.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLinkCopy = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:3000/shelf/browse/${shelf.$id}`
    );
    setSuccess('Link Copied!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isSmall={true}>
      <h1 className="text-xl font-bold mb-6">Share {shelf.name}</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Visibility
        </label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={isPrivate ? 'private' : 'public'}
          onChange={(e) => handleInputChange(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      {isPrivate && (
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Share With
          </label>
          <input
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter email of the users you want to share this shelf with. Press Enter after each email"
            value={currentInput}
            onChange={handleInputEmailChange}
            onKeyDown={onPressedEnter}
            type="email"
          />
          <div className="flex flex-wrap my-2">
            {sharedEmails.map((email, index) => (
              <EmailCard key={index} email={email} handleRemove={removeEmail} />
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex">
        <button
          className="bg-primaryBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          onClick={handleShare}
        >
          Update
        </button>
        <button
          className="ml-4 bg-white hover:gray-200 text-primaryBlue font-bold px-4 rounded-lg transition"
          onClick={handleLinkCopy}
        >
          Copy Link
        </button>
      </div>
    </Modal>
  );
};

interface EmailCardProps {
  email: string;
  handleRemove: (email: string) => void;
}

const EmailCard: React.FC<EmailCardProps> = (props: EmailCardProps) => {
  const { email, handleRemove } = props;

  return (
    <div className="rounded-lg bg-blue-200 border-2 border-primaryBlue flex text-sm py-1 px-2 items-center mr-2 mb-1">
      {props.email}
      <span className="ml-1" onClick={() => handleRemove(email)}>
        <AiOutlineClose />
      </span>
    </div>
  );
};
