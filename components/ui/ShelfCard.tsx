import Image from 'next/image';
import Link from 'next/link';
import stockShelfImage from 'public/assets/stock-shelf-image.jpeg';
import { ReactNode } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';

const CardButton: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <button className="rounded-full border-2 border-primaryBlue p-2 hover:bg-secondaryBlue transition hover:border-white mr-2">
      {children}
    </button>
  );
};

export const ShelfCard: React.FC = () => {
  return (
    <Link
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
    >
      <Image
        width={200}
        height={400}
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={stockShelfImage}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex mt-2 items-center justify-around w-1/2">
          <CardButton>
            <AiOutlineShareAlt />
          </CardButton>
          <CardButton>
            <FaRegBookmark />
          </CardButton>
        </div>
      </div>
    </Link>
  );
};
