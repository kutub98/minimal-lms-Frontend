"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactPlayer from "react-player";

// --- Types ---
interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId
  );
  const selectedModule = selectedCourse?.modules.find(
    (mod) => mod._id === selectedModuleId
  );

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
  }, []);

  const handleOpenVideo = (url: string) => {
    setSelectedVideoUrl(url);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedVideoUrl("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📚 Lecture Explorer
      </h1>

      {/* Course Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          🎓 Select Course
        </label>
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
      </div>

      {/* Module Dropdown */}
      {selectedCourse ? (
        selectedCourse.modules.length > 0 ? (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Select Module
            </label>
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
        ) : (
          <p className="text-gray-500 mb-6">
            ⚠️ No modules available in this course.
          </p>
        )
      ) : null}

      {/* Lectures List */}
      {selectedModuleId && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Lectures</h2>

          {selectedModule && selectedModule.lectures.length > 0 ? (
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
                    <Button
                      variant="default"
                      onClick={() => handleOpenVideo(lecture.videoUrl)}
                    >
                      View
                    </Button>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p className="text-gray-500">
              ⚠️ No lectures available in this module.
            </p>
          )}
        </div>
      )}

      {/* Video Player Modal */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>🎬 Now Playing</DialogTitle>
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
    </div>
  );
}
