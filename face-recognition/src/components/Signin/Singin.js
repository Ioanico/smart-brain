import React, { useEffect, useState } from "react";
import "./Signin.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIN = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data.id);
          onRouteChange("home");
        }
      });

    console.log("email", signInEmail);
    console.log("Pass: ", signInPassword);
  };

  return (
    <div id="sign-in-form">
      <p>Sign In</p>
      <TextField
        required
        onChange={onEmailChange}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        required
        onChange={onPasswordChange}
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
      />
      <div className="sign_in_button">
        <Button onClick={onSubmitSignIN} variant="outlined">
          Sign In
        </Button>
      </div>
      <div className="register_button">
        <Button onClick={() => onRouteChange("register")} variant="text">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Signin;
