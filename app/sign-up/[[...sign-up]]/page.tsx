import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        
        {/* Logo */}
        {/* <div className="flex justify-center">
          <Image
            src="/logo.png"       // Place your logo in public/logo.png
            alt="Logo"
            width={300}           // Adjust size as needed
            height={300}
            className="object-contain"
            priority               // Loads logo quickly
          />
        </div> */}
  
        {/* SignIn form */}
        <div className="flex justify-center">
          <SignUp />
        </div>
        
      </div>
}