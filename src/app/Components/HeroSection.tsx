"use client";

import Image from "next/image";
import HeroBanner from "./../../Assets/heroBanner.webp";
import { FaPhoneAlt } from "react-icons/fa";
import AnimatedButton from "../../components/ui/AnimateButton";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#560bad] to-[#9b2c91] w-full py-12 md:py-20 shadow-xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-20">
        {/* Left content */}
        <div className="w-full lg:w-1/2 space-y-2 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-wide text-white">
            Enhance Your Skills <br className="hidden md:block" />
            With <span className="text-yellow-400">Our Online</span> Courses
          </h1>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl mt-4 max-w-xl">
            Dive into a World of Knowledge with Our Comprehensive and Engaging
            Online Courses Designed for Skill Enhancement.
          </p>

          <div className="flex flex-col sm:flex-row sm:gap-6 mt-6">
            <AnimatedButton className="px-8 w-auto h-auto bg-[#f9a826] text-white rounded-full hover:bg-[#560bad] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Apply Now
            </AnimatedButton>
            <AnimatedButton className="px-8 w-auto h-auto mt-4 sm:mt-0 !text-white rounded-full border-2 !border-white hover:bg-white hover:text-[#560bad] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Know More
            </AnimatedButton>
          </div>

          <div className="text-sm text-gray-300 mt-6 flex items-center gap-2">
            <FaPhoneAlt className="text-yellow-400" />
            <span>Call Us: 000 0000 0000</span>
          </div>
        </div>

        {/* Right content */}
        <div className="w-full lg:w-1/2 relative hidden lg:block">
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] max-w-md mx-auto overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-500">
            <Image
              src={HeroBanner}
              alt="Hero Illustration"
              fill
              className="object-cover rounded-xl hover:opacity-80 transition-opacity duration-300"
              priority
            />
          </div>

          {/* Enrolled Students Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#560bad] text-white shadow-md px-6 py-3 rounded-full flex items-center gap-4 z-10 animate-bounce hover:scale-105 transition-all duration-500">
            <span className="text-lg font-semibold">
              100K Enrolled Students
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-[#560bad]/80 z-0"></div>
    </div>
  );
};

export default HeroSection;
