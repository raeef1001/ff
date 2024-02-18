import React from "react";
import { useContext } from "react";
import { Context } from "../App";
const Heading = () => {
  const nightMode = useContext(Context);

  return (
    <div
      className={`${
        nightMode ? "text-[#FFFFFF]" : "text-[#1C1917]"
      } h-100 w-100 cursor-pointer`}
    >
      <div className="flex flex-col text-center">
        <div className="">
         
          <h1 className="text-[2.25rem] md:text-[4.5rem] font-bold ">
            GEMINI
          </h1>
        </div>
        <div>
         
          <h2
            className={`${
              nightMode ? "text-[#D6D3D1]" : "text-[#1C1917]"
            } text-[1rem] md:text-[1.25rem]  mb-[10px]`}
          >
            Your Ai Based Language Learning Platform
          </h2>
        </div>
        <div className="md:w-[60vw] lg:w-[50vw] xl:w-[40vw] 2xl:w-[35vw] self-center px-5">
          <p
            className={`${
              nightMode ? "text-[#D6D3D1]" : "text-[#1C1917]"
            } text-[.975rem]  font-bold `}
          >
          
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
