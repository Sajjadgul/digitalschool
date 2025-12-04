// app/explorer/page.tsx
'use client';

import Link from 'next/link';

export default function ExplorerPage() {
  const buttonClasses = "flex-1 rounded-lg p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center text-center";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-12 text-center text-3xl font-bold text-gray-800">Choose Your Learning Path</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Foundation Button (Larger) */}
          <Link 
            href="/explorer/foundation" 
            className={`${buttonClasses} bg-gradient-to-r from-blue-300 to-blue-600 md:col-span-2 lg:col-span-3 h-48`}
          >
            <h2 className="text-3xl font-bold">Foundation</h2>
            <p className="mt-2 text-blue-100">Build strong fundamentals for lifelong learning</p>
          </Link>

          {/* PCTB Button */}
          <Link 
            href="https://pctb.punjab.gov.pk/E-Books" 
            className={`${buttonClasses} bg-gradient-to-r from-green-300 to-green-600 h-40`}
          >
            <h2 className="text-2xl font-bold">PCTB</h2>
            <p className="mt-1 text-sm text-green-100">Punjab Curriculum &<br />Textbook Board</p>
          </Link>

          {/* Cambridge Button */}
          <Link 
            href="/explorer/cambridge" 
            className={`${buttonClasses} bg-gradient-to-r from-purple-300 to-purple-600 h-40`}
          >
            <h2 className="text-2xl font-bold">Cambridge</h2>
            <p className="mt-1 text-sm text-purple-100">Cambridge School System</p>
          </Link>

          {/* Madrasah Nisab Button */}
          <Link 
            href="/explorer/madrasah" 
            className={`${buttonClasses} bg-gradient-to-r from-amber-300 to-amber-600 h-40`}
          >
            <h2 className="text-xl font-bold">Madrasah Nisab</h2>
          </Link>

          {/* Combined/Balanced Button */}
        </div>
          <Link 
            href="/explorer/combined" 
            className={`${buttonClasses} bg-gradient-to-r from-green-300 to-green-600 h-32 my-4`}
          >
            <h2 className="text-xl font-bold">Combined/Balanced</h2>
          </Link>
      </div>
    </div>
  );
}