'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const lessons = [
  { 
    id: 'math001', 
    title: 'Lesson 1: Introduction to Numbers',
    urduTitle: 'سبق 1: نمبروں کا تعارف',
    link: "#" 
  },
  { 
    id: 'math002', 
    title: 'Lesson 2: Basic Operations',
    urduTitle: 'سبق 2: بنیادی عملیات',
    link: "#"
  },
  { 
    id: 'math003', 
    title: 'Lesson 3: Fractions',
    urduTitle: 'سبق 3: کسر',
    link: "#" 
  },
  { 
    id: 'math004', 
    title: 'Lesson 4: Decimals',
    urduTitle: 'سبق 4: اعشاریہ',
    link: "#" 
  },
  { 
    id: 'math005', 
    title: 'Lesson 5: Percentages',
    urduTitle: 'سبق 5: فیصد',
    link: "#" 
  },
  { 
    id: 'math006', 
    title: 'Lesson 6: Basic Geometry',
    urduTitle: 'سبق 6: بنیادی جیومیٹری',
    link: "#" 
  },
  { 
    id: 'math007', 
    title: 'Lesson 7: Empty',
    urduTitle: 'سبق 7: خالی',
    link: "#" 
  },
  { 
    id: 'math008', 
    title: 'Lesson 8: Empty',
    urduTitle: 'سبق 8: خالی',
    link: "#" 
  },
  { 
    id: 'math009', 
    title: 'Lesson 9: Empty',
    urduTitle: 'سبق 9: خالی',
    link: "#" 
  },
];

export default function MathematicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/explorer/foundation" 
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Foundation
        </Link>
        
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Mathematics Lessons (ریاضی)</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <Link 
              key={lesson.id}
              href={lesson.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-gray-800">{lesson.title}</h3>
              <p className="text-md font-medium text-gray-700 mb-2">{lesson.urduTitle}</p>
              <p className="text-sm text-gray-500">Click to watch on YouTube</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
