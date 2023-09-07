import React from 'react';
import { TypeAnimation } from 'react-type-animation'

interface MyComponentProps {
}

const TypingText: React.FC<MyComponentProps> = () => {
  return (
    <div style={{display: 'flex'}}>
      <h1 style={{fontSize:'3em', display: 'inline-block' , fontWeight:'900' , fontFamily:'arial'}}>
        <span className='text-purple-600'>Build A</span>
        <TypeAnimation
          sequence={[
          // Same substring at the start will only be typed out once, initially
          ' Blog Post Writer',
          2000, // wait 1s before replacing "Mice" with "Hamsters"
          ' Chatbot',
          2000,
          ' PDF Analyzer Bot',
          2000,
          ' Grammar Corrector',
          2000,
          ' Translator',
          2000
        ]}
        wrapper="span"
        speed={30}
        // style={{ fontFamily: 'arial', fontWeight: "900",fontSize: '3em', display: 'inline-block' }}
        repeat={Infinity}
        />
      </h1>
    </div>
  );
}

export default TypingText;