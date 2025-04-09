"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface Review {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  content: string;
}

const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    title: "Software Engineer at Google",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    content:
      "This platform completely transformed how I learn. The UI is clean, fast, and incredibly intuitive. Highly recommended!"
  },
  {
    name: "Alex Kim",
    title: "UI/UX Designer at Airbnb",
    avatar: "/avatars/alex.jpg",
    rating: 4,
    content:
      "I love the design of this LMS. It’s user-friendly and responsive on all my devices. Would love to see more interactive content!"
  },
  {
    name: "John Doe",
    title: "Product Manager at Meta",
    avatar: "/avatars/john.jpg",
    rating: 5,
    content:
      "One of the best learning platforms I’ve used so far. The course structure is very professional and easy to follow."
  }
];

const ReviewSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-black to-indigo-900 text-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-pink-500 mb-4">
          What Our Learners Say
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          Real stories. Real success. Hear directly from professionals who
          upgraded their skills with us.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Tilt
                glareEnable
                glareMaxOpacity={0.1}
                scale={1.02}
                transitionSpeed={800}
              >
                <Card className="bg-white/10 border border-white/10 backdrop-blur-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition duration-500 rounded-2xl h-full">
                  <CardContent className="p-6 flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-white">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-400">{review.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                        />
                      ))}
                    </div>

                    <blockquote className="text-gray-300 leading-relaxed italic">
                      “{review.content}”
                    </blockquote>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
