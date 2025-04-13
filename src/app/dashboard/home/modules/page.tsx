/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Course {
  _id: string;
  title: string;
}

interface Module {
  _id: string;
  title: string;
  moduleNumber: number;
}

const ModulesSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [formData, setFormData] = useState({ title: "", moduleNumber: "" });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data?.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourseId) return setModules([]);

    const fetchModules = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/modules?courseId=${selectedCourseId}`);
        const data = await res.json();
        setModules(data?.data || []);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [selectedCourseId]);

  const handleDeleteModule = async (moduleId: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/modules/${moduleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || ""
        }
      });

      if (!res.ok) throw new Error("Failed to delete module");

      setModules((prev) => prev.filter((m) => m._id !== moduleId));
      toast.success("Module deleted successfully");
    } catch (error) {
      toast.error("Failed to delete module");
    }
  };

  const handleEditClick = (module: Module) => {
    setEditingModule(module);
    setFormData({
      title: module.title,
      moduleNumber: module.moduleNumber.toString()
    });
  };

  const handleUpdateModule = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/modules/${editingModule?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || ""
        },
        body: JSON.stringify({
          title: formData.title,
          moduleNumber: parseInt(formData.moduleNumber)
        })
      });

      const updatedModule = await res.json();
      setModules((prev) =>
        prev.map((mod) =>
          mod._id === editingModule?._id ? updatedModule.data : mod
        )
      );

      setEditingModule(null);
      setFormData({ title: "", moduleNumber: "" });
      toast.success("Module updated successfully");
    } catch (error) {
      toast.error("Failed to update module");
    }
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-neutral-800 tracking-tight">
        🎓 Manage Course Modules
      </h2>
      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="mb-6 w-full max-w-md px-4 py-2 text-base border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">-- Select a course --</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
      {loading ? (
        <div className="flex items-center gap-2 text-blue-500">
          <Loader2 className="animate-spin" />
          Loading modules...
        </div>
      ) : modules.length === 0 ? (
        <p className="text-gray-500">No modules found for this course.</p>
      ) : (
        <ul className="space-y-4">
          {modules.map((module) => (
            <li
              key={module._id}
              className="flex justify-between items-center p-5 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-gray-200 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Module {module.moduleNumber}: {module.title}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(module)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteModule(module._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingModule && (
        <Dialog
          open={!!editingModule}
          onOpenChange={() => {
            setEditingModule(null);
            setFormData({ title: "", moduleNumber: "" });
          }}
        >
          <DialogContent className="max-w-xl">
            <form onSubmit={handleUpdateModule}>
              <DialogHeader>
                <DialogTitle>Edit Module</DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Module Title
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Module Number
                  </label>
                  <Input
                    type="number"
                    value={formData.moduleNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, moduleNumber: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <DialogFooter className="mt-6 flex justify-end gap-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingModule(null);
                      setFormData({ title: "", moduleNumber: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Update Module
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ModulesSection;
