"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted/40 to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl p-6 rounded-2xl w-[90vw] max-w-sm text-center">
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <motion.p
              className="text-lg font-semibold text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading, please wait...
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Loading;
