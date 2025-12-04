'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const lessons = [
  { 
    id: 'arb001', 
    title: 'Lesson 1: Beginning of speech',
    urduTitle: 'سبق ۱: آغاز کلام',
    link: "https://www.youtube.com/watch?v=K5oLM7J2yqg&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=6" 
  },
  { 
    id: 'arb002', 
    title: 'Lesson 2: There is no might nor power except with Allah',
    urduTitle: 'سبق ۲: ولا حول ولا قوة الا بالله',
    link: "#" 
  },
  { 
    id: 'arb003', 
    title: 'Lesson 3: I seek refuge with Allah from Satan, the accursed',
    urduTitle: 'سبق ۳: اعوذ باللہ من الشیطان الرجیم',
    link: "#" 
  },
  { 
    id: 'arb004', 
    title: 'Lesson 4: In the name of Allah, the Most Gracious, the Most Merciful',
    urduTitle: 'سبق ۴: بسم اللہ الرحمن الرحیم',
    link: "https://www.youtube.com/watch?v=DFdh9gxSjQk&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=7&t=55s" 
  },
  { 
    id: 'arb005', 
    title: 'Lesson 5: All praise is due to Allah, Lord of the worlds',
    urduTitle: 'سبق ۵: الحمد للہ رب العالمین',
    link: "https://www.youtube.com/watch?v=2gUf0utfZtM&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=5" 
  },
  { 
    id: 'arb006', 
    title: 'Lesson 6: Owner of the day of Judgement to we seek help',
    urduTitle: 'سبق ۶: مالک یوم الدین تا نستعین',
    link: "https://www.youtube.com/watch?v=qWt_vZjr_mY&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=4" 
  },
  { 
    id: 'arb007', 
    title: 'Lesson 7: Guide us the right path to nor be astray',
    urduTitle: 'سبق ۷: اھدنا الصراط المستقیم تا ولا الضالین',
    link: "https://www.youtube.com/watch?v=WWM_TjO-k4U&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=3" 
  },
  { 
    id: 'arb008', 
    title: 'Lesson 8: Surah Al Qadr',
    urduTitle: 'سبق ۸: انا انزلناہ تا الفجر',
    link: "https://www.youtube.com/watch?v=w1q-C7njZ2g&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=2" 
  },
  { 
    id: 'arb009', 
    title: 'Lesson 9: Surah Ikhlaas',
    urduTitle: 'سبق ۹: قل ہو اللہ احد',
    link: "https://www.youtube.com/watch?v=dycCobvMqe4&list=PLoBSrpXXDzZGBLAHIU5RQu50V1KtFTjk1&index=1" 
  },
];

export default function ArabicGrammarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-600 via-amber-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/explorer/foundation" 
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Foundation
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Arabic Grammar Lessons (عربی میں صرف و نحو)</h1>
          <h2 className="text-2xl font-semibold text-amber-700 mt-2">Quran Translation (قرآن ترجمہ)</h2>
        </div>
        
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
