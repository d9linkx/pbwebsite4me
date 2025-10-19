/**
 * Shared animation variants and configurations for website pages
 * Ensures consistent, smooth scroll animations across all pages
 * All animations use viewport={{ once: false }} to retrigger on scroll up/down
 */

// 🎯 Smooth fade-in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom ease for smoothness
  }
};

// 🎯 Smooth fade-in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 🎯 Smooth fade-in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 🎯 Smooth scale-in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } // Bouncy ease
  }
};

// 🎯 Smooth fade-in (no movement)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// 🎯 Stagger container for child animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// 🎯 Stagger container (faster)
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

// 🎯 Card lift hover effect
export const cardHover = {
  scale: 1.05,
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" }
};

// 🎯 Button hover effect
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" }
};

// 🎯 Button tap effect
export const buttonTap = {
  scale: 0.95
};

// 🎯 Slide in from top
export const slideInFromTop = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 🎯 Slide in from bottom
export const slideInFromBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 🎯 Rotate scale in (for icons)
export const rotateScaleIn = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
  }
};

// 🎯 Blur in effect
export const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Default viewport configuration for scroll animations
 * once: false = animations retrigger on scroll up/down
 * margin: controls when animation triggers (negative = earlier, positive = later)
 */
export const defaultViewport = {
  once: false, // ⚡ KEY: Allows animations to retrigger
  margin: "-100px" // Trigger when element is 100px into viewport
};

/**
 * Viewport with earlier trigger
 */
export const earlyViewport = {
  once: false,
  margin: "-50px"
};

/**
 * Viewport with later trigger
 */
export const lateViewport = {
  once: false,
  margin: "-150px"
};

/**
 * Underline animation for H2 headings
 */
export const h2UnderlineAnimation = {
  initial: { width: "0%", opacity: 0 },
  whileInView: { width: "100%", opacity: 1 },
  viewport: { once: false, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
};
