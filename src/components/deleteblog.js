"use client";
import { useState, useEffect } from "react";
import AxiosInstance from "../utils/axiosInstance";

const DeleteBlog = ({ blogId, onDeleteSuccess }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blogId) {
      fetchBlogs();
    }
  }, [blogId]);

  const fetchBlogs = async () => {
    try {
      const response = await AxiosInstance.get("blog/get-all-blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      setError("Failed to fetch blogs: " + error.message);
    }
  };

  const handleDeleteBlog = async () => {
    if (!blogId) {
      setError("No blog ID provided for deletion.");
      return;
    }

    try {
      await AxiosInstance.delete(`blog/delete-blog/${blogId}`); 
      onDeleteSuccess(); 
      alert("Blog deleted successfully!");
      fetchBlogs(); 
    } catch (error) {
      setError("Failed to delete blog: " + error.message);
    }
  };

  return (
    <div className="card bg-white rounded-xl p-6 w-[90%] m-auto">
      <h1 className="text-2xl font-bold mb-4">Delete Blog</h1>

      <button
        onClick={handleDeleteBlog}
        className="bg-gradient-to-r from-pink-500 to-blue-500 p-2 pl-6 pr-6 mt-2 rounded-sm text-white"
      >
        Delete Blog
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DeleteBlog;
