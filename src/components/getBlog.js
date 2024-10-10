"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "../utils/axiosInstance";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import UpdateBlogForm from "@/components/updateBlog";

const Blog = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await AxiosInstance.get("blog/get-all-blogs");
        setData(response.data.blogs);
      } catch (error) {
        setError(error.message);
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
    setSelecaetedBlog(post);
    setTitle(post.title);
    setDesc(post.desc);
    setId(post._id);
    setThumbnail(null);
  };



  return (
    <div className="space-y-6 mt-6">
      <UpdateBlogForm />
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-md transform transition-transform hover:scale-110 ml-[90%]"
      >
        <PlusIcon className="h-9 w-9" />
        
      </button>

      {/* Blog Creation Form */}
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

      {/* Display Blogs */}
      {data.map((post, index) => (
        <div
          key={index}
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
              <button
                onClick={() => handleEdit(post)}
                className="mt-2 p-2 bg-blue-500 text-white rounded flex items-center"
              >
                <PencilIcon className="h-5 w-5 mr-1" />
                Edit
              </button>{" "}
              <TrashIcon className="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
