"use client";
import { motion } from "motion/react";
import { blurIn } from "@/components/animatedComponents/variants";

type Props = {
  children: React.ReactNode;
};

export default function TitleAnimated({ children }: Props) {
  return (
    <motion.div variants={blurIn} initial="hidden" whileInView={"visible"}>
      {children}
    </motion.div>
  );
}
