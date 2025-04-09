/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Laptop, Star, Users, Video } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimateButton";
import CourseFeatures from "@/app/Components/CourseFeatures";
import ReviewSection from "@/app/Components/CourseReview";
import CreateInstruction from "@/app/Components/Instruction";
import InstructorSection from "@/app/Components/InstructionInfo";
// import LecturesPage from "../../lectures/[courseId]/page";

interface Module {
  _id: string;
  title: string;
  moduleNumber: number;
}

interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  modules: Module[];
}

const CourseDetails = () => {
  const router = useRouter();

  const { id } = useParams();
  const courseId = id as string;
  const handleFreeClassClick = () => {
    router.push(`/lectures/${courseId}`);
  };
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log("Fetching course:", courseId);

        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();

        console.log("API response:", data);

        setCourse(data?.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourseDetails();
  }, [courseId]);

  console.log(course, "show data");

  if (loading) {
    return (
      <div className="py-16 bg-indigo-50 shadow">
        <Container>
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4 mt-4" />
          <Skeleton className="h-10 w-full mt-4 rounded-full" />
        </Container>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-16 bg-indigo-50 shadow">
        <Container>
          <p className="text-center text-red-500">Course not found.</p>
        </Container>
      </div>
    );
  }

  // <LecturesPage courseId={courseId} />;

  return (
    <div className="py-16 bg-indigo-50 shadow">
      <Container className="space-y-8 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-4">
            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 w-auto flex items-center gap-2 rounded-full">
              <span className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500"></span>
              </span>
              লাইভ কোর্স
            </span>

            <h2 className="text-2xl font-bold">{course.title}</h2>
            <div className="flex items-center space-x-2 text-green-600">
              <Star className="w-4 h-4 fill-green-600" />
              <span className="font-medium">4.9</span>
              <span className="text-gray-600">(293 Ratings)</span>
            </div>
            <p className="text-gray-700 text-sm">
              ৮ কোর্সের অ্যাপ ডেভেলপমেন্ট প্যাকেজ যার ভিতরে থাকছে সব কিছু। ৪৫টি
              লাইভ ক্লাস এবং ১০০+ ঘন্টা এক্সক্লুসিভ ভিডিও এর মাধ্যমে শিখবেন নানা
              ধরনের রিয়েল লাইফ প্রজেক্ট তৈরির পাশাপাশি পাবেন: ই-কমার্স সাইট,
              টিকিটিং সিস্টেম, টু-ডু অ্যাপ ইত্যাদির এক্সপেরিয়েন্স।
            </p>
            <p className="text-gray-700 text-sm">
              এছাড়া রয়েছে DSA & Problem Solving এর আলাদা স্পেশাল সেগমেন্ট,
              যেখানে LeetCode, HackerRank এবং CodeMama থেকেও প্র্যাকটিস করা হবে।
              বিশেষভাবে শেখানো হবে কিভাবে AI এর যুগে নিজেকে প্রমাণ করতে হবে এবং
              তৈরি করতে হবে DSA & Problem Solving এর স্ট্রং বেস।
            </p>
            <div className="text-xl font-bold text-gray-800 md:flex flex-wrap  items-center gap-4 ">
              <AnimatedButton className=" px-3 w-auto h-auto  font-medium ">
                বাই এখনি নিন
              </AnimatedButton>
              ৳৮,৫০০{" "}
              <span className="text-sm text-gray-500 ml-2 font-normal">
                প্রোমো প্রাইস
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleFreeClassClick}
                variant="outline"
                className="relative group focus:outline-none focus:ring-2 focus:ring-[#560bad] focus:ring-offset-2 hover:bg-[#560bad] hover:text-white transition-all duration-300 transform active:scale-105"
              >
                <span className="absolute inset-0 bg-[#560bad] opacity-20 rounded-full animate-pulse group-hover:opacity-40"></span>
                <span className="relative z-10">বিনামূল্যে ক্লাস দেখুন</span>
              </Button>

              {/* <Button>ফ্রী ক্লাস দেখুন</Button> */}
            </div>
          </div>

          {/* Right Section */}
          <Card className="overflow-hidden">
            <CardContent className="relative p-0">
              <div className="relative w-full h-0 pb-[56.25%]">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute top-0 left-0 w-full bg-[#560bad] text-white text-sm px-4 py-1 font-medium">
                ক্লিক করে দেখুন দিন জোভারের ডেমো ক্লাস
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white rounded-full p-3 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Grid */}
        <div className="grid justify-center items-center grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm bg-gray-50 p-4 rounded-xl shadow-sm">
          <div className="space-y-1 border-r-[2px] flex flex-col justify-center items-center">
            <div className="font-medium flex flex-row justify-center gap-1">
              <Calendar className="mx-auto text-[#560bad]" />
              <span>ব্যাচ শুরু</span>
            </div>
            <div className="text-gray-600">রবিবার ১১ মে</div>
          </div>
          <div className="space-y-1 border-r-[2px] flex flex-col justify-center items-center">
            <div className="font-medium flex flex-row items-center gap-1">
              <Clock className="mx-auto text-[#560bad]" />
              <span>লাইভ ক্লাস</span>
            </div>
            <div className="text-gray-600 flex flex-col">
              <span>৮:৩০ - ১০:৩০</span>
              <span>(শনি থেকে বৃহঃ)</span>
            </div>
          </div>
          <div className="space-y-1 border-r-[2px] flex flex-col justify-center items-center">
            <div className="font-medium flex flex-row items-center gap-1">
              <Video className="mx-auto text-[#560bad]" />
              <span>ভিডিও ক্লাস</span>
            </div>
            <div className="text-gray-600 flex flex-col">
              <span>৮:৩০ - ১০:৩০</span>
              <span>(শনি থেকে বৃহঃ)</span>
            </div>
          </div>

          <div className="space-y-1 border-r-[2px] flex flex-col justify-center items-center">
            <div className="font-medium flex flex-row justify-center gap-1">
              <Laptop className="mx-auto text-[#560bad]" />
              <span>ক্লাস থাকবে</span>
            </div>
            <div className="text-gray-600">৬৪ টি</div>
          </div>
          <div className="space-y-1 flex flex-col justify-center items-center">
            <div className="font-medium flex flex-row justify-center gap-1">
              <Users className="mx-auto text-[#560bad]" />
              <span>ব্যাচ চলেছে</span>
            </div>
            <div className="text-gray-600">১১৯টি ব্যাচ</div>
          </div>
        </div>
      </Container>

      <CourseFeatures />
      <ReviewSection />
      <CreateInstruction />
      <InstructorSection />
    </div>
  );
};

export default CourseDetails;
