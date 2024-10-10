'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import Image from "next/image";
import Header from "../../components/Header";
import Bgi from "@/images/bg1.jpg";
import axios from 'axios'; // Ensure axios is imported

function Profile() {
  const [user, setUser] = useState(null); // State to hold user data
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Fetch user profile from API or local storage
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage

      if (token) {
        try {
          const response = await fetch("https://students-hackaton.vercel.app/user/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data); // Set user data in state
            setProfileImage(data.avatar); // Set user's current profile image
          } else {
            console.error("Failed to fetch user profile");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile(); // Fetch user profile when component mounts
  }, []);

  const handleEditClick = () => {
    router.push("/profile/edit"); // Navigate to the edit information page
  };

  const handleBackToBlogClick = () => {
    router.push("/blog"); // Navigate to the blog page
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div
        className="flex items-center justify-around text-white flex-grow"
        style={{
          backgroundImage: `url(${Bgi.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Profile Display */}
        <div className="bg-gradient-to-r from-blue-200 to-purple-200 bg-opacity-90 w-4/5 md:w-2/5 p-8 rounded-lg shadow-lg text-gray-800 h-auto">
          {/* Avatar and Profile Info */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center border-4 border-gray-400">
                  <span className="text-gray-700">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          {user ? (
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Last name</label>
                <div className="w-full p-2 border border-gray-300 rounded bg-white">
                  {user.lastName}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">First name</label>
                <div className="w-full p-2 border border-gray-300 rounded bg-white">
                  {user.firstName}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone number</label>
                <div className="w-full p-2 border border-gray-300 rounded bg-white">
                  {user.phoneNumber}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Bio</label>
                <div className="w-full p-2 border border-gray-300 rounded bg-white">
                  {user.bio}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleEditClick} // Handle edit button click
                  className="px-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Edit Information
                </button>
                <button
                  type="button"
                  onClick={handleBackToBlogClick} // Handle back to blog button click
                  className="px-5 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Back 
                </button>
              </div>
            </form>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
