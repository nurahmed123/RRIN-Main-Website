'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/ai/chat'); // Redirect to /ai/chat
  }, [router]);

  return null; // No need to render anything since it's redirecting
};

export default HomePage;
