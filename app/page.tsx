import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import heroImg from '@/public/assets/welcome_illustration.svg';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Share your book recommendations with friends.
            </h1>
            <p className="py-5 text-xl leading-normal text-textGray lg:text-xl xl:text-2xl">
              Shared Shelf is a platform that empowers users to create and
              curate their personal library of books, enabling them to share
              their literary preferences with friends and recommend books. Users
              can effortlessly build their collection by adding books they have
              read, loved, or wish to explore.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                href="/auth"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center bg-primaryBlue text-white rounded-md "
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={'object-cover'}
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
