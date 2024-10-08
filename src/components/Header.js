'use client';

import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Header() {
  const router = useRouter(); // Initialize the router

  const goToLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  const goToSignup = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <header className="bg-[#7fa1e8] w-full p-4 flex items-center justify-between shadow-md">
      <div className="logo text-white text-2xl font-bold">Wizards</div>

      <div className="flex items-center gap-4">
        <Button
          className="login bg-white py-2 px-7 text-purple-500 font-semibold rounded-full shadow-md hover:bg-gray-100"
          aria-label="Login"
          onClick={goToLogin}  // Add onClick handler for login
        >
          Login
        </Button>

        <div className="w-px h-8 bg-gray-300"></div>

        <Button
          className="signup bg-purple-600 py-2 px-7 text-white font-semibold rounded-full shadow-md hover:bg-purple-700"
          aria-label="Sign Up"
          onClick={goToSignup}  // Add onClick handler for signup
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}
