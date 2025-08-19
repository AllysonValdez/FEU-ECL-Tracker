'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { getSchedule, ScheduleItem } from '@/lib/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!authLoading && !user) {
      router.push('/login');
    }

    // Fetch data when the user is available
    if (user) {
      getSchedule(user.uid)
        .then(data => {
          setSchedule(data);
        })
        .catch(error => {
          console.error("Error fetching schedule:", error);
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [user, authLoading, router]);

  // We are not including the auth token listener from before to keep this clean.
  // In a real app, you would combine them.

  if (authLoading || dataLoading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.displayName}</h1>
        <Button variant="outline" onClick={() => auth.signOut()}>Sign Out</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {schedule.length > 0 ? (
            <div className="space-y-4">
              {schedule.map((item) => (
                <div key={item.section} className="p-3 bg-secondary rounded-lg">
                  <p className="font-bold">{item.courseCode} - {item.section}</p>
                  <p>{item.day}, {item.startTime} - {item.endTime}</p>
                  <p>Room: {item.room} | Prof: {item.professor || 'N/A'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No schedule data found. Use the extension to sync your schedule from the portal.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
