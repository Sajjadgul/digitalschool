'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Shield, CheckCircle } from 'lucide-react';

export default function MakeAdminPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMakeAdmin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/make-admin', {
        method: 'POST'
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success(data.message);
      setIsAdmin(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Please login first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <Shield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Make Admin</h1>
          <p className="text-gray-600">
            Logged in as: <span className="font-semibold">{session.user?.email}</span>
          </p>
        </div>

        {isAdmin ? (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-600 font-semibold mb-4">
              آپ اب Admin ہیں! 🎉
            </p>
            <Button onClick={() => window.location.href = '/admin/tests'} className="w-full">
              Go to Admin Panel
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6 text-center">
              Click the button below to make yourself an admin. You will then be able to create and manage tests.
            </p>
            <Button 
              onClick={handleMakeAdmin} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Make Me Admin'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
