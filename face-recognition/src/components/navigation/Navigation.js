import React from "react";
import NavCSS from "./Navigation.module.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className={NavCSS.nav}>
        <p onClick={() => onRouteChange("signin")} className={NavCSS.signOut}>
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className={NavCSS.nav}>
        <p onClick={() => onRouteChange("register")} className={NavCSS.signOut}>
          Register
        </p>
        <p onClick={() => onRouteChange("signin")} className={NavCSS.signOut}>
          Sign In
        </p>
      </nav>
    );
  }
};

export default Navigation;
