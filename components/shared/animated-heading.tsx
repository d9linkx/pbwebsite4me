import React, { memo } from "react";
import { motion } from "framer-motion";
import AppConfig from "@/lib/config";

const AnimatedHeading = memo(({ children }: { children: React.ReactNode }) => (
  <span className="h2-animated-underline relative inline-block">
    {children}
    <motion.span
      className="absolute bottom-0 left-0 h-0.75 bg-linear-to-r from-primary to-[#f4470899] rounded-full"
      initial={{ width: "0%", opacity: 0 }}
      whileInView={{ width: "100%", opacity: 1 }}
      viewport={AppConfig.VIEWPORT_UNDERLINE}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    />
  </span>
));

AnimatedHeading.displayName = "AnimatedHeading";
export default AnimatedHeading;
