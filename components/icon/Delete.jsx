import * as React from "react";

const Delete = ({onDelete}) => (
  <svg
   onClick={()=>onDelete()}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    className="cursor-pointer"
    viewBox="0 0 24 24"
  >
    <g clipPath="url(#clip0_6_12293)">
      <path
        fill="#1c2c42"
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_6_12293">
        <path fill="#fff" d="M0 0h24v24H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default Delete;
