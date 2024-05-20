"use client";
import React from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../schema";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (e: any) => {
    const data = {
      name: "jose",
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
      console.log("Message sent.");
    }

    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Box
      component="section"
      id="contact"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      mt={8}
      mb={4}
    >
      <Typography variant="h3" fontWeight={700} sx={{
          background: "linear-gradient(45deg, #2196f3 30%, #21f364 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
      }}>Get in Touch</Typography>
      <Box onSubmit={handleSubmit(onSubmit)} maxWidth={800} component="form">
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
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!isValid}
            size="large"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
