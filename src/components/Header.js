'use client';

import { Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Header() {
  const router = useRouter(); // Initialize the router
  const [userProfile, setUserProfile] = useState(null); // State to store user profile data

  // Function to navigate to login page
  const goToLogin = () => {
    router.push('/login');
  };

  // Function to navigate to signup page
  const goToSignup = () => {
    router.push('/signup');
  };

  // Function to navigate to the landing page after logout
  const goToLandingPage = () => {
    router.push('/');
  };

  // Logout function to remove token from localStorage and redirect to landing page
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUserProfile(null); // Clear the user profile state
    goToLandingPage(); // Redirect to the landing page
  };

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (token) {
        try {
          const response = await fetch('https://students-hackaton.vercel.app/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUserProfile(data); // Store the profile data
          } else {
            console.error('Failed to fetch user profile');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile(); // Call the function to fetch user profile
  }, []);

  return (
    <header className="bg-[#7fa1e8] w-full p-4 flex items-center justify-between shadow-md">
      <div className="logo text-white text-2xl font-bold">Wizards</div>

      <div className="flex items-center gap-4">
        {userProfile ? (
          <div className="flex items-center gap-2">
            <img
              src={userProfile.avatar || 'default-avatar-url.jpg'} // Fallback avatar if not available
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-white font-semibold">{userProfile.firstName}</span>
            <div className="w-px h-8 bg-gray-300"></div>

            <Button
              className="logout bg-red-500 py-2 px-5 text-white font-semibold rounded-full shadow-md hover:bg-red-600"
              onClick={handleLogout} // Add onClick handler for logout
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              className="login bg-white py-2 px-7 text-purple-500 font-semibold rounded-full shadow-md hover:bg-gray-100"
              aria-label="Login"
              onClick={goToLogin} // Add onClick handler for login
            >
              Login
            </Button>

            <div className="w-px h-8 bg-gray-300"></div>

            <Button
              className="signup bg-purple-600 py-2 px-7 text-white font-semibold rounded-full shadow-md hover:bg-purple-700"
              aria-label="Sign Up"
              onClick={goToSignup} // Add onClick handler for signup
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
