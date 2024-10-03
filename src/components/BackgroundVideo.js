import React, { useEffect, useState } from 'react';

const BackgroundVideo = () => {
  const [isVertical, setIsVertical] = useState(window.innerWidth < window.innerHeight);
  const [hasScrolled, setHasScrolled] = useState(false); // Track if the user has scrolled

  // Add an event listener to detect orientation changes
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect when the user starts scrolling and trigger the fade-in effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) {
        setHasScrolled(true); // Trigger the fade-in effect
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, [hasScrolled]);

  return (
    <div className="background-video-container relative">
      {isVertical ? (
        // Vertical display video with 16:9 ratio
        <div
          className={`w-full h-0 pb-[56.25%] relative ${hasScrolled ? 'fade-in' : 'opacity-0'}`}
          style={{ transition: 'opacity 5s ease' }} // Add fade-in transition
        >
          <iframe
            src="https://player.vimeo.com/video/1015494704?autoplay=1&muted=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="AbstractVides-2-2"
          ></iframe>
        </div>
      ) : (
        // Horizontal display video with 16:9 ratio
        <div
          className={`w-full h-0 pb-[56.25%] relative ${hasScrolled ? 'fade-in' : 'opacity-0'}`}
          style={{ transition: 'opacity 5s ease' }} // Add fade-in transition
        >
          <iframe
            src="https://player.vimeo.com/video/1015494725?autoplay=1&muted=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="AbstractVides"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;
