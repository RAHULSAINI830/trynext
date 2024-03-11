import * as React from "react";
const Arrow = (props) => (
  <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      d="m21.707 11.293-7-7A1 1 0 0 0 13 5v3H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10v3a1 1 0 0 0 1.707.707l7-7a1 1 0 0 0 0-1.414z"
      data-name="Right"
      style={{
        fill: "#ff8e31",
      }}
    />
  </svg>
);
export default Arrow;
