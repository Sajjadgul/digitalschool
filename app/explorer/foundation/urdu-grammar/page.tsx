'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { link } from 'fs';

const lessons = [
  { 
    id: 'abc123', 
    title: 'Lesson 1: Symbol of Alphabet',
    urduTitle: 'سبق 1: حرف کی علامت',
    link: "https://www.youtube.com/watch?v=hYrLTrJ3isA&list=PLoBSrpXXDzZF9zBXZnXSdchacQRGkZEEl&index=3" 
  },
  { 
    id: 'def456', 
    title: 'Lesson 2: Letters, Vowels & Words',
    urduTitle: 'سبق 2: حرف، حرکات، لفظ',
    link: "https://www.youtube.com/watch?v=qIwuIYABoSs&list=PLoBSrpXXDzZF9zBXZnXSdchacQRGkZEEl&index=5"
  },
  { 
    id: 'ghi789', 
    title: 'Lesson 3: Types of Words',
    urduTitle: 'سبق 3: لفظ کی اقسام',
    link: "https://www.youtube.com/watch?v=xjlCVucObXU&list=PLoBSrpXXDzZF9zBXZnXSdchacQRGkZEEl&index=4" 
  },
  { 
    id: 'jkl012', 
    title: 'Lesson 4: Noun',
    urduTitle: 'سبق 4: اسم',
    link: "https://www.youtube.com/watch?v=qdKkcuQ8APk&list=PLoBSrpXXDzZF9zBXZnXSdchacQRGkZEEl&index=2" 
  },
  { 
    id: 'mno345', 
    title: 'Lesson 5: Pronoun - Part 1',
    urduTitle: 'سبق 5: اسم ضمیر - پہلا حصہ',
    link: "https://www.youtube.com/watch?v=OQPr_X--9-Y&list=PLoBSrpXXDzZF9zBXZnXSdchacQRGkZEEl&index=6" 
  },
  { 
    id: 'mno347', 
    title: 'Lesson 6: Pronoun 2',
    urduTitle: 'سبق 6: اسم ضمیر - دوسرا حصہ',
    link: "https://www.youtube.com/watch?v=zt_iNuKt8LQ&list=PLoBSrpXXDzZF9zBXZnXSdchacQRGkZEEl&index=1" 
  },
  { 
    id: 'mno348', 
    title: 'Lesson 7: Empty',
    urduTitle: 'سبق 7: خالی',
    link: "#" 
  },
  { 
    id: 'mno349', 
    title: 'Lesson 8: Empty',
    urduTitle: 'سبق 8: خالی',
    link: "#" 
  },
  { 
    id: 'mno350', 
    title: 'Lesson 9: Empty',
    urduTitle: 'سبق 9: خالی',
    link: "#" 
  },
];

export default function UrduGrammarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/explorer/foundation" 
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Foundation
        </Link>
        
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Urdu Grammar Lessons</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <Link 
              key={lesson.id}
              href={lesson?.link || ""}
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
