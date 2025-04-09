"use client";

import { motion } from "framer-motion";
import { Lightbulb, ClipboardCheck, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { JSX } from "react";

interface Step {
  icon: JSX.Element;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Choose a Course",
    description:
      "Browse through a variety of high-quality courses curated by industry experts."
  },
  {
    icon: <ClipboardCheck className="w-6 h-6 text-green-500" />,
    title: "Enroll & Start Learning",
    description:
      "Register with ease, enroll in a course, and start learning at your own pace."
  },
  {
    icon: <Rocket className="w-6 h-6 text-purple-500" />,
    title: "Achieve Your Goals",
    description:
      "Complete your learning journey, earn certificates, and grow professionally."
  }
];

const CreateInstruction = () => {
  return (
    <section className="bg-gradient-to-br from-muted to-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How to Get Started
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Follow these simple steps to begin your journey toward knowledge and
          success.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-3xl h-full border-none shadow-md hover:shadow-2xl transition-shadow bg-white dark:bg-gray-950 group relative overflow-hidden">
                <div className="absolute -inset-[1px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl z-[-1]" />

                <CardContent className="p-8 flex flex-col items-center text-center gap-5 relative z-10">
                  <div className="bg-gradient-to-br from-primary to-purple-500 p-4 rounded-full shadow-lg">
                    {step.icon}
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateInstruction;
