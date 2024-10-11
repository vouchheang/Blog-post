import Image from "next/image";
import Header from "../components/Header";
import image from "../images/bg.jpg";
import image1 from "../images/p2.png";
import Bgi from "../images/bg1.jpg";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div
        className="flex items-center justify-around text-white flex-grow"
        style={{
          backgroundImage: `url(${Bgi.src})`,
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
        }}
      >
        <div>
          <Image
            src={image}
            width={900}
            height={700}
            alt="Image"
            className="mr-[10%]"
          />
        </div>
        <div className="flex">
          <p className="text-[28px] max-w-xl text-left text-gray-500">
            <span className="text-6xl font-bold text-gray-600">Welcome </span>A
            daily blog is like a captivating diary shared with the world, where
            each entry unveils a new chapter of the author’s life. It's a
            vibrant tapestry woven with personal anecdotes, daily musings, and
            thought-provoking insights that resonate with readers. Each day
            brings fresh content, from quirky observations about life’s little
            moments to profound reflections on personal growth and challenges.
          </p>
          <Image
            src={image1}
            width={300}
            height={300}
            alt="Image"
            className="ml-[-10px] mt-[-70px]"
          />
        </div>

      </div>
    </div>
  );
}
