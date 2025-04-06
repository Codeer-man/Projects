import { Link } from "react-router-dom";
import images from "../components/assets/images.png";
import TooltipButton from "../components/button/Tooltipbutton";

export default function Home() {
  return (
    <div className="min-h-[90vh] w-screen flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-20 bg-gray-200 p-4 overflow-x-hidden">
      <div className="w-full lg:w-1/2 h-full py-8 lg:py-32 px-4 md:px-8 lg:px-16 order-2 lg:order-1">
        <h1 className="font-anonymouso font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-6 lg:mb-9">
          START CREATING YOUR OWN BLOGS
        </h1>
        <h3 className="font-anonymouso text-lg sm:text-xl md:text-2xl mb-8 lg:mb-12 text-center md:text-left">
          Share your unique story with the world, inspire others through your
          journey, and connect with like-minded people across the globe
        </h3>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 py-6 lg:py-10 justify-center md:justify-start">
          <Link
            to={"/login"}
            className="bg-[#77D359] px-6 py-3 sm:p-4 rounded-2xl text-white text-md font-bold font-anonymouso tracking-wider transition-colors duration-300 hover:bg-green-700 hover:scale-110 text-center"
          >
            Join Now
          </Link>
          <Link
            to={"/blog-post"}
            className="px-6 py-3 sm:p-4 rounded-2xl text-black bg-gray-300 font-bold transition-colors duration-300 hover:bg-gray-500 hover:scale-110 text-center"
          >
            Browse Blog
          </Link>
        </div>
        <div className="flex w-full items-center justify-center md:justify-start">
          <TooltipButton />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
        <img
          className="p-2 md:p-6 mt-0 lg:mt-9 h-auto max-h-[400px] lg:max-h-full object-contain"
          src={images}
          alt="Blog illustration"
        />
      </div>
    </div>
  );
}
