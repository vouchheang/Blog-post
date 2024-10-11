"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import UpdateBlogForm from "@/components/updateBlog";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Bgi from "@/images/bg1.jpg";
import Link from "next/link"; 

const PublicBlog = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9; 

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

  const handleView = (id) => {
    router.push(`/view/${id}`);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const imageFormData = new FormData();
      imageFormData.append("file", thumbnail);

      const imageResponse = await AxiosInstance.post(
        "upload/upload-image",
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = imageResponse.data?.url;
      if (!imageUrl) {
        throw new Error("Failed to upload image.");
      }

      const postData = { title, desc, thumbnail: imageUrl };
      const blogResponse = await AxiosInstance.post("blog/create-blog", postData);

      setData((prevData) => [...prevData, blogResponse.data]);
      setShowForm(false);
      setTitle("");
      setDesc("");
      setThumbnail(null);
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data || error.message || error
      );
      setError("Failed to create blog. Please try again.");
    }
  };

  const closeModal = () => {
    setShowUpdateModal(false);
    setSelectedBlog(null);
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

        {showForm && (
          <form
            onSubmit={handleCreateBlog}
            className="mt-4 w-full max-w-xl m-auto"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="border text-black p-2 mb-2 w-full rounded-md"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter description"
              className="border p-2 text-black w-full mb-2 rounded-md"
            />
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="border p-2 text-black w-full mb-2 rounded-md"
            />
          </form>
        )}

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl m-auto mt-8">
          {data.map((post) => {
            const maxChars = 100;
            const descToShow =
              post.desc.length > maxChars
                ? post.desc.slice(0, maxChars) + "..."
                : post.desc;

            return (
              <div
                key={post._id}
                className="card bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleView(post._id)}
              >
                <img
                  src={post.thumbnail}
                  className="w-full h-45 rounded-xl object-cover"
                  alt="Image"
                />
                <div className="flex flex-col justify-between">
                  <h2 className="text-purple-700 text-lg font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-gray-800 text-sm">
                    {descToShow}
                    {post.desc.length > maxChars && (
                      <span
                        onClick={() => alert(post.desc)}
                        className="text-blue-500 cursor-pointer ml-1"
                      >
                        See more
                      </span>
                    )}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-gray-500 font-bold text-md">Created By:</p>
                    <p className="text-gray-500 font-bold text-md">
                      {post.createdBy.firstName}
                    </p>
                    <p className="text-gray-500 font-bold text-md">
                      {post.createdBy.lastName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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

        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] p-8 rounded-lg shadow-lg">
              <UpdateBlogForm
                blog={selectedBlog}
                closeModal={closeModal}
                setShowUpdateModal={setShowUpdateModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicBlog;
