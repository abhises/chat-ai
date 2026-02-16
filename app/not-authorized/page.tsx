// app/not-authorized/page.tsx
"use client"
import { SignOutButton } from '@clerk/nextjs'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
export default function NotAuthorizedPage() {
    const router =useRouter()
  return (
    <div className="text-center mt-20">
        <div className="flex justify-center mb-4 rounded-full">
                <Image
                  src="/logo.png"       // Place your logo in public/logo.png
                  alt="Logo"
                  width={300}           // Adjust size as needed
                  height={300}
                  className="object-contain"
                  priority               // Loads logo quickly
                />
              </div>
      <h1 className="text-2xl font-bold">Not Authorized</h1>
      <p>You do not have permission to access this page.</p>
      <SignOutButton>
        <button onClick={()=>router.replace("sign-in")} className="mt-4 px-4 py-2 bg-red-300 text-white rounded hover:bg-red-600 cursor-pointer hover:scale-110">
          Go Back
        </button>
      </SignOutButton>
    </div>
  );
}