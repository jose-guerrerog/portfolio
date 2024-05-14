"use client";
import React, { useState } from "react";
// import GithubIcon from "../../../public/github-icon.svg";
// import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from 'yup';
import { validationSchema } from "../schema";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema)
  })

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()
    // e.preventDefault();

    // const data = {
    //   email: e.target.email.value,
    //   subject: e.target.subject.value,
    //   message: e.target.message.value,
    // };
    // const JSONdata = JSON.stringify(data);
    // const endpoint = "/api/send";

    // // Form the request for sending data to the server.
    // const options = {
    //   // The method is POST because we are sending data.
    //   method: "POST",
    //   // Tell the server we're sending JSON.
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // Body of the request is the JSON data we created above.
    //   body: JSONdata,
    // };

    // const response = await fetch(endpoint, options);
    // const resData = await response.json();

    // if (response.status === 200) {
    //   console.log("Message sent.");
    //   setEmailSubmitted(true);
    // }
  // };

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data, null, 2));
  };


  return (
    <Box component="section" id="contact" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Typography>
        Get in Touch
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} maxWidth={800}>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              variant="outlined"
              label="First Name"
              {...register('firstName')}
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
              {...register('lastName')}
              helperText={errors.lastName?.message}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              variant="outlined"
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="comment"
              variant="outlined"
              multiline
              rows={4}
              label="Comment"
              {...register('comment')}
              error={!!errors.comment}
              helperText={errors.comment?.message}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box display='flex' justifyContent='center' mt={3}>
          <Button type="submit" variant="contained">Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailSection;
