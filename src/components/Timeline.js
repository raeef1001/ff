import React from 'react';
import Timecard from './Timecard';
import {timeline} from '../assets/index'
import { useContext } from "react";
import { Context } from "../App";
const Timeline = () => {
    const nightMode = useContext(Context);
    return (
        <div className='lg:w-[40vw] w-[80vw] max-w-[600px] mx-auto cursor-pointer'>
            <div className='mb-5'>
                <h1 className={`${nightMode ? " border-[#fff] " : "border-[#1C1917]"} text-[1.5rem] font-semibold border-b-4 inline`}>Timeline</h1>
            </div >
            <div className='border-l-[1px] border-[#635f5c] '>

                {
                    timeline.map(tl=>(
                        <Timecard data={tl}></Timecard>
                    ))
                }
           
         
          
            </div>
            
        </div>
    );
};

export default Timeline;