import { MotionProps } from "framer-motion";

export const mainAnimationProps: MotionProps = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const buttonHoverProps: MotionProps = {
  whileHover: {
    scale: 1.05,
    backgroundImage: "linear-gradient(to right, #FFC671, #FFD390)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
};

export const buttonAnimationProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
};

export const headerAnimationProps: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};