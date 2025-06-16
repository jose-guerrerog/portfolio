"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../schema";
import { toast, ToastContainer } from "react-toastify";
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

  const onSubmit = async (e: any) => {
    const data = {
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      message: e.message,
    };
    const JSONdata = JSON.stringify(data);
    const response = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    });
    const resData = await response.json();

    if (response.status === 200) {
      toast.success("Message sent", { theme: "colored" });
    } else {
      toast.error("Message unsuccessful");
    }

    reset();
  };

  return (
    <section id="contact" className="flex flex-col items-center justify-center my-12 px-4">
      <ToastContainer />
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
        Get in Touch
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl mt-6 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-white">First Name</label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full rounded-lg border border-gray-700 bg-transparent text-white p-2"
              required
            />
            <p className="text-sm text-red-400 mt-1">{errors.firstName?.message}</p>
          </div>

          <div>
            <label className="block mb-1 text-sm text-white">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full rounded-lg border border-gray-700 bg-transparent text-white p-2"
            />
            <p className="text-sm text-red-400 mt-1">{errors.lastName?.message}</p>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 text-sm text-white">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-700 bg-transparent text-white p-2"
              required
            />
            <p className="text-sm text-red-400 mt-1">{errors.email?.message}</p>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 text-sm text-white">Message</label>
            <textarea
              rows={4}
              {...register("message")}
              className="w-full rounded-lg border border-gray-700 bg-transparent text-white p-2"
              required
            />
            <p className="text-sm text-red-400 mt-1">{errors.message?.message}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition disabled:opacity-50"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-2xl font-semibold text-blue-400 mb-2">Let's connect</h3>
          <p className="text-white mb-4">I can also be found on Github and LinkedIn</p>
          <div className="flex justify-center gap-4">
            <Link href={githubLink}>
              <Image src="/images/github-mark-white.svg" alt="Github Icon" width={40} height={40} />
            </Link>
            <Link href={linkedinLink}>
              <Image src="/images/linkedin-icon.svg" alt="Linkedin Icon" width={50} height={50} />
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Contact;
