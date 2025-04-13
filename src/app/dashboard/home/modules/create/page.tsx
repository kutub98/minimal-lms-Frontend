/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

interface Course {
  _id: string;
  title: string;
}

const CreateModuleForm = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    moduleNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch courses with proper error handling
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `https://minimal-lms-backend.vercel.app/api/v1/courses`
        );
        const data = await res.json();

        // Check and log data for debugging
        console.log("Fetched courses:", data);

        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.courseId || !formData.title || !formData.moduleNumber) {
      toast.error("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          courseId: formData.courseId,
          title: formData.title,
          moduleNumber: Number(formData.moduleNumber)
        })
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Module created successfully");
        router.push("/dashboard/home/modules");
      } else {
        toast.error(result.message || "Failed to create module");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10">
      <Card className="p-8 backdrop-blur-lg bg-white/60 border border-gray-200 shadow-xl rounded-3xl transition-all duration-300">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-neutral-800 mb-8">
          Create a ✨ New Module
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Dropdown */}
          <div className="space-y-1">
            <Label
              htmlFor="courseId"
              className="text-base font-medium text-gray-700"
            >
              Course
            </Label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Module Title */}
          <div className="space-y-1">
            <Label
              htmlFor="title"
              className="text-base font-medium text-gray-700"
            >
              Module Title
            </Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction"
              required
              className="rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-sm focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Module Number */}
          <div className="space-y-1">
            <Label
              htmlFor="moduleNumber"
              className="text-base font-medium text-gray-700"
            >
              Module Number
            </Label>
            <Input
              name="moduleNumber"
              type="number"
              value={formData.moduleNumber}
              onChange={handleChange}
              placeholder="e.g. 1"
              required
              className="rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-sm focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300"
          >
            {isLoading ? "Creating..." : "🚀 Create Module"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateModuleForm;
