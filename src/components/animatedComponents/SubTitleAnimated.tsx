"use client";

import { motion } from "motion/react";
import { blurIn } from "@/components/animatedComponents/variants";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SubTitleAnimated({ children, className = "" }: Props) {
  return (
    <motion.p
      className={`text-foreground-muted mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${className}`.trim()}
      variants={blurIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  );
}
