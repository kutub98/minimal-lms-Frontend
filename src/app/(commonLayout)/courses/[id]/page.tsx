/* eslint-disable @next/next/no-img-element */
"use client";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/ui/Container";
import AnimatedButton from "@/components/ui/AnimateButton";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Get the dynamic course ID from the URL

  const fetchCourseDetails = async (courseId: string) => {
    try {
      const res = await fetch(
        `https://minimal-lms-backend.vercel.app/api/v1/courses/${courseId}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data?.data) {
        setCourse(data.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching course details:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id as string); // Fetch course details when ID is available
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 shadow">
        <Container className="py-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4 mt-4" />
          <Skeleton className="h-10 w-full mt-4 rounded-full" />
        </Container>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 shadow">
        <Container className="py-4">
          <p className="text-lg text-center text-red-500">
            Course not found. Please check the course ID.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 shadow">
      <Container className="py-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full h-0 pb-[56.25%]">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="object-cover absolute top-0 left-0 w-full h-full rounded-xl"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {course.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-gray-700 mb-4">
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                <FaUsers className="text-indigo-500" /> 100 Students
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                <FaClock className="text-indigo-500" /> 90 Classes
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                <FaCalendarAlt className="text-indigo-500" /> 3 months
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Course Modules
              </h3>
              <ul>
                {course.modules.map((module) => (
                  <li key={module._id} className="text-sm text-gray-600 mb-2">
                    {module.moduleNumber}. {module.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-8">
              <AnimatedButton className="w-full rounded-full bg-[#560bad] hover:bg-[#480ca8] cursor-pointer !text-white">
                Enroll Now →
              </AnimatedButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetails;
