import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin;
  if (!isAdmin) redirect('/');
  return <div>{children}</div>;
}

export default layout;
