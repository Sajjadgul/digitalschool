// app/explorer/foundation/page.tsx
'use client';

import Link from 'next/link';
import { BackButton } from '@/components/back-button';

export default function FoundationPage() {
  const buttonClasses = "flex-1 rounded-xl p-8 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center text-center";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <BackButton />
        <h1 className="mb-12 text-center text-3xl font-bold text-gray-800">Foundation Subjects</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Urdu Grammar */}
          <Link 
            href="/explorer/foundation/urdu-grammar" 
            className={`${buttonClasses} bg-gradient-to-r from-emerald-500 to-emerald-700 h-48`}
          >
            <h2 className="text-2xl font-bold mb-2">اردو قواعد</h2>
            <p className="text-emerald-100">Urdu Grammar</p>
          </Link>

          {/* Mathematics */}
          <Link 
            href="/explorer/foundation/mathematics" 
            className={`${buttonClasses} bg-gradient-to-r from-blue-500 to-blue-700 h-48`}
          >
            <h2 className="text-2xl font-bold mb-2">ریاضی</h2>
            <p className="text-blue-100">Mathematics</p>
          </Link>

          {/* English Grammar */}
          <Link 
            href="/explorer/foundation/english-grammar" 
            className={`${buttonClasses} bg-gradient-to-r from-purple-500 to-purple-700 h-48`}
          >
            <h2 className="text-2xl font-bold mb-2">English Grammar</h2>
            <p className="text-purple-100">انگلش گرامر</p>
          </Link>

          {/* Arabic with Sarf o Nahw */}
          <Link 
            href="/explorer/foundation/arabic-grammar" 
            className={`${buttonClasses} bg-gradient-to-r from-amber-500 to-amber-700 h-48`}
          >
            <h2 className="text-2xl font-bold mb-2">عربی مع صرف و نحو</h2>
            <p className="text-amber-100 mb-2">Arabic with Sarf o Nahw</p>
            <h3 className="text-xl font-bold mb-1">قرآن ترجمہ</h3>
            <p className="text-amber-100 text-sm">Quran Translation</p>
          </Link>
        </div>
      </div>
    </div>
  );
}