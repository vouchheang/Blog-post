"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import Header from "../../components/Header";
import Bgi from "@/images/bg1.jpg";
import Link from "next/link"; // Import Link for navigation

const PublicBlog = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9; // Items per page

  useEffect(() => {
    const fetchBlogs = async (Page) => {
      try {
        setLoading(true); // Set loading state to true while fetching data
        const response = await AxiosInstance.get(
          `blog/get-all-blog-public?page=${Page}&limit=${limit}`
        );

        // Make sure the response structure matches what you're using
        setData(response.data.blogs); // Set the blogs data
        setTotalPages(Math.ceil(response.data.totalBlogs / limit)); // Calculate total pages
      } catch (error) {
        setError(error.message); // Set any errors that occur
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchBlogs(currentPage); // Call fetchBlogs with the currentPage

  }, [currentPage]); // Run effect whenever currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement page
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div
        className="items-center justify-around text-white flex-grow"
        style={{
          backgroundImage: `url(${Bgi.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="title w-full flex flex-col items-center pt-16 ">
          <Link href="blog">
            <p className="cursor-pointer flex items-center justify-center h-14 w-60 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg mb-12 hover:scale-105 transition-transform">
              👋 Own blog
            </p>
          </Link>

          <h1 className="font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-7xl sm:text-6xl ">
            Blog Post
            <br /> Felling Expressions
          </h1>
        </div>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl m-auto mt-8">
          {data.map((post) => {
            const maxChars = 100;
            const descToShow = post.desc.length > maxChars ? post.desc.slice(0, maxChars) + "..." : post.desc;

            return (
              <div key={post._id} className="card bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300">
                <img src={post.thumbnail} className="w-full h-45 rounded-xl object-cover" alt="Image" />
                <div className="flex flex-col justify-between">
                  <h2 className="text-purple-700 text-lg font-semibold">{post.title}</h2>
                  <p className="text-gray-800 text-sm">
                    {descToShow}
                    {post.desc.length > maxChars && (
                      <span onClick={() => alert(post.desc)} className="text-blue-500 cursor-pointer ml-1">
                        See more
                      </span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
         
          <div className="flex justify-between items-center mt-6 w-[90%] m-auto">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>

          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default PublicBlog;
