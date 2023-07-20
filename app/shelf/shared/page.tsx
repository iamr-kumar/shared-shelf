import { getShelfSharedWithUser } from '@/appwrite/shelf/get';
import { ErrorCard } from '@/components/ui/ErrorCard';
import { ShelfCard } from '@/components/ui/ShelfCard';
import { headers } from 'next/headers';

export default async function BrowsePage() {
  const header = headers();
  const userId = header.get('x-user-id')!;

  const shelf = await getShelfSharedWithUser(userId);
  const error = shelf !== null ? null : 'Oops! Some error occurred.';

  return (
    <div className="p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
      {error ? (
        <ErrorCard error={error} />
      ) : shelf!.length ? (
        shelf!.map((shelf, index) => <ShelfCard key={index} shelf={shelf} />)
      ) : (
        <div className="w-screen flex justify-center">
          <span className="font-medium text-lg text-secondaryBlue">
            There are no shelves shared with you
          </span>
        </div>
      )}
    </div>
  );
}
