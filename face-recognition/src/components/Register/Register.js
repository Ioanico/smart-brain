import React, { useEffect, useState } from "react";
import "./Register.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Register = ({ onRouteChange, loadUser }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onSubmitSignIN = () => {
    fetch("http://localhost:3001/register", {
      method: "post",   
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user.id);
          onRouteChange("home");
        }
      });
  };

  return (
    <div id="sign-in-form">
      <p>Register</p>
      <TextField
        onChange={onNameChange}
        id="outlined-basic"
        label="Name"
        variant="outlined"
      />
      <TextField
        onChange={onEmailChange}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        onChange={onPasswordChange}
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
      />
      <div className="sign_in_button">
        <Button onClick={() => onSubmitSignIN()} variant="outlined">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Register;
