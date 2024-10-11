"use client";
import { useState, useEffect } from "react";
import AxiosInstance from "../utils/axiosInstance";
import { TrashIcon } from "@heroicons/react/24/solid";

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
    console.log(blogId, "====");

    if (!blogId) {
      setError("No blog ID provided for deletion.");
      return;
    }

    try {
      await AxiosInstance.delete(`blog/delete-blog/${blogId}`);
      onDeleteSuccess();
      fetchBlogs();
    } catch (error) {
      setError("Failed to delete blog: " + error.message);
    }
  };

  return (
    <>
      <button onClick={handleDeleteBlog} className="hover:text-red-500 text-gray-500">
        <TrashIcon className="h-5 w-6" />
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default DeleteBlog;
