/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  _id: string;
  title: string;
}

interface Module {
  _id: string;
  title: string;
  moduleNumber: number;
  courseId: string; // assuming this exists to relate module to course
}

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  moduleId: string;
}

const LecturesSection = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [lecturesRes, modulesRes, coursesRes] = await Promise.all([
        fetch("/api/lectures"),
        fetch("/api/modules"),
        fetch("/api/courses")
      ]);

      if (!lecturesRes.ok || !modulesRes.ok || !coursesRes.ok) {
        throw new Error("One or more requests failed");
      }

      const [lecturesData, modulesData, coursesData] = await Promise.all([
        lecturesRes.json(),
        modulesRes.json(),
        coursesRes.json()
      ]);

      setLectures(lecturesData.data || []);
      setModules(modulesData.data || []);
      setCourses(coursesData.data || []);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (lectureId: string) => {
    toast("Edit functionality triggered for: " + lectureId);
    // Implement edit modal or route
  };

  const handleDelete = async (lectureId: string) => {
    const confirmed = confirm("Are you sure you want to delete this lecture?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/lectures/${lectureId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Lecture deleted");
      setLectures((prev) => prev.filter((lec) => lec._id !== lectureId));
    } catch {
      toast.error("Delete failed");
    }
  };

  const renderLectures = () => {
    return courses.map((course) => {
      const courseModules = modules.filter((m) => m.courseId === course._id);

      return (
        <div key={course._id} className="p-4 border-b">
          <h3 className="text-2xl font-bold text-indigo-600 mb-3">
            {course.title}
          </h3>

          {courseModules.length === 0 ? (
            <p className="text-gray-500 ml-4">No modules in this course.</p>
          ) : (
            courseModules.map((module) => {
              const moduleLectures = lectures.filter(
                (lec) => lec.moduleId === module._id
              );

              return (
                <div key={module._id} className="ml-4 mb-4">
                  <h4 className="text-xl font-semibold text-gray-700">
                    Module {module.moduleNumber}: {module.title}
                  </h4>

                  {moduleLectures.length === 0 ? (
                    <p className="text-gray-400 ml-4">
                      No lectures in this module.
                    </p>
                  ) : (
                    <ul className="ml-6 mt-2 space-y-2">
                      {moduleLectures.map((lecture) => (
                        <li
                          key={lecture._id}
                          className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                        >
                          <span>{lecture.title}</span>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(lecture._id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(lecture._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <Container className="py-4">
        <Toaster position="top-right" />
        <h2 className="text-4xl font-extrabold text-start text-gray-700 mb-8">
          Manage Lectures
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-xl bg-white">
          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : lectures.length === 0 ? (
            <p className="text-center p-6 text-gray-500">
              No Lectures available.
            </p>
          ) : (
            <div className="p-6">{renderLectures()}</div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LecturesSection;
