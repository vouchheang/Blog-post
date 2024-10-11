"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "../utils/axiosInstance";

const UpdateBlog = ({ blog = null, isOpen = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState(blog?._id || "");
  const [selectedBlog, setSelectedBlog] = useState(blog || null);
  const [title, setTitle] = useState(blog?.title || "");
  const [desc, setDesc] = useState(blog?.desc || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blog) {
      fetchBlogs();
    }
  }, [blog]);

  const fetchBlogs = async () => {
    try {
      const response = await AxiosInstance.get("blog/get-all-blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      setError("Failed to fetch blogs: " + error.message);
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !desc) {
      setError("Title and description are required.");
      return;
    }

    try {
      let imageUrl = selectedBlog?.thumbnail;

      if (thumbnail) {
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

        imageUrl = imageResponse.data?.url;
        if (!imageUrl) {
          throw new Error("Failed to upload image.");
        }
      }

      const updatedData = {
        title,
        desc,
        thumbnail: imageUrl,
      };

      const response = await AxiosInstance.put(
        `blog/update-blog/${id}`,
        updatedData
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === selectedBlog._id ? response.data : blog
        )
      );

      resetForm();
    } catch (error) {
      setError("Failed to update blog: " + error.message);
    }
  };

  const resetForm = () => {
    setSelectedBlog(null);
    setTitle("");
    setDesc("");
    setThumbnail(null);
    setId("");
  };

  return (
    <div className="card bg-white rounded-xl shadow-md p-6 w-[90%] m-auto">
      <h1 className="text-2xl font-bold mb-4">Update Blogs</h1>

      {isOpen && (
        <form onSubmit={handleUpdateBlog} className="mb-8">
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
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 pl-6 pr-6 mt-2 rounded-sm text-white"
          >
            Update
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

     
    </div>
  );
};

export default UpdateBlog;
