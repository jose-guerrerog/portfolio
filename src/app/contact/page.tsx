"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../schema";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { githubLink, linkedinLink } from "../constants";

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
    <section id="contact" className="flex flex-col items-center px-4 py-6">
      <ToastContainer />
      
      {/* Heading */}
      <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-400 mb-12 text-center drop-shadow-md">
        Get in Touch
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-base"
      >
        <div className="col-span-1">
          <input
            {...register("firstName")}
            placeholder="First Name*"
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <input
            {...register("email")}
            placeholder="Email*"
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <textarea
            {...register("message")}
            placeholder="Message*"
            rows={4}
            className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff99] transition-all"
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-4 bg-[#00ff99] text-black text-base font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Social Links */}
      <div className="flex flex-col items-center mt-20 text-center">
        <h3 className="text-3xl font-semibold text-sky-400 mb-3">Let&apos;s connect</h3>
        <p className="text-lg text-gray-300 mb-6">
          I can also be found in Github and LinkedIn
        </p>
        <div className="flex gap-6">
          <Link href={githubLink}>
            <Image
              src="/images/github-mark-white.svg"
              alt="Github Icon"
              width={40}
              height={40}
            />
          </Link>
          <Link href={linkedinLink}>
            <Image
              src="/images/linkedin-icon.svg"
              alt="Linkedin Icon"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
