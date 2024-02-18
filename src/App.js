import './App.css';
import Card from './components/Card';
import Contact from './components/Contact';
import Heading from './components/Heading';
import Social from './components/Social';
import Timeline from './components/Timeline';
import night from './assets/full-moon.png'
import day from './assets/moon.png'
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Voice from './components/Voice';
import Image from './components/Image';
import Quiz from './components/Quiz';
import Animation from './components/Animation';
import Chat from './components/Chat';
export const Context = createContext(); 
function App() {
  const [nightMode,setNightMode] = useState(localStorage.getItem('isNight'));   // dark mode on 
  const systemTheme  = window.matchMedia("(prefers-color-scheme:dark)").matches;
 console.log(systemTheme , nightMode)  // night mode true
 const toggleNightMode = () => {
   
    
      setNightMode(!nightMode);
       localStorage.setItem('isNight',`${nightMode}`);
 
  
  };
 
  return (

    <div className="App  h-[100%] font-inter">
      <div className={nightMode?`bg-[#1C1917] text-[#FFFFFF]`:`bg-[#FFFFFF] text-[#1C1917]`} >
      <div className='flex justify-end  '>
      <img onClick={toggleNightMode} className='cursor-pointer my-10 mx-16 h-10' src={nightMode?day:night} alt="" />
      </div>
      <Context.Provider value={nightMode}>
     <Heading/>
     <Card/>
     <Voice/>
     <Image/>
     <Quiz/>
     {/* <Timeline/>
     <Contact/> */}
    <Chat/>
  
     </Context.Provider>
      </div>
     
    </div>
  );
}

export default App;
