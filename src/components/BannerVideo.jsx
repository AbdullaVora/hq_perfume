// import React, { useRef, useState, useEffect } from 'react';
// import Link from 'next/link';

// const VideoBanner = ({ videoss = [] }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const videoRefs = [useRef(null), useRef(null)];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [nextIndex, setNextIndex] = useState(1);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [requiresInteraction, setRequiresInteraction] = useState(false);
//   const [dimensions, setDimensions] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0
//   });

//   // Responsive video sources
//   const videos = React.useMemo(() => {
//     if (!videoss.length) return [];

//     // Determine appropriate video source based on screen size
//     return videoss.map(video => {
//       if (dimensions.width <= 640) { // Mobile
//         return video.mobileMedia || video.desktopMedia;
//       } else if (dimensions.width <= 1024) { // Tablet
//         return video.tabletMedia || video.desktopMedia;
//       } else { // Desktop
//         return video.desktopMedia;
//       }
//     });
//   }, [videoss, dimensions]);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };

//     handleResize(); // Initial call
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Preload videos
//   useEffect(() => {
//     if (videos.length === 0) return;

//     let isMounted = true;
//     let loadedCount = 0;

//     const handleLoad = () => {
//       loadedCount++;
//       if (loadedCount >= videos.length && isMounted) {
//         setIsLoading(false);
//       }
//     };

//     const preloadPromises = videos.map(src => {
//       return new Promise(resolve => {
//         const video = document.createElement('video');
//         video.src = src;
//         video.preload = 'auto';
//         video.onloadeddata = () => {
//           handleLoad();
//           resolve();
//         };
//         video.onerror = () => {
//           console.warn(`Failed to load video: ${src}`);
//           handleLoad();
//           resolve();
//         };
//       });
//     });

//     Promise.all(preloadPromises).catch(err => {
//       console.error('Video preload error:', err);
//       if (isMounted) setIsLoading(false);
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [videos]);

//   // Handle video transitions
//   useEffect(() => {
//     if (isLoading || videos.length === 0) return;

//     const currentVideo = videoRefs[activeIndex]?.current;
//     if (!currentVideo) return;

//     const handleEnded = () => {
//       setIsTransitioning(true);
//       const nextVideoIndex = (activeIndex + 1) % videos.length;
//       setNextIndex(nextVideoIndex);

//       setTimeout(() => {
//         setActiveIndex(nextVideoIndex);
//         setIsTransitioning(false);
//       }, 500);
//     };

//     currentVideo.addEventListener('ended', handleEnded);
//     return () => currentVideo.removeEventListener('ended', handleEnded);
//   }, [activeIndex, isLoading, videos]);

//   // Handle video playback
//   useEffect(() => {
//     if (isLoading || videos.length === 0) return;

//     const playVideo = async (video) => {
//       if (!video) return;

//       try {
//         await video.play();
//         setRequiresInteraction(false);
//       } catch (err) {
//         console.debug('Autoplay prevented, waiting for interaction');
//         setRequiresInteraction(true);
//       }
//     };

//     const currentVideo = videoRefs[activeIndex]?.current;
//     if (currentVideo) {
//       playVideo(currentVideo);
//     }
//   }, [activeIndex, isLoading, videos]);

//   // Handle user interaction for autoplay
//   useEffect(() => {
//     if (!requiresInteraction) return;

//     const handleInteraction = () => {
//       videoRefs.forEach(ref => {
//         if (ref.current) {
//           ref.current.play().catch(e => console.debug('Playback error:', e));
//         }
//       });
//       setRequiresInteraction(false);
//     };

//     document.addEventListener('click', handleInteraction);
//     return () => document.removeEventListener('click', handleInteraction);
//   }, [requiresInteraction]);

//   if (videos.length === 0) {
//     return (
//       <div className="banner-container">
//         <div className="loader-container">
//           <span className="loader"></span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="banner-container">
//       {isLoading && (
//         <div className="loader-container">
//           <span className="loader"></span>
//         </div>
//       )}

