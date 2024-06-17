import React from "react";
import Tilt from "react-parallax-tilt";
import LogoCSS from "./Logo.module.css";
import brain from "./brain.png";

const Logo = () => {
    return (
        <div className={LogoCSS.center}>
            <Tilt className={LogoCSS.divTilt}>
                <div className={LogoCSS.divAll}>
                    <img className={LogoCSS.image} alt="logo" src={brain} />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
