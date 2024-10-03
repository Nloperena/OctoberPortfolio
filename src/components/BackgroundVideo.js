import React, { useEffect, useState } from 'react';

const BackgroundVideo = () => {
  const [isVertical, setIsVertical] = useState(window.innerWidth < window.innerHeight);

  // Detect screen orientation change (vertical or horizontal)
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="background-video-container fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {isVertical ? (
        // Vertical display video for mobile portrait
        <iframe
          src="https://player.vimeo.com/video/1015494704?autoplay=1&muted=1&loop=1&badge=0&autopause=0&background=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' // Ensures the video covers the entire viewport without stretching
          }}
          title="VerticalVideo"
        ></iframe>
      ) : (
        // Horizontal display video for desktop/landscape
        <iframe
          src="https://player.vimeo.com/video/1015494725?autoplay=1&muted=1&loop=1&badge=0&autopause=0&background=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' // Ensures the video covers the entire viewport without stretching
          }}
          title="HorizontalVideo"
        ></iframe>
      )}
    </div>
  );
};

export default BackgroundVideo;
