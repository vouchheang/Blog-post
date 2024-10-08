import Image from "next/image";
import Header from "../../components/Header";
import image from "../../images/bg.jpg";
import image1 from "../../images/p2.png";
import Bgi from "../../images/bg1.jpg";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div
        className="flex text-white "
        style={{
          backgroundImage: `url(${Bgi.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="title w-full">
          <div className="flex flex-col items-center pt-10">
            <p className="flex items-center justify-center h-12 w-52 font-sans bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-12">
              👋 Meet Personally
            </p>

            <h1 className="font-bold text-center bg-gradient-to-r from-[#C41740] to-[#EA9C28] bg-clip-text text-transparent text-7xl">
              Minimal blog
              <br /> creative expressions
            </h1>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
