'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // for redirecting after login
import Bgi from "../../images/bg1.jpg";
import Header from "../../components/Header";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Track if login is successful
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    setMessage(''); // Clear any previous message

    try {
      const response = await fetch('https://students-hackaton.vercel.app/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // get the token
        localStorage.setItem('token', data.token); // save token in localStorage
        setIsSuccess(true); // Set success state to true
        setMessage('Login successful! Redirecting...');
        router.push('/blog'); // redirect to the blog page after login
      } else {
        setIsSuccess(false); // Set success state to false
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false); // Set success state to false
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <div
        className="flex h-screen items-center justify-center bg-gray-100"
        style={{
          backgroundImage: `url(${Bgi.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-1/3 h-4/6 bg-opacity-40 p-8 shadow-xl rounded-sm bg-gradient-to-r from-blue-200 to-purple-200">
          <h2 className="text-3xl font-bold mb-6 text-center mt-20">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className={`px-8 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ${
                isLoading ? 'cursor-not-allowed' : ''
              }`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? 'Logging in...' : 'Login'} {/* Display loading text */}
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                isSuccess ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
