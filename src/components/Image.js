import React, { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUpload";

const Image = () => {
  const [url, seturl] = useState("");
  const [urlavailable, seturlavailable] = useState(false);
  const[language,setlanguage] = useState("");
  const[languageavailable,setlanguageavailable] = useState(false);
  const[submitClicked,setsubmitClicked] = useState(false);
  const[imageResult,setImageResult] = useState("");
  const handleChange = (event) => {
    setlanguage(event.target.value);
    setlanguageavailable(true);
    seturlavailable(false);
    seturl("");
    setsubmitClicked(false);
    setImageResult("");
  };
  const handleClick = async() => {
    if(urlavailable && languageavailable){
        setsubmitClicked(true);
        console.log(url,language);
        try {
            const response = await fetch('http://localhost:5000/analyze', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({"imageurl": url, "language":language }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImageResult(data.description);
          } catch (error) {
           console.log(error.message);
          }
    }
    else{
        window.alert("Please upload an image and select a language")
    }

 


   
    
  };
  return (
    <div className=" ml-10  p-12">
      <div>
        <h1 className="text-center text-3xl font-bold m-2">
          Get Translation From Uploading An Image
        </h1>
        <h2 className="text-center text-lg font-thin m-2">
          Your all in one tool to check for grammar and pronuciation mistake
        </h2>
      </div>
      <div className="flex">
      <div className=" mx-32 my-5">
        {urlavailable ? (
          <img
            className="items-center w-60 justify-center  rounded-md"
            src={url}
            alt=""
          />
        ) : (
          <div
            role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          >
            <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                class="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>

            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex gap-2  my-5 p-2  mx-auto">
          <div>
            <form class="max-w-sm mx-auto">
              <label for="" class="sr-only">
                Underline select
              </label>
              <select
                id=""
                value={language} onChange={handleChange}
                class="block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="choose a language" selected={language === ""}>Choose A Language</option>
                <option value="english" selected={language === "english"}>English</option>
                <option value="bangla" selected={language === "bangla"}>Bangla</option>
                <option value="hindi" selected={language === "hindi"}>Hindi</option>
                <option value="korean" selected={language === "korean"}>Korean</option>
              </select>
            </form>
          </div>
          <div>
            <div class="inline-flex  " role="group">
              <CloudinaryUploadWidget u={url} s={seturlavailable} su={seturl} />
              {/* <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Upload
            </button> */}
              <button
                type="button"
                onClick={handleClick}
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {submitClicked && imageResult.length<=0 && (
            <div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full w-60 dark:bg-gray-700"></div>
            <div class="flex items-center mt-4"></div>
          </div>)
        
            }
            {
                  submitClicked && imageResult.length>0 && (
                   < h1 className="text-center text-xl font-bold m-2">
                    {imageResult}
                    </h1>
                  )
            }
      </div>
      </div>
    </div>
  );
};

export default Image;
