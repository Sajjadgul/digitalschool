// components/ui/back-button.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Back
    </button>
  );
}