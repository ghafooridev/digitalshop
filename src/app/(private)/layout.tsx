import React from 'react';

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      for private routes
      {children}
      <footer className="bg-emerald-800 w-full text-white flex items-center justify-center h-10">
        <p>&copy; 2025 JS with Ali. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default layout;
