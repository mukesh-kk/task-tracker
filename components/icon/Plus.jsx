import * as React from "react";

const Plus = ({color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    className="cursor-pointer"
    viewBox="0 0 24 24"
  >
    <g clipPath="url(#clip0_6_8865)">
      <path fill={`${color}`} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
    </g>
    <defs>
      <clipPath id="clip0_6_8865">
        <path fill="#fff" d="M0 0h24v24H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default Plus;
