'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Test {
  id: string;
  title: string;
  description: string;
  category: string;
  subject: string;
}

export default function SubjectTestsPage() {
  const params = useParams();
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTests();
  }, [params.subject]);

  const fetchTests = async () => {
    try {
      const res = await fetch(`/api/tests?category=foundation&subject=${params.subject}`);
      const data = await res.json();
      
      if (!res.ok) {
        console.error('API Error:', data);
        toast.error(data.error || 'Failed to fetch tests');
        setTests([]);
        return;
      }
      
      if (Array.isArray(data)) {
        setTests(data);
      } else {
        console.error('Invalid data format:', data);
        setTests([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch tests');
      setTests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const startTest = (testId: string) => {
    router.push(`/test-yourself/take/${testId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {params.subject} Tests - Foundation
        </h1>

        {tests.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">No tests available yet</h2>
            <div className="text-gray-600 space-y-3">
              <p className="text-center">اس subject کے لیے ابھی کوئی test نہیں ہے۔</p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold mb-2">Admin Setup Required:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">npx prisma generate</code></li>
                  <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">npx prisma migrate dev</code></li>
                  <li>Make yourself admin in database</li>
                  <li>Go to <code className="bg-gray-200 px-2 py-1 rounded">/admin/tests</code> to create tests</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {tests.map((test) => (
              <div key={test.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                <Button onClick={() => startTest(test.id)}>
                  Start Test
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
