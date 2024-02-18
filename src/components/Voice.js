import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import VoiceInput from "./VoiceInput";
import TextWithDynamicUnderline from "./Text";
// import txtomp3 from 'text-to-mp3';
// import fs from 'fs';
const Voice = () => {
  const [transcriptvoice, setTranscriptvoice] = useState("");
  const [mood, setmood] = useState("");
  const [moodAvailable, setMoodAvailable] = useState(false);
  const [language, setlanguage] = useState("");
  const [languageavailable, setlanguageavailable] = useState(false);
  const [submitClicked, setsubmitClicked] = useState(false);
  const [result, setResult] = useState(
    "generate random text to practice your pronunciation"
  );
  const[audioFile,setAudioFile]=useState("");
  const [analyzeData, setanalyzeData] = useState("");
  const [analyzedataavailable, setAnalyzedataavailable] = useState(false);
  const[blobdata,setBlobdata]=useState();
  const handleChange = (event) => {
    setlanguage(event.target.value);
    setlanguageavailable(true);
    setMoodAvailable(false);
    setmood("");
    setsubmitClicked(false);
    setResult("generate random text to practice your pronunciation");
  };
  const speak = (e) => {
    e.preventDefault();
  
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = result;
    speechSynthesis.speak(utterance)
  };
  const handleClick = async () => {
    if (moodAvailable && languageavailable) {
      setsubmitClicked(true);
      console.log(mood, language);
      try {
        const response = await fetch("http://localhost:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputlanguage: language, mood: mood }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResult(data.content);
        setAnalyzedataavailable(false);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      window.alert("Please upload an image and select a language");
    }
  };
//   const replaceWords = () => {
//     console.log("called");
//     let modifiedText = transcriptvoice;
//     for (const [key, value] of Object.entries(analyzeData)) {
//       modifiedText = modifiedText.replace(new RegExp("\\b" + key+ "\\b", "gi"), value);
//     }
//     setTranscriptvoice(modifiedText);
//     console.log(modifiedText);
//   };



  const handleAnalyze = async () => {
   
  
    if (result && transcriptvoice) {
      setsubmitClicked(true);
      console.log(result, transcriptvoice);
      try {
        const response = await fetch("http://localhost:5000/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  "generatetxt": result,"usertxt": transcriptvoice }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setanalyzeData(data.content);
        console.log(data.content);
        setAnalyzedataavailable(true);
        
      } catch (error) {
        console.log(error.message);
      }
    } else {
      window.alert("Please upload an image and select a language");
    }
  };


  
   
 
  return (
    <div className=" ml-20  p-12">
      <div>
        <h1 className="text-center text-3xl font-bold m-2">
          Get Your Grammar and Pronunciation Right
        </h1>
        <h2 className="text-center text-lg font-thin m-2">
          Your all in one tool to check for grammar and pronuciation mistake
        </h2>
      </div>
      <div className="flex gap-2  m-5 p-2 w-[45%] mx-auto">
        <div>
          <form class="max-w-sm mx-auto">
            <label for="" class="sr-only">
              Underline select
            </label>
            <select
              id=""
              value={language}
              onChange={handleChange}
              class="block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="choose a language" selected={language === ""}>
                Choose A Language
              </option>
              <option value="english" selected={language === "english"}>
                English
              </option>
              <option value="bangla" selected={language === "bangla"}>
                Bangla
              </option>
              <option value="hindi" selected={language === "hindi"}>
                Hindi
              </option>
              <option value="korean" selected={language === "korean"}>
                Korean
              </option>
            </select>
          </form>
        </div>
        <div>
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => {
                setmood("casual");
                setMoodAvailable(true);
              }}
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Casual
            </button>
            <button
              onClick={() => {
                setmood("formal");
                setMoodAvailable(true);
              }}
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Formal
            </button>
            <button
              onClick={() => {
                setmood("conversational");
                setMoodAvailable(true);
              }}
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Conversation
            </button>
          </div>
        </div>
      </div>
      <div className="flex ml-24 text-lg">
        <div className="my-5 mx-3 w-[30vw]  text-center font-normal border-2 border-gray-400 p-5 rounded-md">
          <div className="height">{result}</div>
          <div className="">
            <button
              onClick={handleClick}
              type="button"
              class="  text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 m-4  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              generate
            </button>
            {/* <audio controls  className="">
              <source
                src={audioFile}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio> */}
            <button
              onClick={speak}
              type="button"
              class="  text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 m-4  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Speak
            </button>
          </div>
        </div>
        <div className="my-5 mx-3 w-[30vw] overflow-hidden text-center font-small text-sm border-2 border-gray-400 p-5 rounded-md">
          <div className="height">{!analyzedataavailable? transcriptvoice :analyzeData}</div>
         
          <div className="">
            
        
          </div>
          <button onClick={handleAnalyze} type="button" class="mt-10 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Analyze</button>
           
        </div>
      </div>

      <div className=" m-5 p-2 w-full mx-auto">
        <VoiceInput set={setTranscriptvoice}></VoiceInput>
        
      </div>
      {/* {
            analyzedataavailable && (
                <TextWithDynamicUnderline text={transcriptvoice} phrases={analyzeData} />
            )
         } */}
    </div>
  );
};

export default Voice;
