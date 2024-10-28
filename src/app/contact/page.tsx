"use client";

import React from "react";
import { Box, TextField, Grid, Typography, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../schema";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { githubLink, linkedinLink } from "../constants";
import { ToastContainer } from "react-toastify";

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
    const endpoint = "/api/send";

    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };
    // sendEmail({name: 'jose', email: e.email, message: e.message})
    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      toast.success("Message sent", {
        theme: "colored",
      });
    } else {
      toast.error("Message unsuccessful");
    }

    console.log(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <Box
      component="section"
      id="contact"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      my={3}
    >
      <ToastContainer />
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          background: "linear-gradient(45deg, #2196f3 30%, #21f364 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Get in Touch
      </Typography>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        maxWidth={800}
        component="form"
        mt={2}
      >
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              variant="outlined"
              label="First Name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              variant="outlined"
              label="Last Name"
              {...register("lastName")}
              helperText={errors.lastName?.message}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              variant="outlined"
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="message"
              variant="outlined"
              multiline
              rows={4}
              label="Message"
              {...register("message")}
              error={!!errors.message}
              helperText={errors.message?.message}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box component='div' display="flex" justifyContent="center" mt={3}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!isValid}
            size="large"
            loading={isSubmitting}
            sx={{
              borderRadius: "36px",
            }}
          >
            <Typography textTransform={"capitalize"} px={1} py="4px">
              Submit
            </Typography>
          </LoadingButton>
        </Box>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography mt={8} mb={2} variant="h4" color="#2196f3">
            Let&apos;s connect
          </Typography>
          <Typography mb={3} variant="h6" color="textPrimary" textAlign='center'>
            I can also be found in Github and LinkedIn
          </Typography>
          <Stack direction="row" gap={2} alignItems="center">
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
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
