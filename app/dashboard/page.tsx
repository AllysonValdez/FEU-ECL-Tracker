'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect if not logged in
    }

    // This sets up the listener when the user is logged in
    if (user) {
      const handleMessage = async (event: MessageEvent) => {
        // We only accept messages from our own extension
        if (event.data.type === 'GET_AUTH_TOKEN') {
          console.log("Web app received a request for a token...");
          const idToken = await user.getIdToken(true); // Get a fresh token
          
          // Send the token back to the extension
          window.postMessage({ type: 'AUTH_TOKEN', token: idToken }, '*');
        }
      };
      
      window.addEventListener('message', handleMessage);

      // Clean up the listener when the component unmounts
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
        <Button variant="outline" onClick={() => auth.signOut()}>Sign Out</Button>
      </div>
      <p>This is your protected dashboard.</p>
    </div>
  );
}