//       {requiresInteraction && (
//         <div className="interaction-prompt">
//           <p>Click anywhere to play videos</p>
//         </div>
//       )}

//       {videos.map((src, index) => (
//         // <video
//         //   key={`video-${index}`}
//         //   ref={videoRefs[index]}
//         //   muted
//         //   playsInline
//         //   autoPlay={index === activeIndex}
//         //   className={`video-layer ${
//         //     index === activeIndex ? 'active' :
//         //     (index === nextIndex && isTransitioning) ? 'next' : 'hidden'
//         //   }`}
//         //   src={src}
//         //   onError={(e) => console.error(`Video ${index} error`, e)}
//         // />
//         <video
//           key={`video-${index}`}
//           ref={videoRefs[index]}
//           src={src}
//           autoPlay
//           muted
//           playsInline
//           className={`video-layer ${index === activeIndex ? 'active' :
//               (index === nextIndex && isTransitioning) ? 'next' : 'hidden'
//             }`}
//           onError={(e) => console.error(`Video ${index} error`, e)}
//         />

//       ))}

//       <style jsx>{`
//         .banner-container {
//           position: relative;
//           width: 100%;
//           height: 100vh;
//           min-height: 400px; /* Minimum height for very small screens */
//           max-height: 1200px; /* Maximum height for very large screens */
//           overflow: hidden;
//           background-color: #000; /* Fallback background */
//         }

//         .loader-container {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background-color: transparent;
//           z-index: 10;
//         }

//         .loader {
//           display: inline-block;
//           width: 50px;
//           height: 50px;
//           border: 5px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: #fff;
//           animation: spin 1s ease-in-out infinite;
//         }

