import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [urlimage, seturlimage] = useState("");
  const [urlavailableimage, seturlavailableimage] = useState(false);
  const [answerArray, setAnswerArray] = useState([1,2,3,4]);
  const [arrayAvailable, setArrayAvailable] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [nextClicked, setNextClicked] = useState(false);
  const handleAnswerClick = (answer) => {
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("wrong");
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(2);
        const response = await fetch("http://localhost:5000/quiz");
        console.log(3);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(1);
        const data = await response.json();
        console.log(data.ansURL);
        console.log('llll');
        seturlavailableimage(true);
        console.log('llll');
        setArrayAvailable(true);
        setAnswerArray(data.options);
        setCorrectAnswer(data.answer);
        seturlimage(data.ansURL);
      } catch (error) {
        seturlavailableimage(false);
        setArrayAvailable(false);
      }
    }

    fetchData();
  }, [nextClicked]);

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
      <div className="w-60 mx-auto m-5">
        {urlavailableimage ? (
          <img
            className="items-center justify-center w-full rounded-md"
            src={urlimage}
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
       {arrayAvailable? ( <div className=" w-[80%] mx-auto grid grid-cols-2 gap-12">
          {answerArray.map((answer, index) => (
            <button
              key={index}
              type="button"
              className={`text-sm font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2  text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 ${
                selectedAnswer === answer
                  ? "bg-green-500 text-white"
                  : selectedAnswer === "wrong" && answer === correctAnswer
                  ? "bg-green-500 text-white"
                  : selectedAnswer === "wrong" && answer !== correctAnswer
                  ? "bg-red-500 text-white"
                  : ""
              }`}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
         ):(
        <div className="w-40 mx-auto">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full w-60 dark:bg-gray-700"></div>
            <div class="flex items-center mt-4"></div>
          </div>
        )}
        <div className="w-40 mx-auto m-5">
          <button
            onClick={() =>
                
                {setNextClicked(!nextClicked)
                    setAnswerArray([])
                    setArrayAvailable(false)
                    setSelectedAnswer(null)

                    setSelectedAnswer(null)
                    seturlavailableimage(false)
                    seturlimage('')

                }
            
            
            }
            type="button"
            class="flex  text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Next Quiz
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
        <div className="w-80 mx-auto mt-5">
          <div>
            {" "}
            <h1>Give your valuable feedback on this quiz</h1>
          </div>
          <div className="flex gap-4 w-40 mx-auto m-5">
            <button
              type="button"
              class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
            <button
              type="button"
              class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
