"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";

const PublicBlog = ({ params }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
  }, []); 

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="bg-white shadow-md rounded-lg max-w-sm p-4">
        <h1 className="text-xl font-semibold mb-2">{data?.title}</h1>
        <img
          src={data?.thumbnail}
          className="w-full h-40 rounded-md object-cover mb-2"
          alt="Blog Thumbnail"
        />
        <p className="text-gray-700 text-sm">{data?.desc}</p>
      </div>
    </div>
  );
};

export default PublicBlog;
