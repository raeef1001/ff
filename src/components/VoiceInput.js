import React, { useState, useEffect } from "react";
import Animation from "./Animation";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function VoiceInput(props) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    recognition.onresult = function (event) {
      setTranscript(event.results[0][0].transcript);
      props.set(transcript);
     
    };

    recognition.onend = function () {
      setListening(false);
      props.set(transcript);
    
    };
  }, [transcript]);

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
      setTranscript("");
      props.set(transcript);
    }
  };

  return (
    <div>
       {listening && <Animation/> }
     <div  className={listening ? "w-[10vw] mx-auto mt-12" : "w-[10vw] mx-auto"}>
     <button  type="button" class= " text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={toggleListening}>{listening ? "Pause" : "Start"}</button>
     {listening && <div>Listening...</div>}
     </div>
      {/* {transcript && <div>{transcript}</div>} */}
        
       
       
      <div className="h-[100px]">
      
       
      </div>
      </div>
  
  );
}

export default VoiceInput;
