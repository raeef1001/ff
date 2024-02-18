import React, { useEffect, useState } from "react";
import Animation from "./Animation";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Chat = () => {
    const [transcript, setTranscript] = useState("");
    useEffect(() => {
        recognition.onresult = function (event) {
          setTranscript(event.results[0][0].transcript);
         
         
        };
    
        recognition.onend = function () {
            setTranscript(transcript);
        
        };
      }, [transcript]);

const[aiResponse,setAiResponse]=useState("");
  const [transcriptvoice, setTranscriptvoice] = useState("");
  const [mood, setmood] = useState("");
  const [moodAvailable, setMoodAvailable] = useState(false);
  const [language, setlanguage] = useState("");
  const [languageavailable, setlanguageavailable] = useState(false);
  const [submitClicked, setsubmitClicked] = useState(false);
  const [result, setResult] = useState(
    "generate random text to practice your pronunciation"
  );
  const handleChange = (event) => {
    setlanguage(event.target.value);
    setlanguageavailable(true);
    setMoodAvailable(false);
    setmood("");
    setsubmitClicked(false);
    setResult("generate random text to practice your pronunciation");
  };
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [recording, setRecording] = useState(false);
  const [allsent, setAllsent] = useState([
  
    
  ]);
  const [allreceived, setAllreceived] = useState([
  
    
  ]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = (e) => {
        setAudioChunks([...audioChunks, e.data]);
      };
      recorder.start();
      recognition.start();
      setRecording(true);
      setTranscript("");
     
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      recognition.stop();
      audioStream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  const saveRecording = () => {
    const blob = new Blob(audioChunks, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    console.log(url);
    setAllsent([...allsent, url]);
    console.log(transcript);
    handle();

  };
  const handle = async () => {  
   
      try {
        const response = await fetch("http://localhost:5000/voicechat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  "userchat": transcript,mood:mood }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
       
        const data = await response.json();
        setAiResponse(data.content);
        setAllreceived([...allreceived, data.content]);
        console.log(data.content);
     
      
      } catch (error) {
        console.log(error.message);
      }
 
  };
  const speak = (e) => {
   
  setSpeaking(!speaking);
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = e;
    speechSynthesis.speak(utterance)
  };
  const [speaking, setSpeaking] = useState(false);
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
              {/* <option value="bangla" selected={language === "bangla"}>
                Bangla
              </option>
              <option value="hindi" selected={language === "hindi"}>
                Hindi
              </option>
              <option value="korean" selected={language === "korean"}>
                Korean
              </option> */}
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

      <div className="my-5 mx-auto w-[50vw]  text-center font-normal border-2 border-gray-400 p-5 rounded-md">
        {allsent.map((item,index) => (
          <div className="">
            <div className="my-24 ml-60">
              <audio controls className="">
                <source src={item} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
           {
            allreceived[index] && (
                <div className="my-24 w-[300px] p-4 rounded-3xl bg-gray-300 ">
                    <button onClick={()=>speak( allreceived[index])}>{speaking ? "Pause" : "Start"}</button>
              </div>
            )
           }
          </div>
        ))}
      </div>

      <div className="w-80 mx-auto">
        {recording && <div>Recording...</div>}
        <button
          onClick={startRecording}
          type="button"
          class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Start{" "}
        </button>
        <button
          onClick={stopRecording}
          type="button"
          class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Stop{" "}
        </button>
        <button
          onClick={saveRecording}
          type="button"
          class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Send{" "}
        </button>
        {/* {audioURL && <audio controls src={audioURL} />} */}
      </div>
    </div>
  );
};

export default Chat;
