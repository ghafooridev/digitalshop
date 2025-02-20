'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex justify-center flex-col items-center mt-20 ">
      <h2 className="text-xl">{error.message}</h2>
      <div className="flex justify-between mt-6 gap-10">
        <Button variant="secondary" onClick={() => reset()}>
          Try again
        </Button>
        <Button onClick={() => router.push('/')}>Home</Button>
      </div>
    </div>
  );
}

export default ErrorPage;
