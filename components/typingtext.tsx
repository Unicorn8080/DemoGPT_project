import React from 'react';
import { TypeAnimation } from 'react-type-animation'

interface MyComponentProps {
}

const TypingText: React.FC<MyComponentProps> = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
        // Same substring at the start will only be typed out once, initially
        'Blog Post Writer',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Chatbot',
        1000,
        'PDF Analyzer Bot',
        1000,
        'Grammar Corrector',
        1000,
        'Translator',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontFamily: 'arial', fontWeight: "900",fontSize: '3em', display: 'inline-block' }}
      repeat={Infinity}
      />
    </div>
  );
}

export default TypingText;