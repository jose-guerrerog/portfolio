"use client";
import React, { useState } from "react";
// import GithubIcon from "../../../public/github-icon.svg";
// import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { Box, TextField, Button, Grid } from "@mui/material";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
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
  };

  return (
    <Box component="section" id="contact">
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="firstName"
              label="First Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="lastName"
              label="Last Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              name="comment"
              label="Comment"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default EmailSection;
