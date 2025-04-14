"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactPlayer from "react-player";
import { toast } from "react-hot-toast";

const Loader = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    <span className="text-gray-500">Loading...</span>
  </div>
);

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  moduleId: string;
  pdfs?: string[];
}

interface Module {
  _id: string;
  title: string;
  lectures: Lecture[];
}

interface Course {
  _id: string;
  title: string;
  modules: Module[];
}

export default function LecturesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editVideoUrl, setEditVideoUrl] = useState<string>("");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newLectureTitle, setNewLectureTitle] = useState<string>("");
  const [newLectureVideoUrl, setNewLectureVideoUrl] = useState<string>("");

  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingLectures] = useState<boolean>(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoadingCourses(false);
    }
  };

  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId
  );
  const selectedModule = selectedCourse?.modules?.find(
    (mod) => mod._id === selectedModuleId
  );

  const handleOpenVideo = (url: string) => {
    setSelectedVideoUrl(url);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedVideoUrl("");
  };

  const handleOpenEdit = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    setEditTitle(lecture.title);
    setEditVideoUrl(lecture.videoUrl);
    setEditDialogOpen(true);
  };

  const handleUpdateLecture = async () => {
    if (!currentLecture) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/lectures/${currentLecture._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || ""
        },
        body: JSON.stringify({
          title: editTitle,
          videoUrl: editVideoUrl,
          moduleId: currentLecture.moduleId
        })
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Lecture updated successfully!");
        setEditDialogOpen(false);
        await fetchCourses();
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (error) {
      console.error("Error updating lecture:", error);
    }
  };

  // Optimistic update on deletion: update state immediately and then re-sync with backend.
  const handleDeleteLecture = async (lectureId: string) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/lectures/${lectureId}`, {
        method: "DELETE",
        headers: {
          Authorization: token || ""
        }
      });

      if (!res.ok) throw new Error("Failed to delete lecture");
      const result = await res.json();

      if (result.ok || result.success) {
        // Immediately update state locally.
        setCourses((prevCourses) =>
          prevCourses.map((course) => {
            if (course._id === selectedCourseId) {
              return {
                ...course,
                modules: course.modules.map((module) => {
                  if (module._id === selectedModuleId) {
                    return {
                      ...module,
                      lectures: module.lectures.filter(
                        (lecture) => lecture._id !== lectureId
                      )
                    };
                  }
                  return module;
                })
              };
            }
            return course;
          })
        );
        toast.success("Lecture deleted successfully!");
        setEditDialogOpen(false);
        // Optionally re-sync with backend:
        fetchCourses();
      } else {
        toast.error("Failed to delete lecture");
      }
    } catch (error) {
      console.error("Error deleting lecture:", error);
      toast.error("Something went wrong");
    }
  };

  const handleCreateLecture = async () => {
    if (!selectedModuleId || !newLectureTitle || !newLectureVideoUrl) {
      toast.error("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        title: newLectureTitle,
        videoUrl: newLectureVideoUrl,
        moduleId: selectedModuleId
      };

      const res = await fetch(`/api/lectures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || ""
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Lecture created successfully!");
        setCreateDialogOpen(false);
        setNewLectureTitle("");
        setNewLectureVideoUrl("");
        await fetchCourses();
      } else {
        toast.error(result.message || "Failed to create lecture");
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
      toast.error("An error occurred while creating lecture");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📚 Lecture Explorer
      </h1>

      {/* Course Dropdown */}
      <div className="mb-4">
        <Label className="my-2 text-lg">Select Course</Label>
        {loadingCourses ? (
          <Loader />
        ) : (
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setSelectedModuleId("");
            }}
            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none"
          >
            <option value="">-- Choose a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Module Dropdown */}
      {selectedCourse?.modules?.length ? (
        <div className="mb-6">
          <Label className="my-2 text-lg">Select Module</Label>
          <select
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none"
          >
            <option value="">-- Choose a Module --</option>
            {selectedCourse.modules.map((mod) => (
              <option key={mod._id} value={mod._id}>
                {mod.title}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {/* Lecture List */}
      {selectedModule && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Lectures</h2>
          {loadingLectures ? (
            <Loader />
          ) : selectedModule.lectures.length > 0 ? (
            <ScrollArea className="space-y-4 max-h-[400px] pr-2">
              {selectedModule.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="border p-4 rounded-lg shadow-sm bg-white flex items-center justify-between hover:shadow-md transition"
                >
                  <div>
                    <h3 className="text-lg font-medium">{lecture.title}</h3>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => handleOpenVideo(lecture.videoUrl)}>
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleOpenEdit(lecture)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteLecture(lecture._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p className="text-gray-500">No lectures found in this module.</p>
          )}
        </div>
      )}

      {/* Video Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Now Playing</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideoUrl && (
              <ReactPlayer
                url={selectedVideoUrl}
                controls
                width="100%"
                height="100%"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Lecture Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Lecture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm">Lecture Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm">Video URL</Label>
              <Input
                value={editVideoUrl}
                onChange={(e) => setEditVideoUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleUpdateLecture}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create New Lecture Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Lecture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm">Lecture Title</Label>
              <Input
                value={newLectureTitle}
                onChange={(e) => setNewLectureTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm">Video URL</Label>
              <Input
                value={newLectureVideoUrl}
                onChange={(e) => setNewLectureVideoUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleCreateLecture}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
