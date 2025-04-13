/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data?.data) setCourses(data.data);
    } catch (error: unknown) {
      toast.error("Failed to fetch courses.");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    const interval = setInterval(fetchCourses, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsEditing(true);
  };

  const handleSubmitEdit = async () => {
    if (!editingCourse) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/courses/${editingCourse._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token || ""
        },
        body: JSON.stringify({
          title: editingCourse.title,
          price: editingCourse.price,
          description: editingCourse.description,
          thumbnail: editingCourse.thumbnail
        })
      });

      if (!res.ok) throw new Error("Failed to update course");
      toast.success("Course updated successfully!");
      fetchCourses();
      setIsEditing(false);
      setEditingCourse(null);
    } catch (error) {
      toast.error("Update failed.");
      console.error(error);
    }
  };

  const handleDelete = async (courseId: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token || ""
        }
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to delete course");
      }

      toast.success("Course deleted Successfully!");
      fetchCourses();
    } catch (error: any) {
      toast.error(`Error deleting course: ${error.message}`);
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="py-10 shadow-lg bg-gray-50">
      <Container className="py-4">
        <Toaster position="top-right" />
        <h2 className="text-4xl font-extrabold text-start text-gray-700 mb-8">
          Manage Courses
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-xl bg-white">
          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <p className="text-center p-6 text-gray-500">
              No courses available.
            </p>
          ) : (
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-purple-700 text-white uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Thumbnail</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Modules</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-14 w-24 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold">{course.title}</td>
                    <td className="px-6 py-4 font-medium">
                      ${course.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{course.modules.length}</td>
                    <td className="px-6 py-4 space-x-2 flex flex-wrap items-center">
                      <button
                        onClick={() => handleEdit(course)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      {/* <button
                        onClick={() => handleSubmitEdit()}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                        title="Update"
                      >
                        <FaSync />
                      </button> */}
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <Link
                        href={`/courses/${course._id}`}
                        className="text-sm font-medium text-purple-700 underline hover:text-purple-900"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Container>

      {isEditing && editingCourse && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, title: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={editingCourse.price}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    price: parseFloat(e.target.value)
                  })
                }
              />
              <Input
                placeholder="Thumbnail URL"
                value={editingCourse.thumbnail}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    thumbnail: e.target.value
                  })
                }
              />
              <Textarea
                placeholder="Description"
                value={editingCourse.description}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    description: e.target.value
                  })
                }
              />
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingCourse(null);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSubmitEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CourseSection;
