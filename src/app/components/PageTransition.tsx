"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // const variants = {
  //   out: {
  //     opacity: 0,
  //     // y: 20,
  //     transition: {
  //       duration: 0.75
  //     }
  //   },
  //   in: {
  //     opacity: 1,
  //     // y: 10,
  //     transition: {
  //       duration: 0.75,
  //       delay: 0.5
  //     }
  //   }
  // };
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}
  return (
    <AnimatePresence> 
      <div key={pathname}>
        <motion.div
          initial={{ y:20, opacity: 0}}
          animate={{ y:0, opacity: 1}}
          transition={{ ease: 'easeInOut', duration: 1.15 }}
            // variants={variants} // Pass the variant object into Framer Motion 
            // initial="hidden" // Set the initial state to variants.hidden
            // animate="enter" // Animated state to variants.enter
            // exit="exit" // Exit state (used later) to variants.exit
            // transition={{ type: 'linear' }} // Set the transition to linear
            // className=""


            //  variants={variants}
          // initial={{ opacity: 0}}
          // animate={{opacity: 1}}
          // exit={{ opacity: 0}}
          // transition={{ duration: 0.2}}
          // initial={{ opacity: 0 }}
          // animate={{
          //   opacity: 1,
          //   transition: {
          //     delay: 0.1,
          //     duration: 0.4,
          //     ease: "easeIn",
          //   },
          // }}
          // className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
        >
        {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
