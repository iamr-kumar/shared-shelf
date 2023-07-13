/* eslint-disable @next/next/no-img-element */
import { Book } from '@/appwrite/book/model';
import { useAuth } from '@/store/auth';
import axios from 'axios';
import { useParams } from 'next/navigation';

export const BookListTile: React.FC<{
  book: Book;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
}> = (props: {
  book: Book;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
}) => {
  const { book, setError, setSuccess } = props;

  const params = useParams();
  const shelfId = params.id;

  const user = useAuth();

  const addBook = async (book: Book) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/shelf/${shelfId}`,
        { book: { ...book, userId: user!.id } }
      );
      setSuccess('Book added successfully.');
    } catch (err) {
      console.log(err);
      setError('Could not add book.');
    }
  };

  return (
    <div className="flex items-center my-2">
      <img
        src={book.thumbnail}
        alt=""
        className="w-16 h-16 rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-primaryBlue text-lg font-bold ml-4">
          {book.title}
        </h1>
        <p className="text-textGray ml-4">{book.authors?.join(', ')}</p>
      </div>
      <div className="ml-auto">
        <button
          className="px-4 py-2 bg-primaryBlue rounded-lg text-white text-sm"
          onClick={() => addBook(book)}
        >
          Add
        </button>
      </div>
    </div>
  );
};
