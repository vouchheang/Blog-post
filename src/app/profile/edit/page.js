'use client';

import { useRouter } from "next/navigation"; // Import useRouter hook
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Image from "next/image";
import Header from "@/components/Header";
import Bgi from "@/images/bg1.jpg";

function Profile() {
  const [user, setUser] = useState(null); // State to hold user data
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phoneNumber: '',
    bio: ''
  });
  const router = useRouter();

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
            setFormData({
              lastName: data.lastName,
              firstName: data.firstName,
              phoneNumber: data.phoneNumber,
              bio: data.bio
            });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.post(
          "https://students-hackaton.vercel.app/user/update",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Profile updated successfully!");
          // Optionally, you can redirect the user to a different page after updating
          router.push("/profile");
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleBackClick = () => {
    router.push("/profile"); // Navigate back to the profile page
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
        {/* Profile Form */}
        <div className="bg-gradient-to-r from-blue-200 to-purple-200 bg-opacity-90 w-4/5 md:w-2/5 p-8 rounded-lg shadow-lg text-gray-800 h-[700px]">
          {/* Avatar and Edit Profile */}

          <div className="flex flex-col items-center mb-6">
            {/* If user has an avatar, display it, otherwise use a placeholder */}
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2">
              {user?.avatar ? (
                <img src={user.avatar} alt="User Avatar" className="rounded-full w-full h-full" />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              )}
            </div>
            <p className="text-gray-700">Edit profile</p>
          </div>

          {/* Profile Form */}
          {user ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                  rows="4"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleBackClick} // Handle back button click
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
