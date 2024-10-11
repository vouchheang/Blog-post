"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  // Function to navigate to login page
  const goToLogin = () => {
    router.push("/login");
  };

  // Function to navigate to signup page
  const goToSignup = () => {
    router.push("/signup");
  };

  // Function to navigate to the landing page after logout
  const goToLandingPage = () => {
    router.push("/");
  };

  // Logout function to remove token from localStorage and redirect to landing page
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserProfile(null);
    goToLandingPage();
  };

  // Function to navigate to the profile page
  const goToProfile = () => {
    router.push("/profile"); // Navigate to the profile page
  };

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(
            "https://students-hackaton.vercel.app/user/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
          } else {
            console.error("Failed to fetch user profile");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="bg-[#7fa1e8] w-full p-4 flex items-center justify-between shadow-md">
      {/* <img src={logo.src} className="logo w-[350px] h-[100px] text-2xl font-bold"/> */}

      <div className="flex items-center gap-4">
        {userProfile ? (
          <div className="flex items-center gap-2">
            {/* Add onClick handler to navigate to profile page */}
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={goToProfile}
            >
              <img
                src={userProfile.avatar || "default-avatar-url.jpg"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white font-semibold">
                {userProfile.firstName}
              </span>
            </div>

            <div className="w-px h-8 bg-gray-300"></div>

            <Button
              className="logout bg-red-500 py-2 px-5 text-white font-semibold rounded-full shadow-md hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              className="login bg-white py-2 px-7 text-purple-500 font-semibold rounded-full shadow-md hover:bg-gray-100"
              aria-label="Login"
              onClick={goToLogin}
            >
              Login
            </Button>

            <div className="w-px h-8 bg-gray-300"></div>

            <Button
              className="signup bg-purple-600 py-2 px-7 text-white font-semibold rounded-full shadow-md hover:bg-purple-700"
              aria-label="Sign Up"
              onClick={goToSignup}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
