'use client';

import Link from 'next/link';

export default function TestYourselfPage() {
  const buttonClasses = "flex-1 rounded-lg p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center text-center";

  const subjects = [
    { name: 'Math', slug: 'math', color: 'from-blue-400 to-blue-600' },
    { name: 'Urdu', slug: 'urdu', color: 'from-green-400 to-green-600' },
    { name: 'English', slug: 'english', color: 'from-purple-400 to-purple-600' },
    { name: 'Arabic', slug: 'arabic', color: 'from-amber-400 to-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-12 text-center text-3xl font-bold text-gray-800">Test Your Knowledge</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Foundation Tests</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {subjects.map((subject) => (
                <Link 
                  key={subject.slug}
                  href={`/test-yourself/foundation/${subject.slug}`}
                  className={`${buttonClasses} bg-gradient-to-r ${subject.color} h-32`}
                >
                  <h3 className="text-2xl font-bold">{subject.name}</h3>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
