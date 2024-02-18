import React,{ useRef } from "react";
import "./contact.css";
import { useContext } from "react";
import { Context } from "../App";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
  const nightMode = useContext(Context);
  const form = useRef();
// email js section 
  const sendEmail = (e) => {
    e.preventDefault();
      // emailjs service 
      // emaijs template 
      // emaijs public id 
    emailjs.sendForm(process.env.SERVICE , process.env.TEMPLATE, form.current, process.env.PUBLIC)
      .then((result) => {
          console.log(result.text);
           notify()
      }, (error) => {
          console.log(error.text);
      });
  };

  // toastify section 
  const notify = () =>  toast.success('👍 Message sent!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
 
  return (
    <div>
      <div className="md:w-[40vw] w-[80vw] max-w-[600px] mx-auto">
        <div className="mb-5">
          <h1  className={`${nightMode ? " border-[#fff] " : "border-[#1C1917]"} text-[1.5rem] font-semibold border-b-4 inline `}>
            Contact
          </h1>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text" name="from_name"
            className={`${nightMode ? "bg-[#1C1917] border-[#fff] " : "border-[#938E8A] bg-[#fff]"} mb-2
       border-2 rounded-md px-5 
      py-2 md:w-[40vw] w-[80vw] max-w-[600px] `}
            placeholder="Name"
          />
          <br />
          <input
            type="email" name="reply_to"
            className={`${nightMode ? "bg-[#1C1917] border-[#fff] " : "border-[#938E8A] bg-[#fff]"} mb-2
            border-2 rounded-md px-5 
           py-2 md:w-[40vw]  w-[80vw] max-w-[600px] `}
            placeholder="Email"
          />
          <br />
          <textarea name="message"
            rows="10"
            className={`${nightMode ? "bg-[#1C1917] border-[#fff] " : "border-[#938E8A] bg-[#fff]"} mb-2
            border-2 rounded-md px-5 
           py-2  block w-[100%] max-w-[600px] `}
            placeholder="Message"
          ></textarea>

          <input
            className="btn px-10 py-[8px] rounded-md cursor-pointer "
            type="submit"
            value="Send"
          ></input>
        </form>
      
      </div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
};

export default Contact;
