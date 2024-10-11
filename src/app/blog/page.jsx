import Header from "../../components/Header";
import Bgi from "../../images/bg1.jpg";
import GetBlog from "@/components/getBlog";
import Delete from "@/components/deleteblog"

export default function Blogpage() {
  return (
    <div className="bg-white flex flex-col ">
      <Header />

      <div
        className="text-white w-full h-auto"
        style={{
          backgroundImage: `url(${Bgi.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="title w-full flex flex-col items-center pt-16 ">
          <p className="flex items-center justify-center h-14 w-60 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg mb-12">
            👋 Sharing
          </p>

          <h1 className="font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-7xl sm:text-6xl ">
            Blog Post
            <br /> Felling Expressions
          </h1>
        </div>

        <div className="w-2/3 bg-gray-100 opacity-[85%] m-auto mt-12 p-8 rounded-xl shadow-xl mb-8">
          <GetBlog />
          
          <Delete/>
        </div>
      </div>
    </div>
  );
}
