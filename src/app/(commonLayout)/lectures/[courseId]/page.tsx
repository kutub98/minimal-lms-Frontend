"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const LecturesPage = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();
        setLectures(data?.data); // assuming data structure
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    if (courseId) {
      fetchLectures();
    }
  }, [courseId]);

  if (!lectures) return <div>Loading lectures...</div>;

  return (
    <div className="p-4">
      <h1>Hello</h1>
      {/* <h1 className="text-2xl font-bold">Lectures for: {lectures}</h1> */}
      {/* You can map and display modules or lectures here */}
      {/* <ul className="list-disc list-inside mt-4">
        {lectures.modules?.map((module) => (
          <li key={module._id}>{module.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default LecturesPage;
