"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { PlusIcon } from "@heroicons/react/24/solid";
import UpdateBlogForm from "@/components/updateBlog";

const PublicBlog = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await AxiosInstance.get("blog/get-all-blog-public");
        setData(response.data.blogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
      console.error("Error creating blog:", error.response?.data || error.message || error);
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

  return (
    <div className="bg-light-blue-100 space-y-6 mt-6 p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-md transition-transform hover:scale-110 float-right"
      >
        <PlusIcon className="h-9 w-9" />
      </button>

      {showForm && (
        <form onSubmit={handleCreateBlog} className="mt-4 w-full max-w-xl m-auto">
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
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 pl-6 pr-6 mt-2 rounded-sm"
          >
            Create
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl m-auto">
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
            <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">Update Blog</h2>
            <UpdateBlogForm blog={selectedBlog} isOpen={showUpdateModal} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicBlog;
