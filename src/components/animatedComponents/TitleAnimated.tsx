"use client";
import { motion } from "motion/react";
import { fadeUp } from "@/components/animatedComponents/variants";

type Props = {
  children: React.ReactNode;
};

export default function TitleAnimated({ children }: Props) {
  return (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      className="text-3xl font-bold text-sky-600 max-sm:text-2xl"
    >
      {children}
    </motion.h1>
  );
}
