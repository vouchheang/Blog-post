"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "../utils/axiosInstance";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import UpdateBlogForm from "@/components/updateBlog";
import DeleteBlog from "@/components/deleteblog";

const Blog = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  useEffect(() => {
    const fetchBlogs = async (page) => {
      try {
        const response = await AxiosInstance.get(
          `blog/get-all-blogs?page=${page}&limit=${limit}`
        );
        setData(response.data.blogs);
        setTotalPages(Math.ceil(response.data.totalBlogs / limit)); // Calculate total pages
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogs(currentPage); 
  }, [currentPage]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !desc || !thumbnail) {
      setError("Title, description, and thumbnail are required.");
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append("file", thumbnail);

      const imageResponse = await AxiosInstance.post(
        "upload/upload-image",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = imageResponse.data?.url;
      if (!imageUrl) {
        throw new Error("Failed to upload image.");
      }

      const postData = {
        title,
        desc,
        thumbnail: imageUrl,
      };

      const blogResponse = await AxiosInstance.post(
        "blog/create-blog",
        postData
      );

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

  const handleEdit = (post) => {
    setSelectedBlog(post);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setShowUpdateModal(false);
    setSelectedBlog(null);
  };

  const handleDeleteSuccess = (deletedBlogId) => {
    setData((prevData) => prevData.filter((post) => post._id !== deletedBlogId));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-md transform transition-transform hover:scale-110 ml-[90%]"
      >
        <PlusIcon className="h-9 w-9" />
      </button>

      {showForm && (
        <form onSubmit={handleCreateBlog} className="mt-4 w-[90%] m-auto">
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
          ></textarea>

          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="border p-2 text-black w-full mb-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 pl-6 pr-6 mt-2 rounded-sm"
          >
            Create
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

      {data.map((post) => (
        <div
          key={post.id}
          className="card bg-white rounded-xl shadow-md p-6 w-[90%] m-auto flex"
        >
          <img
            src={`${post.thumbnail}`}
            className="w-[18%] rounded-xl shadow-lg"
            alt="Image"
          />
          <div className="flex flex-col space-x-4 ml-8 gap-3">
            <h2 className="text-purple-700 text-2xl font-semibold ml-4">
              {post.title}
            </h2>
            <p className="text-gray-800 text-lg">{post.desc}</p>
            <div className="space-x-4 flex mt-4">
              <button onClick={() => handleEdit(post)}>
                <PencilIcon className="h-7 w-5 text-gray-500 cursor-pointer hover:text-blue-500" />
              </button>
              <DeleteBlog blogId={post._id} onDeleteSuccess={handleDeleteSuccess} />
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
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
          <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] p-8 rounded-lg shadow-lg relative transform transition-transform duration-300 ease-out">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">
              Update Blog
            </h2>

            <UpdateBlogForm
              blog={selectedBlog}
              isOpen={showUpdateModal}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
