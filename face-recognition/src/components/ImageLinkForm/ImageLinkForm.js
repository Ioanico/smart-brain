import React from "react";
import FormCSS from "./ImageLinkForm.module.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className={FormCSS.container}>
            <p>
                {
                    "This Magic Brain will detect faces in your picture, give it a try"
                }
            </p>
            <div className={FormCSS.honey}>
                <div className={FormCSS.inputDiv}>
                    <input
                        className={FormCSS.input}
                        type="text"
                        onChange={onInputChange}
                    />
                    <button className={FormCSS.button} onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
