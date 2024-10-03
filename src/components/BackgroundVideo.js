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
    <div className="background-video-container sticky top-0 w-full h-screen z-0">
      {isVertical ? (
        // Vertical display video (fullscreen on mobile)
        <div
          className={`absolute inset-0 w-full h-full ${hasScrolled ? 'fade-in' : 'opacity-0'}`}
          style={{ transition: 'opacity 5s ease' }} // Add fade-in transition
        >
          <iframe
            src="https://player.vimeo.com/video/1015494704?autoplay=1&muted=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="VerticalVideo"
          ></iframe>
        </div>
      ) : (
        // Horizontal display video (fullscreen)
        <div
          className={`absolute inset-0 w-full h-full ${hasScrolled ? 'fade-in' : 'opacity-0'}`}
          style={{ transition: 'opacity 5s ease' }} // Add fade-in transition
        >
          <iframe
            src="https://player.vimeo.com/video/1015494725?autoplay=1&muted=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="HorizontalVideo"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;
