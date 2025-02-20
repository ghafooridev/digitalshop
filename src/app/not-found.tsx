'use client';

import React from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-8xl font-bold text-black animate-bounce">404</h1>
      <p className="text-xl text-gray-600 my-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
