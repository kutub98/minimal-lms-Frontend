/* eslint-disable @next/next/no-img-element */
"use client";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import AnimatedButton from "@/components/ui/AnimateButton";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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

const CourseSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // const fetchCourses = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://minimal-lms-backend.vercel.app/api/v1/courses"
  //     );

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }

  //     const data = await res.json();
  //     if (data?.data) {
  //       setCourses(data.data);
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error("Error fetching courses:", error.message);
  //     } else {
  //       console.error("Unknown error:", error);
  //     }
  //     setLoading(false); // Stop loading state if there's an error
  //   } finally {
  //     setLoading(false); // Ensure loading is set to false when the fetch ends
  //   }
  // };

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data?.data) {
        setCourses(data.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching courses:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();

    const interval = setInterval(() => {
      fetchCourses();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-1 bg-[#dad2ff38] shadow">
      <Container className="py-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Courses <span className="text-yellow-500">💻</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-4 space-y-3"
                >
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mt-2" />
                  <Skeleton className="h-10 w-full mt-4 rounded-full" />
                </div>
              ))
            : courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col gap-1"
                >
                  <div className="relative w-full h-0 pb-[56.25%]">
                    {" "}
                    {/* This sets a 16:9 aspect ratio */}
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="object-cover absolute top-0 left-0 w-full h-full rounded-xl"
                    />
                  </div>

                  <div className="px-4 py-3 flex flex-col flex-grow">
                    <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-gray-700 mb-2">
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

                    <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {course.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <Link href={`/courses/${course._id}`} className="w-full">
                        <AnimatedButton className="w-full rounded-full bg-[#560bad] hover:bg-[#480ca8] cursor-pointer !text-white">
                          View Details →
                        </AnimatedButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </Container>
    </div>
  );
};

export default CourseSection;

// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// function Profile() {
//   const { data, error } = useSWR("/api/profile-data", fetcher);

//   if (error) return <div>Failed to load</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.bio}</p>
//     </div>
//   );
// }
