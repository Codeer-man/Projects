import { Link } from "react-router-dom";
import images from "../components/assets/images.png";
import TooltipButton from "../components/button/Tooltipbutton";

export default function Home() {
  return (
    <div className="h-[90vh] overflow-x-hidden w-screen flex justify-center items-center gap-20 bg-gray-200">
      <div className=" w-full h-full py-32 px-16">
        <h1 className="font-anonymouso font-bold text-5xl text-center mb-9 ">
          START CREATING YOUR OWN BLOGS
        </h1>
        <h3 className="font-anonymouso text-2xl mb-12">
          Share your unique story with the world, inspire others through your
          journey, and connect with like-minded people across the globe
        </h3>
        <div className="space-x-8 py-10">
          <Link
            to={"/login"}
            className="bg-[#77D359] p-4 rounded-2xl text-white text-md font-bold font-anonymouso tracking-wider transition-colors duration-300 hover:bg-green-700 hover:scale-110"
          >
            Join Now
          </Link>
          <Link
            to={"/blog-post"}
            className="p-4 rounded-2xl text-black bg-gray-300 font-bold transition-colors duration-300 hover:bg-gray-500 hover:scale-110 "
          >
            Browse Blog
          </Link>
        </div>
        <div className="flex w-full items-center ">
          <TooltipButton />
        </div>
      </div>

      <img className="p-6 mt-9 h-full" src={images} alt="Images" />
    </div>
  );
}
