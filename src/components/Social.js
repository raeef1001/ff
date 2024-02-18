import React from 'react';
import {twitter, github} from '../assets/index'
import { AiFillGithub,AiFillDribbbleCircle,AiFillTwitterCircle,AiFillLinkedin } from 'react-icons/ai';
import { useContext } from "react";
import { Context } from "../App";

const Social = () => {
    const date = new Date();
    const nightMode = useContext(Context);
    return (
        <div className='text-[#938E8A]'>
            {/* <div className='flex gap-4 w-80 mx-auto p-10 overflow-hidden '  >
                <a className={`${nightMode ? " hover:text-[#fff] " : "hover:text-[#1C1917]"} `} target='_blank'   href="https://github.com/raeef1001"> <AiFillGithub size={40} /></a>
                <a className={`${nightMode ? " hover:text-[#fff] " : "hover:text-[#1C1917]"} `} target='_blank' href="https://dribbble.com/raeefofficial"><AiFillDribbbleCircle size={40}/></a>
                <a className={`${nightMode ? " hover:text-[#fff] " : "hover:text-[#1C1917]"} `} target='_blank' href="https://twitter.com/Aryian362"><AiFillTwitterCircle size={40}/></a>
                <a className={`${nightMode ? " hover:text-[#fff] " : "hover:text-[#1C1917]"} `} target='_blank' href="https://www.linkedin.com/in/raeef1001/"><AiFillLinkedin size={40}/></a>
            </div> */}
            <div >
                <h1 className='text-center'>© {date.getFullYear()} IUT Vanguard. All rights reserved.</h1>
            </div>
        </div>
    );
};

export default Social;