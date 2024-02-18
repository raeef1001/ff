import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
       // Access props using this.props
       const { props } = this;
        console.log(this.props.u);
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName:"dirbibxzp",  // your credential here
        uploadPreset:"hsolam4w",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            props.s(true);
          console.log("Done! Here is the image info: ", result.info.url);
          props.su(result.info.url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
