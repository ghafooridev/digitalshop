// guest // user // admin

import { currentUser } from '@clerk/nextjs/server';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import AdminMenu from './AdminMenu';

async function Auth() {
  const user = await currentUser();
  console.log(user);
  const isAdmin = user?.privateMetadata?.isAdmin;

  return (
    <div>
      <SignedIn>{isAdmin ? <AdminMenu /> : <UserButton />}</SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default Auth;
