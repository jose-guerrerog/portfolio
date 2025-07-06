"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../schema";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { githubLink, linkedinLink } from "../constants";
import { motion } from "framer-motion";
import { contactAnimations } from "@/lib/animations";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    });

    if (response.status === 200) {
      toast.success("Message sent", { theme: "colored" });
    } else {
      toast.error("Message unsuccessful");
    }

    reset();
  };

  return (
    <motion.section
      id="contact"
      className="flex flex-col items-center py-16 mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={contactAnimations.container}
    >
      <ToastContainer />
      
      {/* Heading */}
      <motion.h2
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-400 mb-12 text-center drop-shadow-md"
        variants={contactAnimations.title}
      >
        Get in Touch
      </motion.h2>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-base"
        variants={contactAnimations.form}
      >
        <motion.div className="col-span-1" variants={contactAnimations.input}>
          <motion.input
            {...register("firstName")}
            placeholder="First Name*"
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.firstName && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.firstName.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="col-span-1" variants={contactAnimations.input}>
          <motion.input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div className="col-span-1 sm:col-span-2" variants={contactAnimations.input}>
          <motion.input
            {...register("email")}
            placeholder="Email*"
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.email && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="col-span-1 sm:col-span-2" variants={contactAnimations.input}>
          <motion.textarea
            {...register("message")}
            placeholder="Message*"
            rows={4}
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.message && (
            <motion.p
              className="text-red-400 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.message.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="col-span-1 sm:col-span-2 flex justify-center"
          variants={contactAnimations.input}
        >
          <motion.button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-4 bg-[#00ff99] text-black text-base font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isSubmitting ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </motion.button>
        </motion.div>
      </motion.form>

      {/* Social Links */}
      <motion.div
        className="flex flex-col items-center mt-20 text-center"
        variants={contactAnimations.social}
      >
        <motion.h3
          className="text-3xl font-semibold text-sky-400 mb-3"
          variants={contactAnimations.title}
        >
          Let&apos;s connect
        </motion.h3>
        <motion.p
          className="text-lg text-gray-300 mb-6"
          variants={contactAnimations.title}
        >
          I can also be found in Github and LinkedIn
        </motion.p>
        <motion.div className="flex gap-6" variants={contactAnimations.title}>
          <motion.div variants={contactAnimations.icon} whileHover="hover">
            <Link href={githubLink}>
              <Image
                src="/images/github-mark-white.svg"
                alt="Github Icon"
                width={40}
                height={40}
              />
            </Link>
          </motion.div>
          <motion.div variants={contactAnimations.icon} whileHover="hover">
            <Link href={linkedinLink}>
              <Image
                src="/images/linkedin-icon.svg"
                alt="Linkedin Icon"
                width={50}
                height={50}
              />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;