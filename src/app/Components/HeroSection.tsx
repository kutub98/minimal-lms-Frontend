"use client";

import Image from "next/image";
import HeroBanner from "./../../Assets/heroBanner.webp";
import { FaPhoneAlt } from "react-icons/fa";
import Container from "@/components/ui/Container";
import AnimatedButton from "../../components/ui/AnimateButton";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#560bad] to-[#9b2c91] w-full py-12 md:py-20 lg:flex lg:items-center lg:justify-between shadow-xl relative overflow-hidden">
      {/* Left content */}
      <Container className=" space-y-4 px-6 text-white relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide text-white">
          Enhance Your Skills <br className="hidden md:block" />
          With <span className="text-yellow-400">Our Online</span> Courses
        </h1>

        <p className="text-gray-200 text-base md:text-lg max-w-md">
          Dive into a World of Knowledge with Our Comprehensive and Engaging
          Online Courses Designed for Skill Enhancement.
        </p>

        <div className="flex items-center gap-6">
          <AnimatedButton className="px-8 bg-[#f9a826] w-auto h-auto text-white rounded-full hover:bg-[#560bad] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            Apply Now
          </AnimatedButton>
          <AnimatedButton className="px-8 w-auto h-auto !text-white rounded-full border-2 !border-white hover:bg-white hover:text-[#560bad] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            Know More
          </AnimatedButton>
        </div>

        <div className="text-sm text-gray-300 mt-4 flex items-center gap-2">
          <FaPhoneAlt className="text-yellow-400" />
          <span>Call Us: 000 0000 0000</span>
        </div>
      </Container>

      {/* Right content */}
      <div className="relative hidden lg:block w-full mt-10 lg:mt-0 md:w-1/2">
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
          <span className="text-lg font-semibold">100K Enrolled Students</span>
        </div>
      </div>

      {/* Decorative Effect: Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-[#560bad]/80 z-0"></div>
    </div>
  );
};

export default HeroSection;
