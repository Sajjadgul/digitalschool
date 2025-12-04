'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const lessons = [
  { 
    id: 'eng001', 
    title: 'Lesson 1: Parts of Speech',
    urduTitle: 'سبق 1: کلام کی اقسام',
    link: "#" 
  },
  { 
    id: 'eng002', 
    title: 'Lesson 2: Nouns and Pronouns',
    urduTitle: 'سبق 2: اسم اور اسم ضمیر',
    link: "#"
  },
  { 
    id: 'eng003', 
    title: 'Lesson 3: Verbs and Tenses',
    urduTitle: 'سبق 3: فعل اور اوقات',
    link: "#" 
  },
  { 
    id: 'eng004', 
    title: 'Lesson 4: Adjectives',
    urduTitle: 'سبق 4: صفت',
    link: "#" 
  },
  { 
    id: 'eng005', 
    title: 'Lesson 5: Adverbs',
    urduTitle: 'سبق 5: متعلق فعل',
    link: "#" 
  },
  { 
    id: 'eng006', 
    title: 'Lesson 6: Prepositions',
    urduTitle: 'سبق 6: حرف جار',
    link: "#" 
  },
  { 
    id: 'eng007', 
    title: 'Lesson 7: Empty',
    urduTitle: 'سبق 7: خالی',
    link: "#" 
  },
  { 
    id: 'eng008', 
    title: 'Lesson 8: Empty',
    urduTitle: 'سبق 8: خالی',
    link: "#" 
  },
  { 
    id: 'eng009', 
    title: 'Lesson 9: Empty',
    urduTitle: 'سبق 9: خالی',
    link: "#" 
  },
];

export default function EnglishGrammarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/explorer/foundation" 
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Foundation
        </Link>
        
        <h1 className="mb-8 text-3xl font-bold text-gray-800">English Grammar Lessons (انگلش گرامر)</h1>
        
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
