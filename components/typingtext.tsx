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
        'Build A Blog Post Writer',
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        'Build A Chatbot',
        2000,
        'Build A PDF Analyzer Bot',
        2000,
        'Build A Grammar Corrector',
        2000,
        'Build A Translator',
        2000
      ]}
      wrapper="span"
      speed={30}
      style={{ fontFamily: 'arial', fontWeight: "900",fontSize: '3em', display: 'inline-block' }}
      repeat={Infinity}
      />
    </div>
  );
}

export default TypingText;