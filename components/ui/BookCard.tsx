import { Book } from '@/appwrite/book/model';

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="flex flex-col items-center justify-center h-72 p-2 m-4 bg-white rounded-lg shadow-lg">
      <img className="w-64 h-48" src={book.thumbnail} alt={book.title} />
      <div className="flex flex-col items-start justify-center w-full h-full p-4">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-sm font-light text-gray-500">
          {book.authors.join(', ')}
        </p>
      </div>
    </div>
  );
};
