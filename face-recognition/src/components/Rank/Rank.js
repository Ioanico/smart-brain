import React from "react";
import RankCSS from "./Rank.module.css";

const Rank = ({ name, entries }) => {
  //   console.log(name, entries);
  return (
    <div className={RankCSS.container}>
      <div>{`${name}, your current rank is ${entries}`}</div>
    </div>
  );
};

export default Rank;
