/* eslint-disable @next/next/no-img-element */
import { getShelfById } from '@/appwrite/shelf/get';
import { BookCard } from '@/components/ui/BookCard';
import { ErrorCard } from '@/components/ui/ErrorCard';
import { ShelfDetailCard } from '@/components/ui/ShelfDetailCard';
import { headers } from 'next/headers';

export default async function ShelfPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const userId = headers().get('x-user-id');
  const shelf = await getShelfById(id, userId!);
  const error = shelf !== null ? null : 'Oops! Some error occurred.';

  return error ? (
    <ErrorCard error={error} />
  ) : (
    <>
      <ShelfDetailCard shelf={shelf!} />
      <div className="mt-4 p-4 lg:px-24">
        <h4 className="text-2xl font-bold">Books</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {shelf!.books?.length ? (
            shelf?.books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className="w-screen flex justify-center">
              <span className="font-medium text-lg text-secondaryBlue">
                There are no books to show.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
