'use client';
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';

const AdminMenu = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<LayoutDashboard size="sm" />}
          href="/dashboard/products"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default AdminMenu;
