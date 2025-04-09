"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";

const features = [
  {
    icon: "📅",
    title: "৬ মাসের অ্যাক্সেস",
    description: "ওয়েবসাইট, ভিডিওর ফাইল এবং ডাউনলোড ম্যাটেরিয়াল অ্যাক্সেস।"
  },
  {
    icon: "🔴",
    title: "৮৫+ লাইভ ক্লাস",
    description: "ইন্সট্রাক্টর এর সাথে লাইভে ক্লাসে শিখুন হাতে-কলমে।"
  },
  {
    icon: "📁",
    title: "২ টি রিয়েল প্রজেক্ট",
    description:
      "ইন্ডাস্ট্রি স্ট্যান্ডার্ড রিয়েল লাইফ প্রজেক্ট বিল্ড করে প্র্যাকটিস।"
  },
  {
    icon: "📌",
    title: "১৬টি প্র্যাকটিস চ্যালেঞ্জ",
    description:
      "যা শিখছেন তা প্র্যাকটিস করার জন্য রেগুলার চ্যালেঞ্জ, লাইভে সমাধান।"
  },
  {
    icon: "🎥",
    title: "৩০০+ প্রিমিয়াম ভিডিও",
    description: "আসাইনমেন্ট, কনসেপ্ট ও প্রজেক্টের ভিডিও রেকর্ডিং।"
  },
  {
    icon: "📊",
    title: "প্রোগ্রেস ট্র্যাকিং",
    description: "লিডারবোর্ড এবং নিজেই নিজের অগ্রগতি ট্র্যাক করুন।"
  },
  {
    icon: "⏰",
    title: "দিনে ২৪ ঘন্টা সাপোর্ট",
    description: "যেকোনো সমস্যায় প্রম্পট সাপোর্ট পেতে পারবেন সাপোর্ট সিস্টেমে।"
  },
  {
    icon: "🤝",
    title: "কমিউনিটি সাপোর্ট",
    description: "থাকছে কমিউনিটির মাধ্যমে শেখা এবং সাহায্যের সুযোগ।"
  },
  {
    icon: "⌛",
    title: "লাইফটাইম এক্সেস",
    description: "প্রজেক্টের রিসোর্স, ভিডিও এবং ক্লাস রেকর্ডিং এক্সেস থাকবে।"
  }
];

const CourseFeatures = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
      <Container className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-primary mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          কোর্সে আপনি পাচ্ছেন
        </motion.h2>
        <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative p-6 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 flex items-center justify-center text-2xl rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 text-white shadow-lg mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 z-[-1] rounded-3xl bg-yellow-100 dark:bg-yellow-900 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CourseFeatures;
