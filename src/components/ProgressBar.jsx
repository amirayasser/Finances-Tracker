import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ ratio, Tincome, Tex }) => {
  const percentage = (100 - ratio * 100).toFixed(2);
  const netValue = Tincome + Tex;
  console.log("netValue", netValue);
  console.log("percentage is", percentage, ratio);
  console.log("ratio", -Tex / Tincome);
  // Check if netValue is zero separately to handle the case when Tincome equals Tex
  const text =
    netValue === 0
      ? "0%"
      : !isNaN(parseFloat(percentage))
        ? `${percentage}%`
        : "%";
  console.log("text", text);
  return (
    <div style={{ width: 150, height: 150, margin: "20px 0" }}>
      <CircularProgressbar
        maxValue={Tincome}
        minValue={0}
        value={netValue}
        text={text}
        styles={{
          path: {
            stroke: "#E7B10A", // Set your desired color here
          },
          trail: {
            stroke: "#EEF0E5", // Set your desired background color here
          },
          text: {
            fill: "#EEF0E5", // Set text color
            fontSize: "20px", // Set font size
            fontWeight: "600",
          },
        }}
      />
      ;
    </div>
  );
};

export default ProgressBar;
