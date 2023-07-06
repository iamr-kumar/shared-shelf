/* eslint-disable @next/next/no-img-element */
import { getShelfById } from '@/appwrite/shelf/get';
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
    </>
  );
}
