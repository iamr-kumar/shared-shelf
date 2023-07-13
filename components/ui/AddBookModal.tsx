'use client';

import { Book } from '@/appwrite/book/model';
import { ModalType, useModal } from '@/store/modal';
import debounce from '@/utils/debounce';
import axios from 'axios';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BookListTile } from './BookListTile';
import { Modal } from './Modal';

export const AddBookModal: React.FC = () => {
  const { type, handleClose } = useModal();
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>();
  const [success, setSuccess] = useState<String | null>();

  const setAndRemoveError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const searchBook = async (query: string) => {
    const url = `https://www.googleapis.com/books/v1/volumes`;
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const startIndex = 0;
    const endIndex = 15;

    try {
      setLoading(true);
      const response = await axios.get(url, {
        params: {
          q: query,
          key: API_KEY,
          startIndex: startIndex,
          endIndex: endIndex,
        },
      });
      setLoading(false);
      if (response.data.totalItems === 0) {
        setError('No results found.');
      }
      const books: Book[] = response.data.items.map((item: any) => {
        const { volumeInfo } = item;
        return {
          id: item.id,
          title: volumeInfo.title,
          authors: volumeInfo.authors,
          description: volumeInfo.description?.slice(0, 1000),
          thumbnail: volumeInfo.imageLinks
            ? volumeInfo.imageLinks.thumbnail
            : volumeInfo.thumbnail
            ? volumeInfo.thumbnail
            : '',
          categories: volumeInfo.categories,
          userId: null,
        };
      });

      setSearchResults(books);
    } catch (err) {
      console.log(err);
      setAndRemoveError('Oops! Some error occurred.');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log(query);
    if (query && query.length > 2) {
      debounce(() => searchBook(query))();
    }
    if (!query || query.length === 0) {
      setSearchResults([]);
    }
  };

  return (
    <Modal isOpen={type === ModalType.ADD_BOOK} onClose={() => handleClose()}>
      <h1 className="text-xl font-bold mb-6">Find a book</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="query"
          id="book-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search a book..."
          required
          onChange={handleOnChange}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-primaryBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue"></div>
        </div>
      ) : (
        <div className="mt-6">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((book) => (
                <li key={book.id}>
                  <BookListTile
                    book={book}
                    setError={setAndRemoveError}
                    setSuccess={setSuccess}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">
              Search results will appear here.
            </p>
          )}
        </div>
      )}
    </Modal>
  );
};
