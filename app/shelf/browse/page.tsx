import { Shelf } from '@/appwrite/shelf/model';
import { ErrorCard } from '@/components/ui/ErrorCard';
import { ShelfCard } from '@/components/ui/ShelfCard';
import axios from 'axios';

export default async function BrowsePage() {
  let shelf: Shelf[] = [];
  let error: string | null = null;
  try {
    const res = await axios.get('/api/shelf');
    shelf = res.data;
    console.log(shelf);
  } catch (err: any) {
    error = 'Could not fetch shelf. Please try again';
  }

  return (
    <div className="p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
      {error ? (
        <ErrorCard error={error} />
      ) : shelf.length ? (
        shelf.map((shelf, index) => <ShelfCard key={index} />)
      ) : (
        <div>There are no shelves to display</div>
      )}
    </div>
  );
}