//         .interaction-prompt {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background: rgba(0, 0, 0, 0.7);
//           color: white;
//           padding: 15px 25px;
//           border-radius: 8px;
//           z-index: 5;
//           text-align: center;
//           font-size: clamp(14px, 2vw, 18px);
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         .video-layer {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: opacity 0.5s ease-in-out;
//         }

//         /* Adjust object-position for different aspect ratios */
//         @media (max-aspect-ratio: 16/9) {
//           .video-layer {
//             object-fit: cover;
//             width: auto;
//             height: 100%;
//             left: 50%;
//             transform: translateX(-50%);
//           }
//         }

//         @media (min-aspect-ratio: 16/9) {
//           .video-layer {
//             object-fit: cover;
//             width: 100%;
//             height: auto;
//             top: 50%;
//             transform: translateY(-50%);
//           }
//         }

//         .video-layer.active {
//           opacity: 1;
//           z-index: 1;
//         }

//         .video-layer.next {
//           opacity: 1;
//           z-index: 2;
//         }

//         .video-layer.hidden {
//           opacity: 0;
//           z-index: 0;
//         }

//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .banner-container {
//             height: 60vh;
//           }
//         }

//         @media (max-width: 480px) {
//           .banner-container {
//             height: 10vh;
//           }
          
//           .interaction-prompt {
//             padding: 10px 15px;
//             width: 80%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VideoBanner;


import React, { useRef, useState, useEffect } from 'react';

const VideoBanner = ({ videoss = [] }) => {
  const videoRefs = [useRef(null), useRef(null)];
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preloadedNext, setPreloadedNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requiresInteraction, setRequiresInteraction] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Responsive video sources
  const videos = React.useMemo(() => {
    if (!videoss.length) return [];

    return videoss.map(video => {
      if (dimensions.width <= 640) {
        return video.mobileMedia || video.desktopMedia;
      } else if (dimensions.width <= 1024) {
        return video.tabletMedia || video.desktopMedia;
      } else {
        return video.desktopMedia;
      }
    });
  }, [videoss, dimensions]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  // Enhanced preload with better iOS handling
  useEffect(() => {
    if (videos.length === 0) return;

    let isMounted = true;
    let loadedCount = 0;
    const isIOSDevice = isIOS();

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount >= videos.length && isMounted) {
        setIsLoading(false);
        
        // For iOS, we need user interaction
        if (isIOSDevice && !hasUserInteracted) {
          setRequiresInteraction(true);
        }
      }
    };

    const preloadPromises = videos.map((src, index) => {
      return new Promise(resolve => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'metadata'; // Use metadata instead of auto for better iOS compatibility
        video.muted = true;
        video.playsInline = true;
        
        video.onloadedmetadata = () => {
          handleLoad();
          resolve();
        };
        
        video.onerror = () => {
          console.warn(`Failed to load video: ${src}`);
          handleLoad();
          resolve();
        };
      });
    });

    Promise.all(preloadPromises).catch(err => {
      console.error('Video preload error:', err);
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [videos, hasUserInteracted]);

  // Preload next video
  useEffect(() => {
    if (isLoading || videos.length <= 1) return;

    const nextVideoIndex = (activeIndex + 1) % videos.length;
    const nextVideo = videoRefs[nextVideoIndex]?.current;
    
    if (nextVideo && nextVideo.src !== videos[nextVideoIndex]) {
      nextVideo.src = videos[nextVideoIndex];
      nextVideo.load();
      nextVideo.addEventListener('canplaythrough', () => {
        setPreloadedNext(true);
      }, { once: true });
    }
  }, [activeIndex, videos, isLoading]);

  // Handle smooth video transitions with cross-fade
  useEffect(() => {
    if (isLoading || videos.length === 0) return;

    const currentVideo = videoRefs[activeIndex]?.current;
    if (!currentVideo) return;

    const handleEnded = async () => {
      const nextVideoIndex = (activeIndex + 1) % videos.length;
      const nextVideo = videoRefs[nextVideoIndex]?.current;
      
      if (!nextVideo) return;

      // Start transition
      setIsTransitioning(true);
      setNextIndex(nextVideoIndex);

      // Prepare and play next video
      try {
        nextVideo.currentTime = 0;
        nextVideo.muted = true;
        nextVideo.playsInline = true;
        
        // Start playing next video (it will be invisible initially)
        await nextVideo.play();
        
        // Wait a bit to ensure next video is playing smoothly
        setTimeout(() => {
          // Switch active index (this triggers the CSS transition)
          setActiveIndex(nextVideoIndex);
          
          // End transition after animation completes
          setTimeout(() => {
            setIsTransitioning(false);
            setPreloadedNext(false);
          }, 1000); // Match with CSS transition duration
        }, 100);
        
      } catch (error) {
        console.error('Error during video transition:', error);
        // Fallback: immediate switch
        setActiveIndex(nextVideoIndex);
        setIsTransitioning(false);
      }
    };

    currentVideo.addEventListener('ended', handleEnded);
    return () => currentVideo.removeEventListener('ended', handleEnded);
  }, [activeIndex, isLoading, videos]);

  // Enhanced video playback handling
  useEffect(() => {
    if (isLoading || videos.length === 0) return;

    const playVideo = async (video) => {
      if (!video) return;

      try {
        // Ensure video properties are set
        video.muted = true;
        video.playsInline = true;
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setRequiresInteraction(false);
        }
      } catch (err) {
        console.debug('Autoplay prevented:', err.name);
        
        // Different handling based on error type
        if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
          setRequiresInteraction(true);
        } else {
          console.error('Video play error:', err);
        }
      }
    };

    const currentVideo = videoRefs[activeIndex]?.current;
    if (currentVideo) {
      playVideo(currentVideo);
    }
  }, [activeIndex, isLoading, videos, hasUserInteracted]);

  // Enhanced user interaction handler
  useEffect(() => {
    if (!requiresInteraction) return;

    const handleUserInteraction = async (event) => {
      // Prevent default to avoid unwanted navigation
      if (event.target.tagName === 'VIDEO') {
        event.preventDefault();
      }

      setHasUserInteracted(true);
      setRequiresInteraction(false);

      // Try to play all videos
      const playPromises = videoRefs.map(ref => {
        if (ref.current) {
          ref.current.muted = true;
          ref.current.playsInline = true;
          return ref.current.play().catch(e => {
            console.debug('Playback error after interaction:', e);
          });
        }
        return Promise.resolve();
      });

      try {
        await Promise.all(playPromises);
      } catch (error) {
        console.error('Error playing videos after interaction:', error);
      }
    };

    // Listen for multiple interaction types
    const events = ['click', 'touchstart', 'touchend'];
    events.forEach(eventType => {
      document.addEventListener(eventType, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, handleUserInteraction);
      });
    };
  }, [requiresInteraction]);

  if (videos.length === 0) {
    return (
      <div className="banner-container">
        <div className="loader-container">
          <span className="loader"></span>
        </div>
        <style jsx>{`
          .banner-container {
            position: relative;
            width: 100%;
            height: 100vh;
            min-height: 400px;
            max-height: 1200px;
            overflow: hidden;
            background-color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .loader {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="banner-container">
      {isLoading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      {requiresInteraction && (
        <div className="interaction-prompt">
          <div className="prompt-content">
            <div className="play-icon">▶</div>
            <p>Tap to play videos</p>
            <small>Required on iOS devices</small>
          </div>
        </div>
      )}

      {videos.map((src, index) => {
        const isActive = index === activeIndex;
        const isNext = index === nextIndex && isTransitioning;
        const isVisible = isActive || isNext;
        
        return (
          <video
            key={`video-${index}-${src}`}
            ref={videoRefs[index]}
            src={src}
            muted={true}
            playsInline={true}
            preload="metadata"
            webkit-playsinline="true"
            className={`video-layer ${
              isActive ? 'active' : isNext ? 'next' : 'hidden'
            }`}
            style={{
              opacity: isActive ? 1 : isNext ? 1 : 0,
              zIndex: isActive ? 2 : isNext ? 1 : 0
            }}
            onError={(e) => {
              console.error(`Video ${index} error:`, e);
              console.error('Video source:', src);
            }}
            onCanPlay={() => {
              console.debug(`Video ${index} can play`);
            }}
            onLoadedMetadata={() => {
              console.debug(`Video ${index} metadata loaded`);
            }}
          />
        );
      })}

      <style jsx>{`
        .banner-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 400px;
          max-height: 1200px;
          overflow: hidden;
          background-color: #000;
        }

        .loader-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 10;
        }

        .loader {
          display: inline-block;
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }

        .interaction-prompt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          z-index: 15;
          cursor: pointer;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .prompt-content {
          text-align: center;
          color: white;
          padding: 30px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .play-icon {
          font-size: 48px;
          margin-bottom: 15px;
          opacity: 0.9;
        }

        .prompt-content p {
          margin: 10px 0 5px 0;
          font-size: 18px;
          font-weight: 500;
        }

        .prompt-content small {
          opacity: 0.7;
          font-size: 14px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .video-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 1s cubic-bezier(0.4, 0.0, 0.2, 1);
          will-change: opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .video-layer.active {
          opacity: 1 !important;
          z-index: 2 !important;
        }

        .video-layer.next {
          opacity: 1 !important;
          z-index: 1 !important;
        }

        .video-layer.hidden {
          opacity: 0 !important;
          z-index: 0 !important;
          pointer-events: none;
        }

        /* Enhanced smooth transitions */
        .video-layer.active.transitioning {
          animation: fadeIn 1s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }

        .video-layer.next.transitioning {
          animation: fadeOut 1s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.98);
          }
        }

        /* Hardware acceleration for smoother animations */
        .video-layer {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .banner-container {
            height: 60vh;
          }
          
          .prompt-content {
            padding: 20px;
            width: 80%;
            max-width: 300px;
          }
          
          .play-icon {
            font-size: 36px;
          }
          
          .prompt-content p {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .banner-container {
            height: 50vh;
            min-height: 300px;
          }
          
          .prompt-content {
            padding: 15px;
          }
          
          .play-icon {
            font-size: 32px;
            margin-bottom: 10px;
          }
          
          .prompt-content p {
            font-size: 15px;
          }
        }

        /* iOS specific optimizations */
        @supports (-webkit-touch-callout: none) {
          .video-layer {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoBanner;