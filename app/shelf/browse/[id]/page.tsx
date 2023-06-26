/* eslint-disable @next/next/no-img-element */
import { getShelfById } from '@/appwrite/shelf/get';
import { ErrorCard } from '@/components/ui/ErrorCard';
import { CardButton } from '@/components/ui/ShelfCard';
import { headers } from 'next/headers';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';

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
    <div className="p-2 md:p-4 lg:p-8  flex justify-center ">
      <div className="p-4 border border-gray-200 shadow rounded-lg flex md:w-2/3 lg:w-1/2 flex-col items-center md:flex-row md:items-start">
        <div className="w-[300px] h-[400px] flex justify-center">
          <img
            src={shelf!.bannerUrl}
            alt=""
            className="rounded-lg shadow-lg w-full h-full"
          />
        </div>
        <div className="ml-8 flex flex-col h-full">
          <h1 className="text-primaryBlue text-3xl font-bold">{shelf!.name}</h1>
          <p className="text-textGray">{shelf!.description}</p>
          <div className="mt-auto flex justify-around items-center md:w-3/4">
            <button className="px-4 py-2 bg-primaryBlue rounded-lg text-white text-sm w-[100px]">
              Add Book
            </button>
            <CardButton>
              <AiOutlineShareAlt />
            </CardButton>
            <CardButton>
              <FaRegBookmark />
            </CardButton>
          </div>
        </div>
      </div>
    </div>
  );
}
