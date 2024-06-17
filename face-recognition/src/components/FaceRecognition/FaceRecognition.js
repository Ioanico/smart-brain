import React, { useEffect } from "react";
import FaceCSS from "./FaceRecognition.module.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className={FaceCSS.center}>
      <img id="inputimage" src={imageURL} height={"auto"} width={"500px"} />
      <div
        className={FaceCSS.boundingbox}
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecognition;
