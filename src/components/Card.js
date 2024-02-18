import React from 'react';
import SingleCard from './SingleCard';
import {project} from '../assets/index'


const Card = () => {
    return (
        <div className='flex justify-center content-center flex-col gap-2 md:flex-row px-24 md:px-10 py-10'>
           
           {
            project.map(item=> (
                        <SingleCard data={item}></SingleCard>
            ))
           }
            
        </div>
    );
};

export default Card;