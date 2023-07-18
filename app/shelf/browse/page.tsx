import { getAllPublicShelfs } from '@/appwrite/shelf/get';
import { ErrorCard } from '@/components/ui/ErrorCard';
import { ShareModal } from '@/components/ui/ShareModal';
import { ShelfCard } from '@/components/ui/ShelfCard';

export default async function BrowsePage() {
  const shelf = await getAllPublicShelfs();
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
            There are no shelves to show.
          </span>
        </div>
      )}
    </div>
  );
}
