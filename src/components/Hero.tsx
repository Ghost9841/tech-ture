import { useRef, useState } from "react"


type Props = {}

const Hero = (props: Props) => {
    
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [hasClicked, setHasClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadedVideos, setLoadedVideos] = useState<number>(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev)=>prev+1)
    }
    // 0 % 4 = 0 +1 => 1
    // 1 % 4 = 1 +1 => 2
    // 2 % 4 = 2 +1 => 3
    // 3 % 4 = 3 +1 => 4
    // 4 % 4 = 0 +1 => 1
    const upcomingVideoIndex = (currentIndex % totalVideos) +1;
    const handleMiniVDClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    const getVideoSource = (index: any) => `videos/hero-${index}.mp4`;
    return (    
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <section id="video-frame" className="relative z-10 h-dvh w-screen
            overflow-hidden rounded-lg bg-blue-75">

                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div 
                    onClick={handleMiniVDClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100">
                        <video 
                        ref={nextVideoRef} 
                        src={getVideoSource(upcomingVideoIndex)} 
                        loop
                        muted
                        autoPlay
                        id="current-video"
                        className="size-64 origin-center scale-150 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                        />
                    </div>

                </div>
                <video
                ref={nextVideoRef}
                src={getVideoSource(currentIndex)}
                loop
                muted
                autoPlay
                id="next-video"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                onLoadedData={handleVideoLoad} />

                <video
                src={getVideoSource(currentIndex === totalVideos -1 ? 1 : currentIndex)}
                autoPlay
                loop
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
                onLoadedData={handleVideoLoad}
                />
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>a</b>ming
                    </h1>
            </section>
        </div>
    )
}

export default Hero