import { useEffect, useRef, useState } from "react"
import Button from "../../ui/button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [hasClicked, setHasClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadedVideos, setLoadedVideos] = useState<number>(0);

    const totalVideos = 4;
    
    // Separate refs for different videos
    const nextVideoRef = useRef<HTMLVideoElement>(null);
    const currentVideoRef = useRef<HTMLVideoElement>(null);
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);
    const bufferVideoRef = useRef<HTMLVideoElement>(null); // Buffer video for seamless transitions

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1)
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
    
    const handleMiniVDClick = () => {
        if (hasClicked) return; // Prevent multiple clicks during animation
        
        // Preload the buffer video with the new content
        if (bufferVideoRef.current) {
            bufferVideoRef.current.src = getVideoSource(upcomingVideoIndex);
            bufferVideoRef.current.currentTime = 0;
            bufferVideoRef.current.play();
        }
        
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    // Video transition animation
    useGSAP(() => {
        if (hasClicked) {
            // Ensure next video is ready
            if (nextVideoRef.current) {
                nextVideoRef.current.currentTime = 0;
                nextVideoRef.current.play();
            }

            gsap.set("#next-video", { visibility: 'visible' })
            gsap.set("#buffer-video", { visibility: 'visible', opacity: 0 })

            // Fade in buffer video behind the transition
            gsap.to('#buffer-video', {
                opacity: 1,
                duration: 0.5,
                ease: 'power1.inOut'
            })

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onComplete: () => {
                    // Swap the videos - buffer becomes main background
                    gsap.set("#background-video", { visibility: 'invisible' });
                    gsap.set("#buffer-video", { 
                        visibility: 'visible', 
                        opacity: 1,
                        zIndex: 1 
                    });
                    
                    // Update the background video source for next transition
                    if (backgroundVideoRef.current) {
                        backgroundVideoRef.current.src = getVideoSource(currentIndex);
                        backgroundVideoRef.current.currentTime = 0;
                        backgroundVideoRef.current.play();
                    }
                    
                    // Reset everything
                    setTimeout(() => {
                        gsap.set("#background-video", { visibility: 'visible' });
                        gsap.set("#buffer-video", { visibility: 'invisible', opacity: 0, zIndex: 5 });
                        
                        setHasClicked(false);
                        gsap.set("#next-video", { 
                            visibility: 'invisible', 
                            scale: 0, 
                            width: '256px', 
                            height: '256px' 
                        });
                    }, 100);
                }
            })
            
            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0.5,
                duration: 1.5,
                ease: 'power1.inOut',
            })
        }
    }, {dependencies: [currentIndex, hasClicked], revertOnUpdate: true})

    // Clip path animation
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0, 72% 0%, 90% 90%, 0 100%)',
            borderRadius: '0 0 40% 10%'
        })
        
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    }, [])

    const getVideoSource = (index: number) => `videos/hero-${index}.mp4`;

    useEffect(() => {
        if (loadedVideos === totalVideos) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            
            <section id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                {/* Mini video preview */}
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div
                        onClick={handleMiniVDClick} 
                        className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100"
                    >
                        <video
                            ref={currentVideoRef}
                            src={getVideoSource(upcomingVideoIndex)}
                            loop
                            muted
                            autoPlay
                            preload="auto"
                            id="current-video"
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>

                {/* Next video for transition */}
                <video
                    ref={nextVideoRef}
                    src={getVideoSource(upcomingVideoIndex)}
                    loop
                    muted
                    preload="auto"
                    id="next-video"
                    className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    onLoadedData={handleVideoLoad} 
                />

                {/* Main background video */}
                <video
                    ref={backgroundVideoRef}
                    src={getVideoSource(currentIndex)}
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    id="background-video"
                    className="absolute left-0 top-0 size-full object-cover object-center z-0"
                    onLoadedData={handleVideoLoad}
                />

                {/* Buffer video for seamless transitions */}
                <video
                    ref={bufferVideoRef}
                    src={getVideoSource(upcomingVideoIndex)}
                    loop
                    muted
                    preload="auto"
                    id="buffer-video"
                    className="absolute left-0 top-0 size-full object-cover object-center z-5 invisible opacity-0"
                    onLoadedData={handleVideoLoad}
                />

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br />
                            Unlead the Play Economy
                        </p>

                        <Button 
                            id="watch-trailer" 
                            title="Watch Trailer" 
                            icon={<TiLocationArrow />}
                            containerClass="bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </section>
            
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>a</b>ming
            </h1>
        </div>
    )
}

export default Hero;