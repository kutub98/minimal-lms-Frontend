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
import toast from "react-hot-toast";

// Loader component
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

  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingModules] = useState<boolean>(false);
  const [loadingLectures] = useState<boolean>(false);

  // Fetch courses
  useEffect(() => {
    setLoadingCourses(true);
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data: { data: Course[] }) => {
        setCourses(data.data);
        setLoadingCourses(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setLoadingCourses(false);
      });
  }, []);

  // Get selected course and module
  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId
  );
  const selectedModule = selectedCourse?.modules.find(
    (mod) => mod._id === selectedModuleId
  );

  // Handle video view
  const handleOpenVideo = (url: string) => {
    setSelectedVideoUrl(url);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedVideoUrl("");
  };

  // Handle edit lecture
  const handleOpenEdit = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    setEditTitle(lecture.title);
    setEditVideoUrl(lecture.videoUrl);
    setEditDialogOpen(true);
  };

  const handleUpdateLecture = async () => {
    if (!currentLecture) return;
    try {
      const res = await fetch(`/api/lectures/${currentLecture._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editTitle,
          videoUrl: editVideoUrl,
          moduleId: currentLecture.moduleId
        })
      });

      const result = await res.json();
      if (result.success) {
        toast.success("✅ Lecture updated successfully!");
        setEditDialogOpen(false);
        // Refresh data
        const refreshed = await fetch("/api/courses");
        const json = await refreshed.json();
        setCourses(json.data);
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating lecture:", error);
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
      {selectedCourse &&
        selectedCourse.modules &&
        selectedCourse.modules.length > 0 && (
          <div className="mb-6">
            <Label className="my-2 text-lg"> Select Module</Label>
            {loadingModules ? (
              <Loader />
            ) : (
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
            )}
          </div>
        )}

      {/* Lecture List */}
      {selectedModule && selectedModule.lectures && (
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
                    <Button variant="destructive">Delete</Button>
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
              <Label className="my-2 text-lg">Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <Label className="my-2 text-lg">Video URL</Label>
              <Input
                value={editVideoUrl}
                onChange={(e) => setEditVideoUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateLecture} className="w-full mt-4">
              Update Lecture
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
