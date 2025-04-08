"use client";

import Image from "next/image";
import HeroBanner from "./../../Assets/heroBanner.webp";
import { FaPhoneAlt } from "react-icons/fa";
import Container from "@/components/ui/Container";
import AnimatedButton from "../../components/ui/AnimateButton";

const HeroSection = () => {
  return (
    <div className="bg-[#ffffff] w-full py-12 md:py-20 lg:flex lg:items-center lg:justify-between">
      {/* Left content */}
      <Container className="max-w-xl space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Enhance Your Skills <br className="hidden md:" />
          With <span className="text-[#560bad]">Our Online</span> Courses
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          Dive into a World of Knowledge with Our Comprehensive and Engaging
          Online Courses Designed for Skill Enhancement
        </p>

        <div className="flex items-center gap-4">
          <AnimatedButton className=" h-auto w-auto px-5 bg-[#560bad] rounded-full  !text-white">
            Apply Now
          </AnimatedButton>
          <AnimatedButton className="rounded-full">Know More</AnimatedButton>
        </div>

        <div className="text-sm text-gray-700 mt-4 flex items-center gap-2">
          <FaPhoneAlt className="text-[#560bad]" />
          <span>Call Us : 000 0000 0000</span>
        </div>
      </Container>

      {/* Right content */}
      <div className="relative hidden lg:block w-full mt-10 lg:mt-0 md:w-1/2 justify-center">
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] max-w-sm mx-auto">
          <Image
            src={HeroBanner}
            alt="Hero Illustration"
            fill
            className="object-contain rounded-xl"
            priority
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full flex items-center gap-2 z-10">
          <span className="text-sm font-medium text-blue-600">
            00K Enrolled Students
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
