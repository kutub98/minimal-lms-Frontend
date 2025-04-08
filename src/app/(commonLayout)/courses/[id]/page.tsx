"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";

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
  const { id } = useParams();
  const courseId = id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log("Fetching course:", courseId);

        const res = await fetch(`/api/courses/${courseId}`); // ✅ Fixed path
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

  return (
    <div className="py-16 bg-indigo-50 shadow">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full h-0 pb-[56.25%]">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
            <div className="flex gap-2 text-xs text-gray-700 mb-4 flex-wrap">
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
              <h3 className="text-lg font-semibold mb-2">Course Modules</h3>
              <ul>
                {course.modules.map((module) => (
                  <li key={module._id} className="text-sm text-gray-600 mb-2">
                    {module.moduleNumber}. {module.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <AnimatedButton className="w-full rounded-full bg-[#560bad] hover:bg-[#480ca8] text-white">
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
