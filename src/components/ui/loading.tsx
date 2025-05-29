// Import GSAP at the top of your file
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

// Your component should look like this:
const LoadingScreen = () => {
  const ghostTextRef = useRef(null);
  const techNestRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup - hide elements
    gsap.set([ghostTextRef.current, techNestRef.current], { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    });
    
    // Main animation sequence
    tl.to(containerRef.current, {
      background: "linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 50%, #ddd6fe 100%)",
      duration: 0.5
    })
    .to(ghostTextRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
    })
    .to(techNestRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.4)",
    }, "-=0.6")
    
    // Continuous glow effect for Ghost text
    gsap.to(ghostTextRef.current, {
      textShadow: "0 0 30px rgba(191, 219, 254, 0.8), 0 0 60px rgba(191, 219, 254, 0.5)",
      scale: 1.05,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
    
    // Floating animation for individual letters
    gsap.to(ghostTextRef.current, {
      y: -10,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
    
    // Tech Nest subtle pulse
    gsap.to(techNestRef.current, {
      opacity: 0.7,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
    
    // Background gradient animation
    gsap.to(containerRef.current, {
      background: "linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 50%, #f3e8ff 100%)",
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
    
  }, []);

  return (
    <div ref={containerRef} className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">                     
      <span className="special-font hero-heading justify-center flex text-blue-200 items-center bottom-5">                         
        <b ref={ghostTextRef}>Ghost</b>                   
        <span>                      
          <div className="three-body scale-1000">                         
            <div className="three-body__dot"></div>                         
            <div className="three-body__dot"></div>                         
            <div className="three-body__dot"></div>                     
          </div>                     
        </span>                          
        <br />                         
        <span ref={techNestRef}>Tech Nest</span>                     
      </span>                 
    </div>
  );
};

export default LoadingScreen;