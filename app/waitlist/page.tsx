"use client";

import { useEffect, useState } from 'react';
import { getWaitlistUsers } from '@/utils/waitlistOperations';
import { useUser } from "@clerk/nextjs";

interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  timestamp: { seconds: number; nanoseconds: number };
}

export default function WaitlistPage() {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const waitlistUsers = await getWaitlistUsers();
      setUsers(waitlistUsers);
    };

    fetchUsers();
  }, []);

  if (!isLoaded || !isSignedIn) {
    return <div>Please sign in to view the waitlist.</div>;
  }

  if (user.publicMetadata.role !== 'admin') {
    return <div>You don't have permission to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Waitlist Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <span className="font-semibold">{user.name}</span> - {user.email} (
            {new Date(user.timestamp.seconds * 1000).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}