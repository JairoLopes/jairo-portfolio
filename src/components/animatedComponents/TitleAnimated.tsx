"use client";
import { motion } from "motion/react";
import { fadeUp } from "@/components/animatedComponents/variants";

type Props = {
  children: React.ReactNode;
};

export default function TitleAnimated({ children }: Props) {
  const estiloTitle = "text-3xl font-bold text-sky-600";

  return (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      whileInView={"visible"}
      className={estiloTitle}
    >
      {children}
    </motion.h1>
  );
}
