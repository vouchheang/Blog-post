"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Import useRouter
import AxiosInstance from "@/utils/axiosInstance";
import Header from "@/components/Header";

const PublicBlog = ({ params }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromPage, setFromPage] = useState(null); // State to store referrer
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await AxiosInstance.get(`blog/get-blog/${params.id}`);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    // Check the referrer to see if the user came from 'All Blogs' or 'Blogs'
    const referrer = document.referrer;
    if (referrer.includes('allblogs')) {
      setFromPage('allblogs');
    } else if (referrer.includes('blog')) {
      setFromPage('blog');
    }
  }, [params.id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Back button handler
  const handleBackClick = () => {
    if (fromPage === 'allblogs') {
      router.push('/allblogs'); // Navigate back to 'All Blogs' page
    } else if (fromPage === 'blog') {
      router.push('/blog'); // Navigate back to 'Blogs' page
    } else {
      router.back(); // Default fallback if no referrer
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start px-6 pt-10">
      <Header/>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
        {data?.title || "The Shoe That Flew"}
      </h1>

      {/* Image */}
      <img
        src={data?.thumbnail || "/path-to-default-image.png"}
        className="w-full sm:w-[50%] lg:w-[30%] h-auto rounded-lg shadow-md mb-8"
        alt="Blog Thumbnail"
      />

      {/* Description */}
      <div className="max-w-3xl text-gray-700 text-lg text-center leading-relaxed mb-6">
        <p>
          {data?.desc ||
          `Enid Blyton's The Enchanted Wood is a delightful tale that sparks the imagination with its whimsical settings and colorful characters. It transports readers to a world of wonder and excitement, where every chapter brings new surprises and adventures.`}
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Back
      </button>
    </div>
  );
};

export default PublicBlog;
