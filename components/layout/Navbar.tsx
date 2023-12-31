'use client';

import Link from 'next/link';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { CreateShelfModal } from '../ui/CreateShelfModal';
import { GrAdd } from 'react-icons/gr';
import { ModalType, useModal } from '@/store/modal';

interface NavLinks {
  name: string;
  href: string;
}

const navLinks: NavLinks[] = [
  { name: 'Browse', href: '/shelf/browse' },
  { name: 'My Shelf', href: '/shelf/my-shelf' },
  // { name: 'Bookmarks', href: '/shelf/bookmarks' },
  { name: 'Shared', href: '/shelf/shared' },
];

export const Navbar: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const { handleOpen } = useModal();

  return (
    <div className="w-full">
      <nav className="bg-primaryBlue relative flex flex-wrap items-center justify-between p-4 lg:px-8 mx-auto lg:justify-between">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    Shared Shelf
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-300 rounded-md lg:hidden  focus:bg-indigo-100 focus:outline-none "
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {isAuthenticated &&
                      navLinks.map((navLink, index) => (
                        <Link
                          key={index}
                          href={navLink.href}
                          className="w-full px-4 py-2 -ml-4 text-gray-300 rounded-md focus:outline-none transition-all"
                        >
                          {navLink.name}
                        </Link>
                      ))}
                    <Link
                      href={isAuthenticated ? '/shelf-create' : '/auth'}
                      className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                    >
                      {isAuthenticated ? 'Create Shelf' : 'Login'}
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {isAuthenticated &&
              navLinks.map((navLink, index) => (
                <li className="mr-3 nav__item" key={index}>
                  <Link
                    href={navLink.href}
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    {navLink.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {isAuthenticated ? (
            <div
              className="px-6 py-2 text-secondaryBlue bg-white rounded-md lg:ml-5 hover:cursor-pointer flex items-center"
              onClick={() => handleOpen(ModalType.CREATE_SHELF)}
            >
              <span className="mr-2">
                <GrAdd className="text-secondaryBlue" />
              </span>{' '}
              Create Shelf
            </div>
          ) : (
            <Link
              href={isAuthenticated ? '/shelf-create' : '/auth'}
              className="px-6 py-2 text-secondaryBlue bg-white rounded-md lg:ml-5"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <CreateShelfModal />
    </div>
  );
};
