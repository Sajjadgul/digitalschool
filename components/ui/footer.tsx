'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link 
              href="/about" 
              className="text-gray-500 hover:text-gray-600"
            >
              About us
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-500 hover:text-gray-600"
            >
              Suggestions/Contact us
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-500 hover:text-gray-600"
            >
              Terms
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm text-gray-500">
              &copy; {currentYear} Digital School. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
