import React, { useState, useEffect } from 'react';

// The StickyShapes component
const StickyShapes = () => {
  // State for scroll position controlling the rotation
  const [scrollRotation, setScrollRotation] = useState(0);

  // Effect to handle scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const rotation = scrollTop / 5; // Adjust the division for speed of rotation
      setScrollRotation(rotation);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="sticky-shapes-container fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* Left Shape (Travels up) */}
      <div
        className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] opacity-30"
        style={{ transform: `rotate(${scrollRotation}deg) translateY(-${scrollRotation / 2}px)` }} // Rotating and translating upwards
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" stroke="white" strokeWidth="6" fill="none" />
        </svg>
      </div>

      {/* Right Shape (Travels down) */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] opacity-30"
        style={{ transform: `rotate(${scrollRotation}deg) translateY(${scrollRotation / 2}px)` }} // Rotating and translating downwards
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" stroke="white" strokeWidth="6" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default StickyShapes;
