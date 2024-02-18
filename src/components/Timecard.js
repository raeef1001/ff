import React from "react";
import { useContext } from "react";
import { Context } from "../App";

const Timecard = (props) => {
  const nightMode = useContext(Context);

  return (
    <div>
      <div className="pl-5 mb-10 ">
        <div className="flex content-center mb-2 ">
          <div   className={`${
    nightMode ? "bg-[#635f5c]" : "bg-black "
  } rounded-full w-3 h-3 -translate-x-7 translate-y-2`}></div>
          <h2 className={`${
    nightMode ? "bg-white text-black" : "bg-black text-white"
  } inline font-semibold -translate-x-3  rounded-md px-2 md:py-[4px]`}>
            {props.data.date}
          </h2>
          <h1 className="mr-2 md:text-[1.2rem] text-[1.1rem] font-semibold">
          {props.data.title}
          </h1>
          <h5 className="md:text-[.92rem] text-[.72rem] text-[#635f5c] translate-y-1 ">
          {props.data.duration}
          </h5>
        </div>
        <div>
          <p className="text-[#938E8A]">
          {props.data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timecard;
