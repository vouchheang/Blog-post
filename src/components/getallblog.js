// "use client";
// import { useEffect, useState } from "react";
// import AxiosInstance from "../utils/axiosInstance";
// import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
// import UpdateBlogForm from "@/components/updateBlog";
// import DeleteBlog from "@/components/deleteblog";

// const PublicBlog = () => {
//   const [data, setData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectPublicedBlog, setSelectedBlog] = useState(null);
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [thumbnail, setThumbnail] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await AxiosInstance.get("blog/get-all-blog-public");
//         setData(response.data.blogs);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!title || !desc || !thumbnail) {
//       setError("Title, description, and thumbnail are required.");
//       return;
//     }

//     try {
//       const imageFormData = new FormData();
//       imageFormData.append("file", thumbnail);

//       const imageResponse = await AxiosInstance.post(
//         "upload/upload-image",
//         imageFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const imageUrl = imageResponse.data?.url;
//       if (!imageUrl) {
//         throw new Error("Failed to upload image.");
//       }

//       const postData = {
//         title,
//         desc,
//         thumbnail: imageUrl,
//       };

//       const blogResponse = await AxiosInstance.post(
//         "blog/create-blog",
//         postData
//       );

//       setData((prevData) => [...prevData, blogResponse.data]);
//       setShowForm(false);
//       setTitle("");
//       setDesc("");
//       setThumbnail(null);
//     } catch (error) {
//       console.error(
//         "Error creating blog:",
//         error.response?.data || error.message || error
//       );
//       setError("Failed to create blog. Please try again.");
//     }
//   };

//   const handleEdit = (post) => {
//     setSelectedBlog(post);
//     setShowUpdateModal(true);
//   };

//   const closeModal = () => {
//     setShowUpdateModal(false);
//     setSelectedBlog(null);
//   };

//   const handleDeleteSuccess = (deletedBlogId) => {
//     setData((prevData) => prevData.filter((post) => post._id !== deletedBlogId));
//   };

//   return (
//     <div className="space-y-6 mt-6">
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-md transform transition-transform hover:scale-110 ml-[90%]"
//       >
//         <PlusIcon className="h-9 w-9" />
//       </button>

//       {showForm && (
//         <form onSubmit={handleCreateBlog} className="mt-4 w-[90%] m-auto">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter title"
//             className="border text-black p-2 mb-2 w-full rounded-md"
//           />

//           <textarea
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             placeholder="Enter description"
//             className="border p-2 text-black w-full mb-2 rounded-md"
//           ></textarea>

//           <input
//             type="file"
//             onChange={(e) => setThumbnail(e.target.files[0])}
//             className="border p-2 text-black w-full mb-2 rounded-md"
//           />

//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 pl-6 pr-6 mt-2 rounded-sm"
//           >
//             Create
//           </button>

//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </form>
//       )}

//       {data.map((post) => (
//         <div
//           key={post.id}
//           className="card bg-white rounded-xl shadow-md p-6 w-[90%] m-auto flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow duration-300"
//         >
//           <img
//             src={`${post.thumbnail}`}
//             className="w-full h-48 sm:h-36 rounded-xl object-cover"
//             alt="Image"
//           />
//           <div className="flex flex-col justify-between">
//             <h2 className="text-purple-700 text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-600">{post.createdBy.firstName}</p>
//             <p className="text-gray-800 text-md">{post.createdBy.firstName}</p>
//             <div className="flex space-x-4 mt-4">
//               <button onClick={() => handleEdit(post)}>
//                 <PencilIcon className="h-7 w-5 text-gray-500 cursor-pointer hover:text-blue-500" />
//               </button>
//               <DeleteBlog blogId={post.id} onDeleteSuccess={handleDeleteSuccess} />
//             </div>
//           </div>
//         </div>
//       ))}

//       {showUpdateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] p-8 rounded-lg shadow-lg relative transform transition-transform duration-300 ease-out">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">
//               Update Blog
//             </h2>

//             <UpdateBlogForm
//               blog={selectedBlog}
//               isOpen={showUpdateModal}
//               onClose={closeModal}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicBlog;
