// lib/animations.ts
import { Variants } from "framer-motion";

// ============================================================================
// CONTAINER ANIMATIONS
// ============================================================================

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// ============================================================================
// BASIC ITEM ANIMATIONS
// ============================================================================

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// FORM ANIMATIONS
// ============================================================================

export const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

export const inputVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// SOCIAL SECTION ANIMATIONS
// ============================================================================

export const socialVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

export const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// PROJECTS SECTION ANIMATIONS
// ============================================================================

export const titleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
};

export const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export const underlineVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// EXPERIENCE TIMELINE ANIMATIONS
// ============================================================================

export const timelineVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const experienceIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
};

export const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// UTILITY FUNCTION
// ============================================================================

export const createAlternatingVariants = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

// ============================================================================
// COMPONENT-SPECIFIC ANIMATION SETS
// ============================================================================

export const contactAnimations = {
  container: containerVariants,
  form: formVariants,
  input: inputVariants,
  social: socialVariants,
  icon: iconVariants,
  title: itemVariants,
};

export const projectAnimations = {
  container: containerVariants,
  title: titleVariants,
  grid: gridVariants,
  card: cardVariants,
  underline: underlineVariants,
};

export const experienceAnimations = {
  container: containerVariants,
  timeline: timelineVariants,
  icon: experienceIconVariants,
  content: contentVariants,
  listItem: listItemVariants,
};