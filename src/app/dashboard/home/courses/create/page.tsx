/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

export default function CreateCourseForm() {
  const { user, loading } = useAuth(); // Get the user from AuthContext
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    price: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      toast.error("You must be logged in to create a course");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // Add Authorization token here
        },
        body: JSON.stringify({
          title: formData.title,
          thumbnail: formData.thumbnail,
          price: Number(formData.price),
          description: formData.description
        })
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        toast.success("Course created successfully");
        router.push("/dashboard/courses"); // Redirect after successful creation
      } else {
        toast.error(result.message || "Failed to create course");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course title"
              required
            />
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://image-url.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter course price"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course description"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            {isLoading ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
