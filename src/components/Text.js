import React from 'react';

const TextWithDynamicUnderline = ({ text, phrases }) => {
  const underlinePhrases = (text, phrases) => {
    // Split the text into words
    const words = text.split(' ');

    return words.map((word, index) => {
      // Check if the current word is one of the phrases
      if (phrases[word]) {
        return <u key={index}>{phrases[word]}</u>;
      } else {
        return <span key={index}>{word}</span>;
      }
    });
  };

  return <h1>{underlinePhrases(text, phrases)}</h1>;
};

export default TextWithDynamicUnderline;
