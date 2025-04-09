/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-assign-module-variable */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

interface Pdf {
  _id: string;
  name: string;
  url: string;
}

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  pdfs: Pdf[];
}

interface Module {
  _id: string;
  title: string;
  moduleNumber: number;
  lectures: Lecture[];
}

interface Course {
  title: string;
  modules: Module[];
}

const getEmbedUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") || "";
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch (err) {
    console.error("Invalid YouTube URL", url);
    return "";
  }
};

// ✅ Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="p-6 space-y-6 animate-pulse text-white max-w-7xl mx-auto">
    <div className="h-6 w-1/3 bg-gray-700 rounded"></div>
    <div className="aspect-video bg-gray-800 rounded-xl"></div>
    <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
    <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
  </div>
);

const LecturesPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        // Optional: simulate loading delay
        // await new Promise((res) => setTimeout(res, 1000));

        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();
        setCourse(data?.data);
        const firstLecture = data?.data?.modules?.[0]?.lectures?.[0];
        if (firstLecture) setSelectedLecture(firstLecture);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    if (courseId) fetchLectures();
  }, [courseId]);

  const getLectureIndex = () => {
    if (!course || !selectedLecture) return null;
    let index = 0;
    for (const module of course.modules) {
      for (const lecture of module.lectures) {
        if (lecture._id === selectedLecture._id) return index;
        index++;
      }
    }
    return null;
  };

  const getLectureByIndex = (index: number) => {
    if (!course) return null;
    const flatLectures = course.modules.flatMap((mod) => mod.lectures);
    return flatLectures[index] || null;
  };

  const handleNext = () => {
    const currentIndex = getLectureIndex();
    if (currentIndex === null) return;

    setCompletedLectures((prev) => [
      ...new Set([...prev, selectedLecture!._id])
    ]);
    const nextLecture = getLectureByIndex(currentIndex + 1);
    if (nextLecture) setSelectedLecture(nextLecture);
  };

  const handlePrevious = () => {
    const currentIndex = getLectureIndex();
    if (currentIndex === null) return;

    const prevLecture = getLectureByIndex(currentIndex - 1);
    if (prevLecture) setSelectedLecture(prevLecture);
  };

  const isLectureCompleted = (id: string) => completedLectures.includes(id);

  if (!course) {
    return <SkeletonLoader />;
  }

  const modulesWithLectures = course.modules?.filter(
    (mod) => mod.lectures.length > 0
  );

  if (!modulesWithLectures || modulesWithLectures.length === 0) {
    return (
      <div className="text-white p-6 text-center w-full h-screen flex flex-col justify-center items-center">
        <p className="text-lg font-semibold text-purple-500 animate-bounce">
          📚 No modules or lectures available at the moment.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Please check back later as we&lsquo;re updating the course content.
        </p>
      </div>
    );
  }

  const totalLectures = course.modules.reduce(
    (acc, m) => acc + m.lectures.length,
    0
  );
  const progressPercent = (completedLectures.length / totalLectures) * 100;

  const moduleInfo = (() => {
    for (const [i, mod] of course.modules.entries()) {
      if (mod.lectures.some((lec) => lec._id === selectedLecture?._id)) {
        return { moduleIndex: i + 1, moduleTitle: mod.title };
      }
    }
    return null;
  })();

  return (
    <div className="bg-[#0e0b1f] min-h-screen py-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-6 text-white">
        {/* Header */}
        <div className="border-b border-fuchsia-900 pb-4">
          {moduleInfo && (
            <h2 className="text-xl sm:text-2xl font-bold text-purple-300">
              Module {moduleInfo.moduleIndex}: {moduleInfo.moduleTitle}
            </h2>
          )}
          <p className="text-lg mt-1 font-semibold">{selectedLecture?.title}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-md">
              {selectedLecture?.videoUrl ? (
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(selectedLecture.videoUrl)}
                  title="Lecture Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No video available
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={getLectureIndex() === 0}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  getLectureIndex() === 0
                    ? "bg-gray-700 opacity-50 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
              >
                Next
              </button>
            </div>

            {/* PDFs */}
            {selectedLecture &&
              selectedLecture.pdfs &&
              selectedLecture.pdfs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Lecture PDFs:</h4>
                  {selectedLecture.pdfs.map((pdf) => (
                    <a
                      key={pdf._id}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline block hover:text-purple-400 transition"
                    >
                      📄 {pdf.name || "View PDF"}
                    </a>
                  ))}
                </div>
              )}
          </div>

          {/* Sidebar */}
          <div className="bg-[#1a1433] rounded-lg p-4 pt-0 md:pt-0 md:p-6 space-y-6 border border-purple-900 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-3 sticky top-0 bg-[#1a1433] z-10 p-2">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-purple-300 whitespace-nowrap">
                  Module: {moduleInfo?.moduleIndex}
                </p>
                <div className="flex-1">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 bg-green-400 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <input
                placeholder="Search Lesson"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#2a2150] text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module._id}>
                  <h4 className="font-semibold text-purple-300 text-sm md:text-base uppercase tracking-wide mb-2">
                    {module.title}
                  </h4>
                  <div className="space-y-2">
                    {module.lectures
                      .filter((lec) =>
                        lec.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((lecture) => (
                        <div
                          key={lecture._id}
                          onClick={() => setSelectedLecture(lecture)}
                          className={`p-3 flex items-center gap-2 rounded-lg cursor-pointer transition-all ${
                            selectedLecture?._id === lecture._id
                              ? "bg-purple-700"
                              : "bg-[#251d47] hover:bg-[#322665]"
                          }`}
                        >
                          {isLectureCompleted(lecture._id) ? (
                            <span className="text-green-400">✔</span>
                          ) : (
                            <Lock size={16} className="text-gray-400" />
                          )}
                          <span className="text-sm">{lecture.title}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hide scrollbars */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
          }
          .custom-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LecturesPage;
