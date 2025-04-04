import React from "react";

export default function sidebar({ expand, setExpand }) {
  return (
    <div
      className={`bg-amber-200 flex flex-col items-center ${
        expand ? "w-64 p-7" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      <div onClick={() => setExpand((prev) => !prev)}> click me</div>
    </div>
  );
}
