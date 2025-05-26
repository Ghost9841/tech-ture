

type Props = {}

const Hero = (props: Props) => {
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <section id="video-frame" className="relative z-10 h-dvh w-screen
            overflow-hidden rounded-lg bg-blue-75">

                <div className="mask-clip-path buster absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div>

                        Mini Video Player
                    </div>

                </div>

            </section>
        </div>
    )
}

export default Hero